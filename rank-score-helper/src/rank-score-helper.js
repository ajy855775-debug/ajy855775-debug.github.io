const PAGE = "<!doctype html><html lang=\"zh-CN\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"description\" content=\"输入全民K歌榜单链接，查询前N名助力值总分及明细\"><title>榜单查分助手</title>\n<style>\n:root{font-family:Inter,\"Microsoft YaHei\",system-ui,sans-serif;color:#19312b;background:#f5f7f4;font-synthesis:none}*{box-sizing:border-box}body{margin:0}header{border-bottom:1px solid #e0e6e0;background:#fff;padding:23px max(24px,calc((100vw - 1050px)/2));display:flex;align-items:center;gap:12px;font-weight:700;white-space:nowrap}.logo{background:#17694f;color:#fff;border-radius:10px;width:35px;height:35px;display:grid;place-items:center}header small{margin-left:auto;color:#74827b;font-weight:400;font-size:12px}main{max-width:1010px;margin:58px auto;padding:0 24px}.eyebrow{font-size:12px;letter-spacing:3px;color:#49816c}h1{font-size:36px;letter-spacing:-1px;margin:12px 0}p{line-height:1.7;color:#738078}.panel{background:white;border:1px solid #dfe6df;border-radius:18px;padding:28px;margin-top:30px;box-shadow:0 10px 32px #253e2a04}form{display:grid;grid-template-columns:1fr 150px 122px;gap:16px;align-items:end}label{display:block;font-size:13px;font-weight:600;margin-bottom:10px}input{width:100%;height:48px;border:1px solid #d6dfd7;background:#fcfdfb;border-radius:9px;padding:0 13px;font:inherit;font-size:14px;min-width:0}input:focus{outline:3px solid #bce2cf;border-color:#17694f}button{height:48px;border:0;background:#17694f;color:white;border-radius:9px;padding:0 20px;font:inherit;cursor:pointer;font-weight:600}button:disabled{opacity:.55;cursor:wait}.hint{font-size:12px;margin-bottom:0}.status{margin-top:24px;border-radius:12px;background:#eef3ec;padding:16px 19px;font-size:13px;line-height:1.8}.status.error{background:#fff0ed;color:#9e3829}.empty{text-align:center;padding:60px 15px;color:#829087}.empty b{display:block;color:#4b6457;font-size:18px;margin:18px 0 8px}.circle{font-size:30px;background:#edf3ec;border-radius:20px;display:inline-grid;place-items:center;width:65px;height:65px}h2{font-size:18px;margin:0}.summary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;margin:22px 0}.metric{border:1px solid #e0e7df;border-radius:12px;padding:21px;background:#fafcf8}.metric:first-child{background:#eaf3e8;border-color:#d5e5d0}.metric span{font-size:12px;color:#64776a}.metric strong{display:block;font-size:27px;margin-top:12px;overflow-wrap:anywhere}.metric:first-child strong{font-size:34px;color:#17694f}.meta{font-size:12px;color:#77867b;line-height:1.8}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;font-size:14px}th{font-size:12px;color:#728074;text-align:left;font-weight:500;background:#f7f9f5}td,th{padding:17px 14px;border-bottom:1px solid #edf0e9}td:last-child,th:last-child{text-align:right;font-variant-numeric:tabular-nums}td:first-child{width:90px;color:#5e7869}.rank-top{font-weight:700;color:#17694f}footer{font-size:12px;color:#8a958b;text-align:center;margin:28px 0}.result-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.tag{font-size:11px;background:#edf4eb;color:#4c7859;border-radius:20px;padding:6px 10px}a{color:#17694f}#results[hidden],#status[hidden],#empty[hidden]{display:none}@media(max-width:650px){main{margin:32px auto;padding:0 16px}h1{font-size:29px}header{padding:16px}header small{display:none}.panel{padding:20px;margin-top:22px}form{grid-template-columns:1fr 115px}form .url{grid-column:1/-1}.summary{grid-template-columns:1fr 1fr}.metric:first-child{grid-column:1/-1}.metric strong{font-size:23px}td,th{padding:15px 8px}}\n</style>\n<header><div class=\"logo\">Σ</div>榜单查分助手<small>全民K歌活动 · 成绩汇总</small></header>\n<main><div class=\"eyebrow\">RANKING SCORE ASSISTANT</div><h1>前 N 名成绩，一键算清。</h1><p>粘贴活动榜单链接，快速查看助力值总分与逐名明细。</p>\n<section class=\"panel\"><form id=\"form\"><div class=\"url\"><label for=\"url\">榜单链接</label><input id=\"url\" type=\"url\" required placeholder=\"粘贴全民K歌活动榜单链接\" value=\"https://kg.qq.com/forest-act/TME-WEB/forest/react-act-tpl/processAct/5BpIk7n5WnTRlcyX/app.html?actId=5BpIk7n5WnTRlcyX\"></div><div><label for=\"n\">计算范围（前 N 名）</label><input id=\"n\" type=\"number\" min=\"1\" max=\"300\" step=\"1\" required value=\"18\"></div><button id=\"query\" type=\"submit\">查询 →</button></form><p class=\"hint\">每次查询读取最新榜单 · 支持 1–300 名 · 按榜单原始助力值精确相加</p></section>\n<div id=\"status\" class=\"status\" role=\"status\" aria-live=\"polite\" hidden></div>\n<section class=\"panel\"><div class=\"result-head\"><h2>查询结果</h2><span class=\"tag\" id=\"tag\">等待查询</span></div><div id=\"empty\" class=\"empty\"><div class=\"circle\">≡</div><b>准备好，开始查分</b>输入榜单链接和计算范围，点击“查询”查看结果。</div><div id=\"results\" hidden><p id=\"title\"></p><div class=\"summary\"><div class=\"metric\"><span id=\"sumLabel\">前 18 名总分</span><strong id=\"total\"></strong></div><div class=\"metric\"><span>实际统计人数</span><strong id=\"count\"></strong></div><div class=\"metric\"><span>分数单位</span><strong id=\"unit\"></strong></div></div><p class=\"meta\" id=\"meta\"></p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">排名</th><th scope=\"col\">选手昵称</th><th scope=\"col\" id=\"scoreHeading\">助力值</th></tr></thead><tbody id=\"rows\"></tbody></table></div></div></section><footer>结果为查询时刻快照，点击查询可更新 · 数据以官方榜单为准</footer></main>\n<script>\nconst $=id=>document.getElementById(id);const fmt=s=>BigInt(s).toLocaleString('zh-CN');\n$('form').addEventListener('submit',async e=>{e.preventDefault();$('query').disabled=true;$('query').textContent='查询中…';$('results').hidden=true;$('empty').hidden=false;$('empty').textContent='正在读取官方榜单，请稍候…';$('status').hidden=true;$('tag').textContent='正在查询';\ntry{const r=await fetch('/api/query',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:$('url').value.trim(),n:Number($('n').value)})});let d;try{d=await r.json()}catch{throw Error('服务暂时不可用，请稍后重试。')}if(!r.ok)throw Error(d.error||'查询失败');$('status').className='status';$('status').hidden=false;$('status').textContent=d.message+(d.state==='upcoming'?' 开始时间：'+d.startTime+'（北京时间）':'');$('tag').textContent=d.state==='ready'?'已更新':d.state==='upcoming'?'尚未开赛':'暂无排名';if(d.state!=='ready'){$('empty').textContent=d.title+' · '+d.message;return;}$('empty').hidden=true;$('results').hidden=false;$('title').textContent=d.title+' · '+d.stage;$('sumLabel').textContent=(d.rows.length<d.requested?'实际前 '+d.rows.length+' 名':'前 '+d.requested+' 名')+'总分';$('total').textContent=fmt(d.total);$('count').textContent=d.rows.length+' 人';$('unit').textContent=d.unit;$('scoreHeading').textContent=d.unit;$('meta').textContent='查询时间：'+new Date(d.queriedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})+'（北京时间） · 统计范围：第 1–'+d.rows.length+' 名';$('rows').replaceChildren(...d.rows.map(v=>{let tr=document.createElement('tr');[v.rank,v.name,fmt(v.score)].forEach((s,i)=>{let td=document.createElement('td');td.textContent=s;if(i===0&&v.rank<=3)td.className='rank-top';tr.append(td)});return tr}));}\ncatch(err){$('status').hidden=false;$('status').className='status error';$('status').textContent=err.message;$('tag').textContent='查询失败';$('empty').textContent='本次未能取得完整数据，请检查链接后重新查询。';}finally{$('query').disabled=false;$('query').textContent='查询 →';}});\n</script></html>\n";
const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8'};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers});}
export function validate(link,n){
 const url=new URL(link);
 if(url.protocol!=='https:'||url.hostname!=='kg.qq.com'||url.port||url.username||url.password||!/^\/forest-act\/TME-WEB\/forest\/react-act-tpl\/processAct\/[A-Za-z0-9]+\/app\.html$/.test(url.pathname))throw Error('请填写全民K歌 processAct 活动榜单的完整 HTTPS 链接。');
 if(!Number.isInteger(n)||n<1||n>300)throw Error('计算范围须为 1～300 的整数。');
 return url;
}
export function rowsFrom(list){return list.map(item=>{
 const u=item.UserInfo??item,raw=u.Score;
 if(!/^[0-9]+$/.test(String(raw))||typeof raw==='number'&&!Number.isSafeInteger(raw))throw Error('榜单分数格式不受支持，未进行汇总。');
 if(!Number.isInteger(u.Rank)||u.Rank<1)throw Error('榜单排名格式不受支持。');
 return {rank:u.Rank,name:String(u.Name||'未命名选手').replace(/\[em2?\]e[^\[]*\[\/em2?\]/g,''),score:String(raw),id:String(u.EncryptUin||u.UinStr||u.Uin||u.Rank)};
});}
export function summarize(rows,n){
 rows.sort((a,b)=>a.rank-b.rank);const selected=rows.slice(0,n);
 if(new Set(selected.map(r=>r.id)).size!==selected.length||selected.some((r,i)=>r.rank!==i+1))throw Error('榜单正在变化或排名不连续，请重新查询。');
 return {rows:selected,total:selected.reduce((s,r)=>s+BigInt(r.score),0n).toString()};
}
async function read(url,options={}){
 const r=await fetch(url,{...options,redirect:'manual',signal:AbortSignal.timeout(18000)});
 if(r.status>=300&&r.status<400)throw Error('榜单服务发生跳转，请使用原始活动榜单链接。');
 if(!r.ok)throw Error('榜单服务暂时不可用，请稍后重试。');
 const text=await r.text();if(text.length>2000000)throw Error('榜单响应过大。');return text;
}
export async function query(link,n){
 const url=validate(link,n),html=await read(url.href);
 const match=html.match(/window\[['"]@pageData['"]\]\s*=\s*({[\s\S]*?});\s*window\[/);
 if(!match)throw Error('未识别到活动配置，链接可能已失效或页面结构已更新。');
 const page=JSON.parse(match[1]),configs=page.data?.process?.config;
 if(!configs?.length||!page.ext?.jztId||page.platform!=='kg')throw Error('暂不支持此类榜单。');
 const stages=configs.flatMap(c=>c.ProcessList||[]);
 const time=s=>Date.parse(s.replace(' ','T')+'+08:00'),now=Date.now();
 const stage=stages.find(s=>time(s.StartTime)<=now&&time(s.EndTime)>=now)||stages.find(s=>time(s.StartTime)>now)||stages.at(-1);
 const tracks=stage.TrackList?.flatMap(t=>t.TrackID||[]);
 if(tracks?.length!==1)throw Error('这个活动包含多个赛道，需要先指定赛道后才能汇总。');
 const track=stage.TrackList[0],rankIndex=track.RankStrategyList?.findIndex(r=>r.RankType===2);
 if(rankIndex===undefined||rankIndex<0)throw Error('未识别到助力值总榜，暂不支持此赛制。');
 const base={title:page.data.basic.title,unit:page.data.basic.ScoreUnit||'分',startTime:stage.StartTime,endTime:stage.EndTime,stage:stage.ProcessName,requested:n,source:url.href,queriedAt:new Date().toISOString()};
 if(now<time(stage.StartTime))return {...base,state:'upcoming',rows:[],total:null,message:'活动尚未开始，开赛后点击查询即可读取实时榜单。'};
 const rows=[];let more=true;
 for(let start=0;start<n&&more;start+=30){
  const module='kg.interact_activity.process_query_svr',method='get_rank_list';
  const param={ReqList:[{ActivityID:page.ext.jztId,ProcessStageIndex:stages.indexOf(stage)+1,TrackID:tracks[0].ID,RankID:rankIndex+1,RankTime:0,EncryptUin:'',Start:start,End:start+30,TopContributors:0,QueryAllRound:0,FilterZero:0}]};
  const body={comm:{tmeAppID:'kg',wns_appid:'1000176',uin:'0',appid:1000176,ct:23,cv:0},req_0:{module,method,param,cmd:module+'.'+method,timeoutms:5000,traceid:'0_'+Date.now()+Math.floor(Math.random()*1000)}};
  const raw=await read('https://wnsaviator.kg.qq.com/wnsaviator/api/v1/transMerge',{method:'POST',headers:{'Content-Type':'application/json',Referer:'https://kg.qq.com/'},body:JSON.stringify(body)});
  const reply=JSON.parse(raw.replace(/("(?:Score|Uin)"\s*:\s*)(\d+)(?=\s*[,}])/g,'$1"$2"'));
  if(reply.code!==0||reply.req_0?.code!==0)throw Error('官方榜单查询失败（'+(reply.req_0?.code??reply.code??'未知')+'），请稍后重试。');
  const group=reply.req_0.data?.RspList?.[0]?.CurRound?.CurGroup;
  if(!Array.isArray(group?.RankList))throw Error('榜单数据结构发生变化，暂时无法汇总。');
  const part=rowsFrom(group.RankList);rows.push(...part);more=!!group.HasMore;
  if(more&&part.length!==30)throw Error('榜单分页数据不完整，请重新查询。');
 }
 if(!rows.length)return {...base,state:'empty',rows:[],total:null,message:'官方榜单暂时没有排名数据，请稍后查询。'};
 return {...base,...summarize(rows,n),state:'ready',message:rows.length<n?'榜单不足 '+n+' 人，已按实际人数汇总。':'已按官方排名顺序汇总。'};
}
export default {async fetch(request){
 const u=new URL(request.url);
 if(u.pathname==='/api/query'){
  if(request.method!=='POST')return json({error:'请使用查询按钮。'},405);
  try{const b=await request.json();return json(await query(b.url,Number(b.n)));}catch(e){return json({error:e.name==='TimeoutError'?'查询超时，请稍后重试。':e.message||'查询失败，请重试。'},400);}
 }
 if(u.pathname!=='/')return new Response('Not found',{status:404});
 return new Response(PAGE,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}};

