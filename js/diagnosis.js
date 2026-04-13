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
 pw:['选择性居留签证','创业签证','投资者签证'],cost:'¥5-30万',proc:'4-10个月'},

{f:'🇲🇽',z:'墨西哥',e:'Mexico',r:'北美',l:'countries/mexico.html',
 a:[5, 6, 7, 8, 8, 8, 8],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[8, 9, 10, 10, 10],p:[4, 4, 8, 5, 6, 8],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['临时居留签证', '永久居留', 'IMMEX工作签'],cost:'¥3-15万',proc:'3-6个月'},

{f:'🇻🇺',z:'瓦努阿图',e:'Vanuatu',r:'大洋洲',l:'countries/vanuatu.html',
 a:[4, 5, 6, 7, 8, 9, 9],d:[6, 7, 7, 7, 7],n:[7, 8, 8, 8, 6],
 j:[5, 4, 3, 3, 3, 4, 4, 3, 6, 4],x:[4, 5, 5, 6, 6],
 b:[3, 5, 7, 10, 10],p:[3, 3, 6, 8, 10, 7],fm:[6, 7, 7, 7],
 t:[5, 7, 7, 7, 7],lb:[0, 0, 0, 0, 0, 0],
 pw:['投资入籍CBI', '荣誉公民'],cost:'¥80-150万',proc:'1-3个月'},

{f:'🇫🇯',z:'斐济',e:'Fiji',r:'大洋洲',l:'countries/fiji.html',
 a:[4, 5, 6, 7, 8, 9, 9],d:[6, 7, 7, 7, 7],n:[5, 7, 8, 8, 4],
 j:[5, 4, 3, 3, 3, 4, 4, 3, 6, 4],x:[4, 5, 5, 6, 6],
 b:[4, 6, 8, 10, 10],p:[3, 3, 8, 6, 7, 9],fm:[6, 7, 7, 7],
 t:[5, 7, 7, 7, 7],lb:[0, 0, 0, 0, 0, 0],
 pw:['投资居留', '退休签证', '工作许可'],cost:'¥5-30万',proc:'2-4个月'},

{f:'🇦🇹',z:'奥地利',e:'Austria',r:'欧洲',l:'countries/austria.html',
 a:[7, 9, 9, 8, 5, 3, 2],d:[3, 5, 7, 9, 10],n:[4, 6, 8, 9, 2],
 j:[9, 6, 7, 8, 6, 4, 5, 5, 4, 3],x:[2, 6, 7, 9, 8],
 b:[6, 8, 10, 10, 10],p:[7, 8, 8, 5, 6, 3],fm:[7, 8, 8, 9],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 8, 0, 0, 0],
 pw:['红白红卡', '欧盟蓝卡', '自雇签证'],cost:'¥5-15万',proc:'3-6个月'},

{f:'🇧🇪',z:'比利时',e:'Belgium',r:'欧洲',l:'countries/belgium.html',
 a:[7, 9, 9, 8, 5, 3, 2],d:[3, 5, 7, 9, 10],n:[4, 6, 8, 9, 2],
 j:[9, 6, 7, 6, 6, 4, 7, 5, 5, 3],x:[2, 6, 7, 9, 8],
 b:[6, 8, 10, 10, 10],p:[7, 8, 8, 5, 6, 3],fm:[7, 8, 8, 9],
 t:[5, 7, 8, 7, 5],lb:[0, 5, 0, 0, 0, 0],
 pw:['单一许可', '欧盟蓝卡', '自雇签证'],cost:'¥5-12万',proc:'2-4个月'},

