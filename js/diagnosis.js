/* ══════════════════════════════════════════
   GlobalVisa · AI Diagnosis Matching Engine
   ══════════════════════════════════════════ */

/* ── Nav & UI ── */
function goStep(n){
  document.querySelectorAll('.step').forEach(function(s){s.classList.remove('active')});
  document.querySelector('[data-step="'+n+'"]').classList.add('active');
  document.getElementById('wiz-bar').style.width=(n/5*100)+'%';
  document.getElementById('wizard').scrollIntoView({behavior:'smooth',block:'start'});
}
function toggleChip(el){el.classList.toggle('on')}

/* ── Country Database ──
   Scoring arrays indexed by questionnaire option position (0-based):
   a=age[7]: 18-25,26-30,31-35,36-40,41-45,46-50,50+
   d=edu[5]: 高中,大专,本科,硕士,博士
   n=eng[5]: 基础,中等,良好,优秀,无英语
   j=job[10]: IT,金融,医疗,工程,教育,设计,商务,法律,自由,其他
   x=exp[5]: 应届,1-3年,3-5年,5-10年,10+
   b=budget[5]: <10万,10-30万,30-100万,100-500万,500万+
   p=purpose[6]: 子女教育,职业发展,生活品质,资产配置,身份规划,退休养老
   fm=family[4]: 单身,已婚无子,学龄前,在读
   t=time[5]: 尽快,1-2年,2-3年,3-5年,5年+
   lb=lang[6]: 日语,法语,德语,西班牙语,葡萄牙语,韩语
*/
var DB=[
{f:'🇨🇦',z:'加拿大',e:'Canada',r:'北美',l:'countries/canada.html',
 a:[9,10,9,7,4,2,1],d:[2,4,7,9,10],n:[2,5,8,10,0],
 j:[10,6,9,8,6,5,6,5,4,3],x:[3,7,8,10,8],
 b:[8,10,10,10,10],p:[10,9,8,5,8,4],fm:[7,8,9,10],
 t:[6,9,8,6,4],lb:[0,10,0,0,0,0],
 pw:['EE快速通道','省提名PNP','SUV创业签证'],cost:'¥8-15万',proc:'6-12个月'},

{f:'🇦🇺',z:'澳大利亚',e:'Australia',r:'大洋洲',l:'countries/australia.html',
 a:[8,10,10,8,5,2,1],d:[2,4,7,9,10],n:[2,5,8,10,0],
 j:[10,5,9,8,7,4,5,5,3,3],x:[2,6,8,10,9],
 b:[6,8,10,10,10],p:[9,9,10,5,7,5],fm:[7,8,9,10],
 t:[4,7,9,8,5],lb:[0,0,0,0,0,0],
 pw:['189独立技术','190州担保','491偏远地区'],cost:'¥10-18万',proc:'8-18个月'},

{f:'🇺🇸',z:'美国',e:'USA',r:'北美',l:'countries/usa.html',
 a:[7,9,9,8,6,4,2],d:[3,4,6,8,10],n:[3,6,8,10,1],
 j:[10,8,7,6,7,5,7,7,6,3],x:[2,5,7,9,10],
 b:[3,5,7,9,10],p:[8,10,7,9,7,3],fm:[6,7,8,9],
 t:[2,4,6,8,9],lb:[0,0,0,3,0,0],
 pw:['EB-1杰出人才','EB-2/NIW','EB-5投资移民'],cost:'¥15-350万',proc:'1-5年'},

{f:'🇬🇧',z:'英国',e:'UK',r:'欧洲',l:'countries/uk.html',
 a:[8,9,9,7,5,3,1],d:[2,4,7,9,10],n:[3,6,8,10,0],
 j:[10,8,8,6,7,5,7,6,5,3],x:[2,6,8,9,8],
 b:[5,7,9,10,10],p:[9,9,8,6,7,3],fm:[7,8,9,10],
 t:[5,8,8,6,4],lb:[0,0,0,0,0,0],
 pw:['技术工人签证','全球人才签证','创新创始人签证'],cost:'¥10-20万',proc:'3-6个月'},

{f:'🇳🇿',z:'新西兰',e:'New Zealand',r:'大洋洲',l:'countries/new-zealand.html',
 a:[8,10,9,7,5,3,1],d:[2,4,7,9,10],n:[3,6,8,10,0],
 j:[9,4,8,8,7,4,5,4,4,3],x:[2,6,8,10,8],
 b:[8,10,10,10,10],p:[10,7,10,4,7,6],fm:[8,9,10,10],
 t:[5,8,8,7,5],lb:[0,0,0,0,0,0],
 pw:['技术移民SMC','工作转居留','投资移民'],cost:'¥8-15万',proc:'6-18个月'},

{f:'🇩🇪',z:'德国',e:'Germany',r:'欧洲',l:'countries/germany.html',
 a:[8,9,9,8,6,4,2],d:[3,5,8,9,10],n:[4,7,8,9,2],
 j:[10,5,7,10,7,4,5,4,5,3],x:[3,6,8,10,9],
 b:[10,10,10,10,10],p:[7,10,8,4,6,3],fm:[7,8,8,9],
 t:[7,9,8,6,4],lb:[0,0,10,0,0,0],
 pw:['机会卡Chancenkarte','欧盟蓝卡','ICT签证'],cost:'¥3-8万',proc:'3-8个月'},

{f:'🇯🇵',z:'日本',e:'Japan',r:'亚洲',l:'countries/japan.html',
 a:[7,9,9,8,6,4,3],d:[3,5,7,9,10],n:[6,7,7,8,5],
 j:[10,5,4,7,6,8,5,4,6,3],x:[3,6,8,9,8],
 b:[10,10,10,10,10],p:[6,8,9,4,5,5],fm:[7,7,8,8],
 t:[6,8,8,7,5],lb:[10,0,0,0,0,0],
 pw:['高度人才签证HSP','技术·人文签证','经营管理签证'],cost:'¥3-10万',proc:'3-6个月'},

{f:'🇸🇬',z:'新加坡',e:'Singapore',r:'亚洲',l:'countries/singapore.html',
 a:[7,9,9,8,5,3,1],d:[2,4,7,9,10],n:[4,6,8,10,1],
 j:[10,10,6,5,5,4,8,6,7,3],x:[2,5,7,10,9],
 b:[5,7,9,10,10],p:[8,10,7,9,7,2],fm:[6,7,7,8],
 t:[8,9,7,5,3],lb:[0,0,0,0,0,0],
 pw:['EP就业准证','ONE Pass','GIP全球投资者'],cost:'¥5-50万',proc:'1-3个月'},

{f:'🇵🇹',z:'葡萄牙',e:'Portugal',r:'欧洲',l:'countries/portugal.html',
 a:[5,6,7,8,8,9,9],d:[5,6,7,8,8],n:[7,8,8,8,5],
 j:[7,6,4,4,4,6,6,4,8,5],x:[4,5,6,7,8],
 b:[4,6,8,10,10],p:[6,5,10,8,10,10],fm:[8,9,9,9],
 t:[5,7,8,8,7],lb:[0,0,0,3,10,0],
 pw:['D7被动收入签证','黄金签证','数字游民签证'],cost:'¥5-50万',proc:'4-12个月'},

{f:'🇮🇪',z:'爱尔兰',e:'Ireland',r:'欧洲',l:'countries/ireland.html',
 a:[7,9,9,8,5,3,2],d:[2,4,7,9,10],n:[4,6,8,10,1],
 j:[10,8,9,5,5,4,6,5,5,3],x:[2,6,8,9,8],
 b:[7,9,10,10,10],p:[8,9,8,5,7,3],fm:[7,8,9,9],
 t:[6,8,8,6,4],lb:[0,0,0,0,0,0],
 pw:['关键技能就业许可','一般就业许可','Stamp 4'],cost:'¥5-12万',proc:'3-6个月'},

{f:'🇳🇱',z:'荷兰',e:'Netherlands',r:'欧洲',l:'countries/netherlands.html',
 a:[7,9,9,8,5,3,2],d:[3,5,7,9,10],n:[5,7,8,9,2],
 j:[10,6,6,7,6,5,6,5,7,3],x:[2,6,8,9,8],
 b:[7,9,10,10,10],p:[7,9,9,5,6,3],fm:[7,8,8,9],
 t:[6,8,8,6,4],lb:[0,0,0,0,0,0],
 pw:['KM知识移民','自雇签证','欧盟蓝卡'],cost:'¥5-12万',proc:'2-4个月'},

{f:'🇫🇷',z:'法国',e:'France',r:'欧洲',l:'countries/france.html',
 a:[7,8,9,8,6,4,3],d:[3,5,7,9,10],n:[5,6,7,8,3],
 j:[9,6,6,7,8,7,6,5,7,3],x:[3,6,7,9,8],
 b:[8,9,10,10,10],p:[7,8,10,5,6,5],fm:[7,8,9,9],
 t:[5,7,8,7,5],lb:[0,10,0,0,0,0],
 pw:['人才护照','受薪员工签证','创业签证'],cost:'¥3-10万',proc:'3-8个月'},

{f:'🇨🇭',z:'瑞士',e:'Switzerland',r:'欧洲',l:'countries/switzerland.html',
 a:[6,8,9,8,5,3,1],d:[2,4,6,9,10],n:[3,5,7,9,1],
 j:[9,10,8,7,6,3,7,6,3,2],x:[1,4,6,9,10],
 b:[2,4,6,8,10],p:[5,10,9,9,5,3],fm:[5,7,7,7],
 t:[3,5,7,8,7],lb:[0,5,8,0,0,0],
 pw:['L工作许可','B短期许可','C永居许可'],cost:'¥10-30万',proc:'6-18个月'},

{f:'🇭🇰',z:'中国香港',e:'Hong Kong',r:'亚洲',l:'countries/hongkong.html',
 a:[8,10,9,7,5,3,2],d:[3,5,7,9,10],n:[5,7,8,9,3],
 j:[10,10,5,4,5,4,9,6,7,3],x:[2,6,8,10,9],
 b:[7,9,10,10,10],p:[8,10,6,8,8,2],fm:[6,7,8,8],
 t:[8,9,7,5,3],lb:[0,0,0,0,0,0],
 pw:['高才通TTPS','优才计划','专才计划ASMTP'],cost:'¥3-8万',proc:'1-4个月'},

{f:'🇦🇪',z:'阿联酋',e:'UAE',r:'亚洲',l:'countries/uae.html',
 a:[5,8,9,9,7,5,3],d:[3,5,7,8,9],n:[4,6,8,10,2],
 j:[9,10,5,6,4,4,9,5,8,3],x:[2,5,7,10,10],
 b:[3,5,7,10,10],p:[5,9,7,10,8,4],fm:[5,7,7,7],
 t:[8,9,7,5,3],lb:[0,0,0,0,0,0],
 pw:['黄金签证','绿色签证','自由区签证'],cost:'¥10-150万',proc:'1-3个月'},

{f:'🇰🇷',z:'韩国',e:'Korea',r:'亚洲',l:'countries/korea.html',
 a:[7,9,9,7,5,3,2],d:[3,5,7,9,10],n:[6,7,7,8,4],
 j:[10,5,5,7,6,8,5,4,5,3],x:[3,6,8,9,7],
 b:[9,10,10,10,10],p:[6,8,8,4,5,3],fm:[6,7,7,8],
 t:[6,8,8,7,5],lb:[0,0,0,0,0,10],
 pw:['E-7专门职业签证','F-2居留签证','D-8投资签证'],cost:'¥3-8万',proc:'3-8个月'},

{f:'🇪🇸',z:'西班牙',e:'Spain',r:'欧洲',l:'countries/spain.html',
 a:[5,6,7,8,8,9,9],d:[5,6,7,7,8],n:[7,8,8,8,5],
 j:[7,5,4,4,4,7,5,4,9,5],x:[3,5,6,7,8],
 b:[5,7,9,10,10],p:[6,5,10,7,8,10],fm:[8,9,10,10],
 t:[5,7,8,8,7],lb:[0,0,0,10,0,0],
 pw:['非盈利签证','数字游民签证','黄金签证'],cost:'¥5-50万',proc:'3-8个月'},

{f:'🇹🇭',z:'泰国',e:'Thailand',r:'亚洲',l:'countries/thailand.html',
 a:[4,5,6,7,8,9,10],d:[6,7,7,7,7],n:[7,8,8,8,5],
 j:[7,5,3,3,3,5,5,3,8,5],x:[3,4,5,6,7],
 b:[9,10,10,10,10],p:[4,4,9,6,5,10],fm:[6,7,8,8],
 t:[7,8,8,7,6],lb:[0,0,0,0,0,0],
 pw:['LTR长期居留','精英签证','退休签证'],cost:'¥2-15万',proc:'1-3个月'},

{f:'🇲🇹',z:'马耳他',e:'Malta',r:'欧洲',l:'countries/malta.html',
 a:[4,6,7,8,8,8,7],d:[4,5,6,7,8],n:[5,7,8,10,3],
 j:[8,7,4,3,4,5,6,5,6,4],x:[3,5,6,7,8],
 b:[3,5,7,10,10],p:[6,6,8,9,10,7],fm:[7,8,8,8],
 t:[4,6,7,8,8],lb:[0,0,0,0,0,0],
 pw:['MPRP永居','游牧居留许可','公民身份计划'],cost:'¥50-700万',proc:'6-14个月'},

{f:'🇮🇹',z:'意大利',e:'Italy',r:'欧洲',l:'countries/italy.html',
 a:[5,6,7,8,8,8,8],d:[4,5,7,8,8],n:[6,7,7,8,4],
 j:[7,5,4,4,5,8,5,4,8,4],x:[3,5,6,7,8],
 b:[5,7,8,10,10],p:[6,5,10,7,8,9],fm:[8,9,9,9],
 t:[4,6,7,8,7],lb:[0,0,0,3,0,0],
 pw:['选择性居留签证','创业签证','投资者签证'],cost:'¥5-30万',proc:'4-10个月'}
];

