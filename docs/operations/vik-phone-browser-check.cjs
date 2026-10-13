const { chromium } = require('playwright-core');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../public');
const artifacts=process.env.VIK_QA_OUTPUT || '/tmp/vik-phone-qa';fs.mkdirSync(artifacts,{recursive:true});
let authed=false, rows=[],posts=0,loseReply=false;
const server=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname.startsWith('/api/')) {
  res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');
  let body='';for await(const chunk of req)body+=chunk;const data=body?JSON.parse(body):{};
  if(pathname.endsWith('/owner/secret-rotation')){res.statusCode=authed?200:403;return res.end(JSON.stringify(authed?{pending:null}:{error:'owner_session_required'}));}
  if(pathname.endsWith('/owner/auth')){authed=data.phrase==='test phrase';res.statusCode=authed?200:401;return res.end(JSON.stringify(authed?{ownerAuthenticated:true}:{error:'owner_auth_failed'}));}
  if(pathname.endsWith('/history'))return res.end(JSON.stringify({conversationId:'00000000-0000-0000-0000-000000000001',messages:rows}));
  if(pathname.endsWith('/chat')){posts++;rows.push({id:String(posts*2-1),role:'user',content:data.message,createdAt:new Date().toISOString()},{id:String(posts*2),role:'assistant',content:'Я здесь 🧡',createdAt:new Date().toISOString()});if(loseReply){res.statusCode=503;return res.end(JSON.stringify({error:'reply_connection_lost'}));}return res.end(JSON.stringify({conversationId:'00000000-0000-0000-0000-000000000001',message:rows.at(-1)}));}
 }
 const file=path.join(root,pathname.endsWith('/')?pathname+'index.html':pathname);
 try{res.setHeader('Content-Type',({'html':'text/html','js':'application/javascript','css':'text/css','webmanifest':'application/manifest+json','png':'image/png'})[file.split('.').at(-1)]||'text/plain');res.end(fs.readFileSync(file));}catch{res.statusCode=404;res.end();}
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,...(process.env.VIK_CHROMIUM_PATH ? {executablePath:process.env.VIK_CHROMIUM_PATH} : {}),args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 console.log('stage open'); await page.goto('http://127.0.0.1:'+server.address().port+'/vik/');
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Войди'));
 assert.equal(await page.locator('#conversation').isVisible(),false);
 assert.equal(await page.locator('#send').isDisabled(),true);
 console.log('stage gate'); await page.locator('#phrase').fill('wrong');await page.locator('#login-button').click();
 await page.waitForFunction(()=>document.querySelector('#login-status').textContent.includes('не подошла'));
 assert.equal(await page.locator('#conversation').isVisible(),false);
 console.log('stage wrong phrase'); await page.locator('#phrase').fill('test phrase');await page.locator('#login-button').click();
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Я здесь'));
 assert.equal(await page.locator('#phrase').inputValue(),'');
 assert.equal(await page.evaluate(()=>Object.values(localStorage).some(x=>x.includes('test phrase'))),false);
 console.log('stage authed'); await page.locator('#message').fill('  Привет  ');await page.locator('#send').click();
 await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===2);
 assert.equal(await page.locator('#message').inputValue(),'');assert.equal(posts,1);
 console.log('stage chat');loseReply=true;await page.locator('#message').fill('Ответ потерялся');await page.locator('#send').click();
 await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===4);
 assert.equal(posts,2);assert.equal(await page.locator('#message').inputValue(),'');
 console.log('stage lost reply');await page.locator('#message').fill('Офлайн черновик');
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 console.log('stage sw'); await context.setOffline(true);await page.reload();
 assert.equal(await page.locator('#message').inputValue(),'Офлайн черновик');
 assert.equal(await page.locator('#send').isDisabled(),true);assert.equal(await page.locator('.bubble').count(),0);
 const caches=await page.evaluate(async()=>{const result=[];for(const key of await window.caches.keys()){const cache=await window.caches.open(key);for(const req of await cache.keys())result.push(req.url);}return result;});
 assert.ok(!caches.some(url=>url.includes('/api/')));assert.equal(posts,2);
 console.log('stage offline'); await context.setOffline(false);await page.locator('#refresh').click();await page.waitForFunction(()=>document.querySelectorAll('.bubble').length===4);
 assert.equal(posts,2);assert.equal(await page.locator('#message').inputValue(),'Офлайн черновик');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 console.log('stage reconnect');await page.screenshot({path:path.join(artifacts,'mobile-chat.png')});
 await page.locator('#install').click();assert.equal(await page.locator('#install-help').isVisible(),true);
 await page.locator('#close-help').click();
 await page.setViewportSize({width:320,height:568});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:path.join(artifacts,'mobile-small.png')});
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({ok:true,checks:['owner gate','wrong phrase','phrase not stored','chat and trimmed draft','503 after accepted turn: no automatic duplicate','offline shell and draft','no private API cache','reconnect without auto-send','install instructions','320px/390px layout'],chatPosts:posts}));
 await browser.close();await new Promise(resolve=>server.close(resolve));
})().catch(e=>{console.error(e);server.close();process.exit(1)});