{f:'🇸🇪',z:'瑞典',e:'Sweden',r:'欧洲',l:'countries/sweden.html',
 a:[8, 9, 9, 7, 5, 3, 1],d:[2, 4, 6, 9, 10],n:[4, 6, 8, 9, 2],
 j:[10, 5, 7, 7, 7, 5, 5, 4, 5, 3],x:[2, 5, 7, 9, 8],
 b:[5, 7, 9, 10, 10],p:[8, 9, 10, 4, 6, 4],fm:[7, 8, 8, 9],
 t:[4, 6, 7, 8, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作许可', '自雇签证', '创业签证'],cost:'¥5-12万',proc:'4-8个月'},

{f:'🇩🇰',z:'丹麦',e:'Denmark',r:'欧洲',l:'countries/denmark.html',
 a:[8, 9, 9, 7, 5, 3, 1],d:[2, 4, 6, 9, 10],n:[4, 6, 8, 9, 2],
 j:[10, 5, 7, 7, 6, 5, 5, 4, 4, 3],x:[2, 5, 7, 9, 8],
 b:[5, 7, 9, 10, 10],p:[8, 8, 10, 4, 6, 4],fm:[7, 8, 8, 9],
 t:[4, 6, 7, 8, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['正面清单签证', 'Pay Limit签证', '创业签证'],cost:'¥5-12万',proc:'3-6个月'},

{f:'🇫🇮',z:'芬兰',e:'Finland',r:'欧洲',l:'countries/finland.html',
 a:[8, 9, 9, 7, 5, 3, 1],d:[2, 4, 6, 9, 10],n:[4, 6, 8, 9, 2],
 j:[10, 4, 6, 7, 7, 5, 4, 4, 5, 3],x:[2, 5, 7, 9, 8],
 b:[5, 7, 9, 10, 10],p:[9, 8, 10, 4, 6, 4],fm:[7, 8, 8, 9],
 t:[4, 6, 7, 8, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['专家签证', '创业居留', '工作居留'],cost:'¥5-12万',proc:'3-6个月'},

{f:'🇬🇷',z:'希腊',e:'Greece',r:'欧洲',l:'countries/greece.html',
 a:[5, 6, 7, 8, 8, 9, 8],d:[5, 6, 7, 7, 8],n:[6, 7, 8, 8, 5],
 j:[7, 5, 4, 4, 4, 6, 5, 4, 7, 4],x:[3, 5, 6, 7, 8],
 b:[4, 6, 8, 10, 10],p:[5, 4, 10, 9, 10, 9],fm:[7, 8, 9, 9],
 t:[4, 6, 7, 8, 8],lb:[0, 0, 0, 0, 0, 0],
 pw:['黄金签证', '被动收入签证', '数字游民签证'],cost:'¥15-60万',proc:'2-4个月'},

{f:'🇵🇱',z:'波兰',e:'Poland',r:'欧洲',l:'countries/poland.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[9, 5, 5, 7, 5, 4, 6, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 7, 7, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作签证', '欧盟蓝卡', '临时居留'],cost:'¥3-8万',proc:'3-6个月'},

{f:'🇷🇴',z:'罗马尼亚',e:'Romania',r:'欧洲',l:'countries/romania.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[9, 4, 4, 6, 4, 4, 5, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[9, 10, 10, 10, 10],p:[5, 7, 7, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作签证', '数字游民签证', '投资居留'],cost:'¥2-8万',proc:'3-6个月'},

{f:'🇨🇿',z:'捷克',e:'Czech Republic',r:'欧洲',l:'countries/czech.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[10, 5, 5, 8, 5, 4, 5, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 8, 8, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['员工卡', '欧盟蓝卡', '自雇签证'],cost:'¥3-10万',proc:'2-5个月'},

{f:'🇭🇺',z:'匈牙利',e:'Hungary',r:'欧洲',l:'countries/hungary.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[9, 5, 4, 6, 4, 4, 5, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 7, 7, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['白卡/工作许可', '宾客投资者', '数字游民签证'],cost:'¥3-30万',proc:'2-4个月'},

{f:'🇱🇺',z:'卢森堡',e:'Luxembourg',r:'欧洲',l:'countries/luxembourg.html',
 a:[7, 9, 9, 8, 5, 3, 2],d:[3, 5, 7, 9, 10],n:[4, 6, 8, 9, 2],
 j:[8, 10, 5, 5, 5, 3, 8, 7, 4, 2],x:[2, 6, 7, 9, 8],
 b:[4, 6, 8, 10, 10],p:[6, 10, 8, 8, 6, 3],fm:[7, 8, 8, 9],
 t:[5, 7, 8, 7, 5],lb:[0, 8, 5, 0, 0, 0],
 pw:['受薪工作许可', '欧盟蓝卡', '投资居留'],cost:'¥8-50万',proc:'2-4个月'},

{f:'🇪🇪',z:'爱沙尼亚',e:'Estonia',r:'欧洲',l:'countries/estonia.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 7, 8, 9, 3],
 j:[10, 4, 4, 5, 4, 5, 5, 4, 8, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 8, 7, 5, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['数字游民签证', '创业签证', 'e-Residency'],cost:'¥3-8万',proc:'1-3个月'},

{f:'🇱🇹',z:'立陶宛',e:'Lithuania',r:'欧洲',l:'countries/lithuania.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[9, 4, 4, 6, 4, 4, 5, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 7, 7, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作签证', '创业签证', '欧盟蓝卡'],cost:'¥3-8万',proc:'2-4个月'},

{f:'🇸🇮',z:'斯洛文尼亚',e:'Slovenia',r:'欧洲',l:'countries/slovenia.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[8, 4, 4, 6, 4, 4, 5, 4, 6, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 6, 8, 4, 6, 4],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['单一许可', '自雇签证', '数字游民签证'],cost:'¥3-10万',proc:'2-5个月'},

{f:'🇱🇻',z:'拉脱维亚',e:'Latvia',r:'欧洲',l:'countries/latvia.html',
 a:[7, 8, 9, 8, 6, 4, 2],d:[3, 5, 7, 8, 9],n:[5, 6, 7, 8, 3],
 j:[9, 4, 4, 5, 4, 4, 5, 4, 5, 3],x:[3, 5, 7, 8, 7],
 b:[8, 9, 10, 10, 10],p:[5, 7, 7, 4, 6, 3],fm:[6, 7, 7, 8],
 t:[5, 7, 8, 7, 5],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作签证', '创业签证', '投资居留'],cost:'¥3-8万',proc:'2-4个月'},

{f:'🇨🇾',z:'塞浦路斯',e:'Cyprus',r:'欧洲',l:'countries/cyprus.html',
 a:[5, 6, 7, 8, 8, 9, 8],d:[5, 6, 7, 7, 8],n:[5, 7, 8, 9, 3],
 j:[7, 5, 4, 4, 4, 6, 5, 4, 7, 4],x:[3, 5, 6, 7, 8],
 b:[4, 6, 8, 10, 10],p:[5, 5, 9, 9, 10, 8],fm:[7, 8, 9, 9],
 t:[4, 6, 7, 8, 8],lb:[0, 0, 0, 0, 0, 0],
 pw:['永久居留', '工作许可', '商务签证'],cost:'¥15-60万',proc:'2-4个月'},

{f:'🇳🇴',z:'挪威',e:'Norway',r:'欧洲',l:'countries/norway.html',
 a:[8, 9, 9, 7, 5, 3, 1],d:[2, 4, 6, 9, 10],n:[4, 6, 8, 9, 2],
 j:[9, 6, 7, 8, 6, 4, 5, 4, 4, 3],x:[2, 5, 7, 9, 8],
 b:[5, 7, 9, 10, 10],p:[8, 8, 10, 5, 6, 4],fm:[7, 8, 8, 9],
 t:[4, 6, 7, 8, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['技术工人签证', '数字游民签证', '创业签证'],cost:'¥5-15万',proc:'4-8个月'},

{f:'🇮🇸',z:'冰岛',e:'Iceland',r:'欧洲',l:'countries/iceland.html',
 a:[8, 9, 9, 7, 5, 3, 1],d:[2, 4, 6, 9, 10],n:[4, 6, 8, 9, 2],
 j:[8, 4, 4, 5, 4, 4, 4, 3, 5, 3],x:[2, 5, 7, 9, 8],
 b:[5, 7, 9, 10, 10],p:[7, 6, 10, 4, 5, 5],fm:[7, 8, 8, 9],
 t:[4, 6, 7, 8, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作居留许可', '长期签证', '数字游民签证'],cost:'¥5-12万',proc:'3-6个月'},

{f:'🇦🇱',z:'阿尔巴尼亚',e:'Albania',r:'欧洲',l:'countries/albania.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 4],
 j:[8, 4, 3, 4, 3, 4, 4, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 5, 7, 5, 6, 7],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作居留', '数字游民签证', '投资居留'],cost:'¥2-8万',proc:'2-4个月'},

{f:'🇧🇦',z:'波黑',e:'Bosnia',r:'欧洲',l:'countries/bosnia.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 4],
 j:[8, 4, 3, 4, 3, 4, 4, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 5, 6, 4, 5, 6],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作居留', '投资居留', '临时居留'],cost:'¥2-6万',proc:'2-4个月'},

{f:'🇲🇪',z:'黑山',e:'Montenegro',r:'欧洲',l:'countries/montenegro.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 4],
 j:[8, 4, 3, 4, 3, 4, 4, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[8, 9, 10, 10, 10],p:[3, 5, 8, 6, 7, 7],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['投资居留', '数字游民签证', '退休居留'],cost:'¥3-15万',proc:'2-4个月'},

{f:'🇲🇰',z:'北马其顿',e:'N. Macedonia',r:'欧洲',l:'countries/north-macedonia.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 4],
 j:[8, 4, 3, 4, 3, 4, 4, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 5, 6, 4, 5, 5],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作居留', '投资居留', '临时居留'],cost:'¥2-6万',proc:'2-4个月'},

{f:'🇷🇸',z:'塞尔维亚',e:'Serbia',r:'欧洲',l:'countries/serbia.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 4],
 j:[9, 4, 3, 5, 3, 5, 4, 3, 8, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 6, 7, 5, 6, 6],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['临时居留', '永久居留', '数字游民'],cost:'¥2-8万',proc:'2-4个月'},

{f:'🇬🇪',z:'格鲁吉亚',e:'Georgia',r:'欧洲',l:'countries/georgia.html',
 a:[6, 7, 8, 8, 7, 6, 5],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 6],
 j:[9, 4, 3, 4, 3, 5, 4, 3, 9, 4],x:[4, 5, 6, 7, 7],
 b:[10, 10, 10, 10, 10],p:[3, 5, 8, 4, 5, 7],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['数字游民Remotely', '工作居留', '投资居留'],cost:'¥1-5万',proc:'1-2个月'},

{f:'🇹🇷',z:'土耳其',e:'Turkey',r:'欧洲',l:'countries/turkey.html',
 a:[5, 7, 8, 9, 8, 6, 4],d:[5, 6, 7, 7, 8],n:[5, 6, 7, 8, 3],
 j:[8, 6, 4, 5, 4, 5, 6, 4, 7, 4],x:[4, 5, 6, 7, 7],
 b:[5, 7, 8, 10, 10],p:[4, 6, 7, 8, 9, 6],fm:[6, 7, 7, 7],
 t:[6, 7, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['投资入籍CBI', '工作居留', '短期居留'],cost:'¥5-300万',proc:'3-6个月'},

{f:'🇸🇦',z:'沙特阿拉伯',e:'Saudi Arabia',r:'亚洲',l:'countries/saudi.html',
 a:[5, 8, 9, 9, 7, 5, 3],d:[3, 5, 7, 8, 9],n:[4, 6, 8, 10, 2],
 j:[8, 8, 6, 8, 4, 3, 7, 4, 5, 3],x:[2, 5, 7, 10, 9],
 b:[4, 6, 8, 10, 10],p:[4, 9, 5, 8, 5, 2],fm:[5, 7, 7, 7],
 t:[7, 8, 7, 5, 3],lb:[0, 0, 0, 0, 0, 0],
 pw:['工作签证', '高级居留(绿卡)', '投资签证'],cost:'¥5-100万',proc:'2-6个月'},

{f:'🇲🇾',z:'马来西亚',e:'Malaysia',r:'亚洲',l:'countries/malaysia.html',
 a:[5, 6, 7, 8, 8, 9, 9],d:[5, 6, 7, 7, 8],n:[6, 7, 8, 9, 4],
 j:[8, 6, 3, 4, 4, 4, 6, 4, 6, 3],x:[3, 5, 6, 7, 7],
 b:[6, 8, 10, 10, 10],p:[5, 6, 9, 6, 6, 10],fm:[6, 7, 8, 8],
 t:[6, 8, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['MM2H第二家园', '工作准证', '数字游民DE Rantau'],cost:'¥15-50万',proc:'3-6个月'},

{f:'🇲🇴',z:'中国澳门',e:'Macao',r:'亚洲',l:'countries/macao.html',
 a:[5, 6, 7, 8, 8, 9, 9],d:[5, 6, 7, 7, 8],n:[6, 7, 7, 8, 5],
 j:[7, 8, 3, 3, 3, 4, 7, 4, 5, 3],x:[3, 5, 6, 7, 7],
 b:[5, 7, 9, 10, 10],p:[5, 7, 6, 7, 7, 3],fm:[6, 7, 8, 8],
 t:[6, 8, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['技术移民', '投资居留', '专才计划'],cost:'¥5-30万',proc:'3-8个月'},

{f:'🇵🇭',z:'菲律宾',e:'Philippines',r:'亚洲',l:'countries/philippines.html',
 a:[5, 6, 7, 8, 8, 9, 9],d:[5, 6, 7, 7, 8],n:[5, 7, 8, 9, 4],
 j:[7, 5, 3, 3, 3, 4, 5, 3, 7, 4],x:[3, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 4, 7, 5, 5, 10],fm:[6, 7, 8, 8],
 t:[6, 8, 8, 7, 6],lb:[0, 0, 0, 0, 0, 0],
 pw:['SRRV退休签证', 'SIRV投资签证', '工作签证'],cost:'¥3-15万',proc:'1-3个月'},

{f:'🇵🇦',z:'巴拿马',e:'Panama',r:'中南美洲',l:'countries/panama.html',
 a:[4, 5, 6, 7, 8, 9, 10],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[6, 8, 10, 10, 10],p:[4, 4, 8, 7, 8, 10],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['养老金签证', '合格投资者', '数字游民签证'],cost:'¥5-30万',proc:'3-6个月'},

{f:'🇨🇱',z:'智利',e:'Chile',r:'中南美洲',l:'countries/chile.html',
 a:[5, 6, 7, 8, 8, 8, 8],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[8, 5, 4, 5, 4, 4, 5, 4, 6, 3],x:[4, 5, 6, 7, 7],
 b:[7, 9, 10, 10, 10],p:[5, 6, 8, 5, 7, 7],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['工作签证', '临时居留', '创业签证'],cost:'¥3-10万',proc:'3-6个月'},

{f:'🇧🇷',z:'巴西',e:'Brazil',r:'中南美洲',l:'countries/brazil.html',
 a:[5, 6, 7, 8, 8, 8, 8],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[7, 5, 3, 4, 3, 5, 5, 3, 6, 3],x:[4, 5, 6, 7, 7],
 b:[8, 9, 10, 10, 10],p:[4, 4, 8, 5, 6, 7],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 3, 10, 0],
 pw:['投资签证', '数字游民签证', '工作签证'],cost:'¥3-30万',proc:'2-6个月'},

{f:'🇦🇷',z:'阿根廷',e:'Argentina',r:'中南美洲',l:'countries/argentina.html',
 a:[5, 6, 7, 8, 8, 8, 8],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 4, 8, 5, 6, 8],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['Rentista签证', '工作签证', '投资居留'],cost:'¥2-10万',proc:'2-4个月'},

{f:'🇺🇾',z:'乌拉圭',e:'Uruguay',r:'中南美洲',l:'countries/uruguay.html',
 a:[5, 6, 7, 8, 8, 8, 8],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[7, 8, 10, 10, 10],p:[5, 4, 9, 6, 7, 9],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['退休/收入签证', '投资居留', '工作签证'],cost:'¥3-15万',proc:'3-6个月'},

{f:'🇨🇷',z:'哥斯达黎加',e:'Costa Rica',r:'中南美洲',l:'countries/costa-rica.html',
 a:[4, 5, 6, 7, 8, 9, 10],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[6, 8, 10, 10, 10],p:[5, 4, 10, 5, 6, 10],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['退休居留', 'Rentista签证', '投资居留'],cost:'¥3-15万',proc:'3-6个月'},

{f:'🇪🇨',z:'厄瓜多尔',e:'Ecuador',r:'中南美洲',l:'countries/ecuador.html',
 a:[4, 5, 6, 7, 8, 9, 10],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[9, 10, 10, 10, 10],p:[3, 3, 8, 5, 5, 10],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['退休签证', '投资居留', '工作签证'],cost:'¥2-10万',proc:'2-4个月'},

{f:'🇵🇾',z:'巴拉圭',e:'Paraguay',r:'中南美洲',l:'countries/paraguay.html',
 a:[5, 6, 7, 8, 7, 7, 6],d:[5, 6, 7, 7, 8],n:[7, 8, 8, 8, 5],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[10, 10, 10, 10, 10],p:[3, 3, 6, 5, 7, 7],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 10, 0, 0],
 pw:['永久居留', '投资居留', 'SUACE签证'],cost:'¥1-5万',proc:'1-3个月'},

{f:'🇬🇩',z:'格林纳达',e:'Grenada',r:'中南美洲',l:'countries/grenada.html',
 a:[4, 5, 6, 7, 8, 8, 7],d:[5, 6, 7, 7, 8],n:[5, 7, 8, 9, 3],
 j:[6, 5, 3, 3, 3, 5, 5, 3, 7, 4],x:[4, 5, 6, 7, 7],
 b:[3, 4, 6, 10, 10],p:[3, 3, 6, 8, 10, 6],fm:[7, 8, 9, 9],
 t:[5, 7, 8, 8, 7],lb:[0, 0, 0, 3, 0, 0],
 pw:['投资入籍CBI', 'E-2条约投资者(美)'],cost:'¥90-160万',proc:'3-6个月'},

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
    purposes:s3[0]?chips(s3[0]):[]
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
  // Weighted sum (region filtering now handled in showReport)
  var W={a:15,d:14,n:14,j:10,x:10,b:8,p:10,fm:4,t:8,lb:7};
  var raw=0;
  for(var k in W) raw+=(s[k]||0)*W[k]/10;
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

/* ── Labels ── */
var LB_AGE=['18-25岁','26-30岁','31-35岁','36-40岁','41-45岁','46-50岁','50岁以上'];
var LB_EDU=['高中/中专','大专','本科','硕士','博士'];
var LB_JOB=['IT/互联网','金融/保险','医疗/制药','工程/制造','教育/科研',
            '设计/创意','商务/管理','法律/会计','自由职业','其他'];
var LB_EXP=['应届','1-3年','3-5年','5-10年','10年以上'];

/* ── Dimension insight snippets (high/med) ── */
var DIM_HI={
  a:'您的年龄段在该国移民积分体系中处于最优区间，可获得接近满分的年龄加分。',
  d:'学历背景符合该国高技能人才引进标准，在积分评估中具有显著学历优势。',
  n:'您的英语水平满足该国移民语言要求，语言维度无需额外准备。',
  j:'您所在行业属于该国紧缺职业清单中的优先领域，雇主担保或独立申请均有优势。',
  x:'丰富的工作经验在该国技术移民评分中属于高分段，是核心竞争力之一。',
  b:'预算范围充裕，可覆盖该国主要移民路径的全部费用，路径选择灵活度高。',
  p:'您的移民目的与该国核心优势高度吻合。',
  lb:'您的小语种能力在该国移民体系中可获得显著额外加分，这是多数申请人不具备的优势。'
};
var DIM_MD={
  a:'您的年龄段在该国签证体系中处于中等竞争力区间，建议尽早启动以最大化年龄分值。',
  d:'学历满足该国基本申请门槛。',
  n:'英语水平基本达标，进一步提升语言成绩可显著提高竞争力。',
  j:'您的职业背景在该国有一定需求，建议关注具体职业评估要求。',
  x:'工作经验满足该国移民申请的基本要求。',
  b:'预算可覆盖该国部分移民路径，建议重点关注性价比最优方案。',
  p:'该国在您关注的方向上具有一定优势。',
  lb:''
};

/* ── Generate rich paragraph for free section ── */
function genRichDesc(c,p,dims){
  var age=LB_AGE[p.age]||'';
  var edu=LB_EDU[p.edu]||'';
  var job=LB_JOB[p.job]||'';
  var exp=LB_EXP[p.exp]||'';
  // Sort dimensions by score
  var ranked=Object.keys(DIM_HI).filter(function(k){return dims[k]!==undefined})
    .sort(function(a,b){return(dims[b]||0)-(dims[a]||0)});
  // Build paragraph with top 3 insights
  var intro='作为'+age+edu+'学历、拥有'+exp+'经验的'+job+'从业者，';
  var sentences=[];
  for(var i=0;i<Math.min(3,ranked.length);i++){
    var k=ranked[i],s=dims[k]||0;
    if(s>=7&&DIM_HI[k]) sentences.push(DIM_HI[k]);
    else if(s>=5&&DIM_MD[k]) sentences.push(DIM_MD[k]);
  }
  if(!sentences.length) sentences.push('该国移民体系与您的综合背景有一定匹配度。');
  return intro+sentences.join('')+
    '推荐路径：'+c.pw.join('、')+'。预估全流程费用'+c.cost+'，审批周期约'+c.proc+'。';
}

/* ── Show Report (main entry) ── */
function showReport(){
  var p=getProfile();

  /* Score all countries (always full pool, no region filter) */
  var all=DB.map(function(c){
    var sc=scoreOne(c,p);
    return{f:c.f,z:c.z,e:c.e,l:c.l,r:c.r,pw:c.pw,cost:c.cost,proc:c.proc,
           total:sc.total,dims:sc.dims};
  });
  all.sort(function(a,b){return b.total-a.total});
  var topN=all.slice(0,10);

  /* ── Profile summary bar ── */
  var age=LB_AGE[p.age]||'';
  var edu=LB_EDU[p.edu]||'';
  var job=LB_JOB[p.job]||'';
  var exp=LB_EXP[p.exp]||'';
  var PUR=['子女教育','职业发展','生活品质','资产配置','身份规划','退休养老'];
  var purTags='';
  if(p.purposes&&p.purposes.length){
    p.purposes.forEach(function(i){if(PUR[i]) purTags+='<span class="rpt-ptag">'+PUR[i]+'</span>';});
  }
  var profileHtml='<div class="rpt-profile">'+
    '<span class="rpt-ptag">'+age+'</span>'+
    '<span class="rpt-ptag">'+edu+'</span>'+
    '<span class="rpt-ptag">'+job+'</span>'+
    '<span class="rpt-ptag">'+exp+'经验</span>'+
    purTags+'</div>';

  /* ── Fixed split: 4 free + 6 locked ── */
  var total=10;
  var freeCount=4;
  var lockCount=6;

  /* ── FREE zone: reverse countdown, rich cards ── */
  var DIM_LABEL={a:'年龄',d:'学历',n:'英语',j:'职业',x:'经验',b:'预算',p:'目的',lb:'语言'};
  var freeHtml='';
  for(var i=total-1;i>=lockCount;i--){
    var m=topN[i],rank=i+1;
    var desc=genRichDesc(m,p,m.dims);
    /* build dimension bars — show top 5 dimensions */
    var dimKeys=Object.keys(DIM_LABEL).filter(function(k){return m.dims[k]!==undefined})
      .sort(function(a,b){return(m.dims[b]||0)-(m.dims[a]||0)}).slice(0,5);
    var barsHtml='<div class="rpt-dims">';
    dimKeys.forEach(function(k){
      var v=Math.round((m.dims[k]||0)*10);
      var color=v>=70?'var(--green)':v>=50?'var(--gold)':'var(--ink3)';
      barsHtml+='<div class="rpt-dim-row">'+
        '<span class="rpt-dim-lbl">'+DIM_LABEL[k]+'</span>'+
        '<div class="rpt-dim-track"><div class="rpt-dim-fill" style="width:'+v+'%;background:'+color+'"></div></div>'+
        '<span class="rpt-dim-val">'+v+'</span></div>';
    });
    barsHtml+='</div>';
    freeHtml+='<div class="rpt-item">'+
      '<div class="rpt-item-head">'+
        '<span class="rpt-rank">#'+rank+'</span>'+
        '<span style="font-size:28px">'+m.f+'</span>'+
        '<div><div style="font-family:\'Noto Serif SC\',serif;font-size:16px;font-weight:600">'+m.z+
          '<span style="font-size:12px;color:var(--ink3);font-weight:400;margin-left:6px">'+m.e+'</span></div>'+
          '<div style="font-size:12px;color:var(--ink3)">'+m.r+'</div></div>'+
        '<div class="rpt-score" style="margin-left:auto">'+m.total+'</div>'+
      '</div>'+
      '<div class="rpt-desc">'+desc+'</div>'+
      barsHtml+
      '<div class="rpt-tags">'+
        m.pw.map(function(w){return'<span class="rpt-tag">'+w+'</span>'}).join('')+
        '<span class="rpt-tag">'+m.cost+'</span>'+
        '<span class="rpt-tag">'+m.proc+'</span>'+
      '</div>'+
      '<a class="rpt-more" href="'+m.l+'" target="_blank">查看完整分析：申请条件详解、材料清单、费用明细… →</a>'+
    '</div>';
  }

  /* ── LOCKED zone: reverse countdown to #1 ── */
  var lockHtml='';
  for(var i=lockCount-1;i>=0;i--){
    var m=topN[i],rank=i+1;
    var badge=rank===1?'🏆 #1 您的最佳匹配':
              rank<=3?'#'+rank+' ★ 高度匹配':'#'+rank;
    var badgeStyle=rank<=3?'color:var(--gold);font-weight:600':'color:var(--ink3);font-weight:600';
    var hint=rank===1?'该国在您的核心维度上获得了最高综合评分，匹配度远超其他候选':
             rank<=3?'多个核心维度高度匹配，推荐路径竞争力强':
             '综合评分优于 '+(60-rank*5)+'% 的候选国家';
    lockHtml+='<div class="rpt-locked">'+
      '<div class="rpt-locked-head">'+
        '<span style="font-size:22px;filter:blur(2px)">'+m.f+'</span>'+
        '<span style="'+badgeStyle+'">'+badge+'</span>'+
        '<span style="font-family:\'Noto Serif SC\',serif;font-size:15px;filter:blur(5px);user-select:none">'+m.z+'</span>'+
        '<span class="rpt-score" style="margin-left:auto;filter:blur(4px);user-select:none">'+m.total+'</span>'+
      '</div>'+
      '<div class="rpt-locked-hint">'+hint+'</div>'+
    '</div>';
  }

  /* ── Blurred detailed report (behind paywall) ── */
  var S='font-family:\'Noto Serif SC\',serif;font-size:16px;';
  var dh='<h3 style="'+S+'margin-bottom:16px">TOP '+total+' 完整诊断分析</h3>';
  topN.forEach(function(m,i){
    dh+='<p style="margin-bottom:14px"><b>#'+(i+1)+' '+m.f+' '+m.z+
      ' (匹配度'+m.total+'分)</b><br>'+genRichDesc(m,p,m.dims)+'</p>';
  });
  dh+='<h3 style="'+S+'margin:20px 0 12px">个性化时间线规划</h3>';
  dh+='<p>第1-3个月：语言备考 + 学历认证<br>'+
    '第4-6个月：提交意向书 / 申请工作许可<br>'+
    '第7-12个月：获邀 + 体检 + 背景调查 + 最终审批</p>';

  /* ── Assemble ── */
  document.getElementById('rpt-card').innerHTML=
    '<div class="rpt-head"><h2 style="font-family:\'Noto Serif SC\',serif">您的 AI 移民诊断报告</h2>'+
    '<p>基于您的背景与偏好，AI 从 <b>'+DB.length+'</b> 个国家中为您筛选了 <b>TOP 10</b> 目的地</p></div>'+
    profileHtml+
    '<div class="rpt-summary">'+
    '<h3 style="font-family:\'Noto Serif SC\',serif;margin-bottom:4px">匹配倒计时</h3>'+
    '<p style="font-size:13px;color:var(--ink2);margin-bottom:16px">从第10名开始揭晓，您的最佳匹配在最后…</p>'+
    freeHtml+
    '<div class="rpt-divider"><span>🔒 TOP 6 — 付费解锁区</span></div>'+
    lockHtml+'</div>'+
    '<div class="paywall-wrap"><div class="paywall-blur">'+dh+'</div>'+
    '<div class="paywall-overlay">'+
    '<h3 style="font-family:\'Noto Serif SC\',serif">解锁完整 AI 诊断报告</h3>'+
    '<p style="margin-bottom:12px">揭晓您的最佳匹配 #1 及 TOP 6 详细分析</p>'+
    '<div class="pw-features">'+
      '<div class="pw-feat">揭晓 TOP 6 匹配国家及评分</div>'+
      '<div class="pw-feat">每个国家的深度可行性分析（800-1200字）</div>'+
      '<div class="pw-feat">基于您背景的具体申请步骤与材料清单</div>'+
      '<div class="pw-feat">10国横向对比：费用·周期·成功率·生活成本</div>'+
      '<div class="pw-feat">个性化风险评估与避坑指南</div>'+
      '<div class="pw-feat">3套备选方案（激进/稳健/保守）时间线规划</div>'+
    '</div>'+
    '<div class="pw-price">¥199</div>'+
    '<div class="pw-orig">限时优惠中</div>'+
    '<button class="btn-pay" onclick="alert(\'支付功能即将上线，敬请期待！\')">立即解锁完整报告</button>'+
    '<p style="font-size:11px;color:var(--ink3);margin-top:10px">支持微信支付 / 支付宝</p>'+
    '</div></div>';

  document.getElementById('wizard').style.display='none';
  document.getElementById('report').style.display='block';
  document.getElementById('report').scrollIntoView({behavior:'smooth'});
}