/* ── Collect User Profile ── */
function getProfile(){
  function v(id){var e=document.getElementById(id);return e?e.selectedIndex-1:-1}
  function chips(container){
    var r=[];
    container.querySelectorAll('.chip').forEach(function(c,i){
      if(c.classList.contains('on'))r.push(i);
    });
    return r;
  }
  var s3=document.querySelectorAll('[data-step="3"] .chip-group');
  return{
    age:Math.max(0,v('q-age')),
    edu:Math.max(0,v('q-edu')),
    job:Math.max(0,v('q-job')),
    exp:Math.max(0,v('q-exp')),
    eng:Math.max(0,v('q-eng')),
    budget:Math.max(0,v('q-budget')),
    income:Math.max(0,v('q-income')),
    time:Math.max(0,v('q-time')),
    family:Math.max(0,v('q-family')),
    langs:chips(document.getElementById('lang-chips')),
    purposes:s3[0]?chips(s3[0]):[],
    regions:s3[1]?chips(s3[1]):[]
  };
}

/* ── Score One Country ── */
function scoreOne(c,p){
  var s={};
  s.a=c.a[p.age]||5;
  s.d=c.d[p.edu]||5;
  s.n=c.n[p.eng]||5;
  s.j=c.j[p.job]||5;
  s.x=c.x[p.exp]||5;
  s.b=c.b[p.budget]||5;
  s.fm=c.fm[p.family]||5;
  s.t=c.t[p.time]||5;
  s.p=p.purposes.length?
    p.purposes.reduce(function(sum,i){return sum+(c.p[i]||5)},0)/p.purposes.length:5;
  s.lb=p.langs.length?
    Math.max.apply(null,p.langs.map(function(i){return c.lb[i]||0})):0;
  // Region match
  var rm=0;
  if(!p.regions.length||p.regions.indexOf(4)>=0) rm=5;
  else{
    var M=['北美','欧洲','大洋洲','亚洲'];
    rm=p.regions.some(function(i){return M[i]===c.r})?8:-3;
  }
  // Weighted sum
  var W={a:15,d:14,n:14,j:10,x:10,b:8,p:10,fm:4,t:8,lb:7};
  var raw=0;
  for(var k in W) raw+=(s[k]||0)*W[k]/10;
  raw+=rm;
  var total=Math.round(35+raw*60/113);
  return{total:Math.min(97,Math.max(35,total)),dims:s};
}

/* ── Generate Why Text ── */
var DLBL={
  a:'年龄处于该国最优积分区间',
  d:'学历背景符合高技能人才要求',
  n:'英语水平满足语言门槛',
  j:'职业领域属于该国紧缺行业',
  x:'工作经验为申请显著加分',
  b:'预算匹配主要移民路径',
  p:'移民目的与该国优势高度契合',
  lb:'小语种能力是独特加分项'
};
function genWhy(c,dims){
  var keys=Object.keys(DLBL).filter(function(k){return(dims[k]||0)>=7})
    .sort(function(a,b){return(dims[b]||0)-(dims[a]||0)}).slice(0,2);
  var r=keys.map(function(k){return DLBL[k]}).join('，');
  if(!r) r='综合评估匹配度较高';
  return r+'。推荐：'+c.pw[0];
}

/* ── Labels for detail text ── */
var LB_EDU=['高中/中专','大专','本科','硕士','博士'];
var LB_JOB=['IT/互联网','金融/保险','医疗/制药','工程/制造','教育/科研',
            '设计/创意','商务/管理','法律/会计','自由职业','其他'];

/* ── Show Report (main entry) ── */
function showReport(){
  var p=getProfile();
  var results=DB.map(function(c){
    var sc=scoreOne(c,p);
    return{f:c.f,z:c.z,e:c.e,l:c.l,pw:c.pw,cost:c.cost,proc:c.proc,
           total:sc.total,dims:sc.dims};
  });
  results.sort(function(a,b){return b.total-a.total});
  var top=results.slice(0,3);
  var edu=LB_EDU[p.edu]||'';
  var job=LB_JOB[p.job]||'';

  // TOP 3 free summary
  var mh='';
  top.forEach(function(m){
    mh+='<div class="rpt-match"><span class="rpt-flag">'+m.f+'</span>'+
      '<div class="rpt-info"><div class="rpt-country">'+m.z+'</div>'+
      '<div class="rpt-why">'+genWhy(m,m.dims)+'</div></div>'+
      '<div class="rpt-score">'+m.total+'</div></div>';
  });

  // Blurred detail section
  var S='font-family:\'Noto Serif SC\',serif;font-size:16px;';
  var dh='<h3 style="'+S+'margin-bottom:16px">📋 详细诊断分析</h3>';
  top.forEach(function(m,i){
    var lvl=m.total>=80?'显著':'一定';
    dh+='<p style="margin-bottom:14px"><b>'+(i+1)+'. '+m.f+' '+m.z+
      ' (匹配度'+m.total+'分)</b><br>'+
      '推荐路径：'+m.pw.join(' / ')+'<br>'+
      '作为'+edu+'学历的'+job+'从业者，您在'+m.z+
      '的移民体系中具有'+lvl+'优势。'+
      '预估费用：'+m.cost+'，审批周期约'+m.proc+'。'+
      '详细申请条件、材料清单和避坑指南请查看完整报告。</p>';
  });
  dh+='<h3 style="'+S+'margin:20px 0 12px">⏱ 个性化时间线规划</h3>';
  dh+='<p>第1-3个月：语言备考 + 学历认证（WES/VETASSESS/ENIC等）<br>'+
    '第4-6个月：提交意向书 / 申请工作许可 / 投资方案确认<br>'+
    '第7-12个月：获邀 + 体检 + 背景调查 + 最终审批</p>';
  dh+='<h3 style="'+S+'margin:20px 0 12px">💰 费用估算明细</h3>';
  top.forEach(function(m){
    dh+='<p>'+m.f+' '+m.z+'全流程：'+m.cost+
      '（含签证费、语言考试、学历认证、中介费等）</p>';
  });

  // Assemble report card
  document.getElementById('rpt-card').innerHTML=
    '<div class="rpt-head"><h2>🧭 您的 AI 移民诊断报告</h2>'+
    '<p>基于您的背景信息，AI 为您匹配了以下最适合的移民目的地</p></div>'+
    '<div class="rpt-summary"><h3>🏆 最佳匹配 TOP 3</h3>'+mh+'</div>'+
    '<div class="paywall-wrap"><div class="paywall-blur">'+dh+'</div>'+
    '<div class="paywall-overlay"><h3>解锁完整诊断报告</h3>'+
    '<p>包含详细分析、个性化时间线、费用明细、材料清单、避坑指南等完整内容</p>'+
    '<div class="pw-price">¥199</div>'+
    '<div class="pw-orig">限时优惠中</div>'+
    '<button class="btn-pay" onclick="alert(\'支付功能即将上线，敬请期待！\')">立即解锁完整报告</button>'+
    '<p style="font-size:11px;color:var(--ink3);margin-top:10px">支持微信支付 / 支付宝</p>'+
    '</div></div>';

  document.getElementById('wizard').style.display='none';
  document.getElementById('report').style.display='block';
  document.getElementById('report').scrollIntoView({behavior:'smooth'});
}
