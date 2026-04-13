# GV Tracker v2.6

## DEC (D01-D09 confirmed 04-12)
D01:no-WP | D02:TA-CN | D03:PAY-WX/ZFB | D04:GHP+CF→ALI-HK | D05:DX-AI-pay | D06:SP-free | D07:AI+human | D08:SEO-hybrid | D09:user=PM,claude=dev

## P1 · Arch ✅
T001:CSS-extract ✅ | T002:JS-extract ✅ | T003:nav-unify ✅ | T004:sitemap+18 ✅ | T005:sitemap+mbr ✅
> Result: -870KB(-22%), -14121 dup lines

## P2 · Deploy ⏳
T006:domain-buy P1✅(immiforyou.com,CF) | T007:GHP-bind P0✅(CNAME+canonical) | T008:CF-CDN P0✅(proxy-on+SSL) | T009:ALI-HK P3💤(post-rev)

## P3 · Pay ⏳
T010:vendor-select P1⏳(MBD/HPJ/AFD) | T011:WX-pay P0⏳(user-reg) | T012:ZFB-pay P0⏳ | T013:DX-pay-flow P1⏳(dep:010) | T014:MBR-sub P2⏳

## P4 · MBR ⏳
T015:MBR-page-redesign P1⏳ | T016:paywall-real P1⏳ | T017:tier-system P2⏳(4-tier-funnel)

## P5 · DX-AI 🔄
T018:questionnaire-UI P0✅(5step+chips) | T019:match-algo P0✅(61c×10dim) | T020:CL-API-backend P0⏳(CF-WK,dep:API-key) | T021:report-web P1🔄(free-reduce+paid-design) | T022:report-PDF P2⏳ | T023:paywall-UI P0✅(blur+unlock) | T024:pricing P1🔄(needs-validation) | T025:SP-DB P1⏳

## P5.3 · DX-Report 报告系统（独立开发任务）🔄
> 核心问题：免费/付费内容必须明确差异化，付费报告需接入Claude API实时生成，不可模板拼接
> 状态：方案已确认待讨论细节，需用户提供API Key后启动T020

| 编号 | 任务 | 优先级 | 状态 | 说明 |
|------|------|--------|------|------|
| T048 | 免费区做减法 | P0 | ⏳ | 免费区仅保留：国名+分数+一句话摘要，移除genRichDesc段落/路径标签/费用标签/维度条，制造信息差 |
| T049 | 付费报告内容架构 | P0 | ⏳ | 设计付费报告结构：每国800-1200字深度分析、申请步骤、材料清单、费用拆解、成功率、风险点 |
| T050 | Claude API 后端搭建 | P0 | ⏳(dep:API-key) | Cloudflare Workers + Claude API，接收用户画像→生成个性化报告，= T020 |
| T051 | Prompt Engineering | P0 | ⏳(dep:T050) | 设计生成报告的 system prompt，确保输出格式一致、内容专业、不产生幻觉 |
| T052 | 10国横向对比表 | P1 | ⏳(dep:T050) | 付费报告专属：费用·周期·成功率·生活成本·语言要求 横向对比 |
| T053 | 3套时间线方案 | P1 | ⏳(dep:T050) | 付费报告专属：激进/稳健/保守 三套方案，含里程碑节点 |
| T054 | 风险评估模块 | P1 | ⏳(dep:T050) | 基于用户背景的个性化风险提醒+避坑指南 |
| T055 | 报告缓存机制 | P2 | ⏳(dep:T050) | 相同画像24h内复用报告，降低API调用成本 |
| T056 | 报告页前端重构 | P1 | ⏳(dep:T049) | 付费报告展示页面设计：多tab/锚点导航、打印友好、可保存 |

> 免费 vs 付费差异化原则：
> - 免费 = 排名+分数+钩子（让用户知道"有答案"但"看不到全貌"）
> - 付费 = Claude实时生成的个性化深度分析（无法通过免费区推导出）
> - 绝对禁止：付费内容与免费内容结构相同仅数量不同

## P5.2 · Ops ⏳
T026:content-workflow P1⏳(A/B/C-tier) | T027:free-vs-paid P1🔄(→P5.3)

## P6 · SEO 🔄
T028:GA P1✅(G-7T4EQEHBCG) | T029:BD-stats P1⏳ | T030:GSC P1✅(immiforyou.com verified+sitemap submitted) | T031:BD-webmaster P2⏳ | T032:EEAT-about P1✅ | T033:AI-compliance P1⏳ | T034:longtail-KW P2⏳ | T035:blog-section P2⏳ | T036:email-collect P2⏳ | T037:retention P3⏳ | T038:social-proof P3⏳ | T039:backlinks P3⏳

## Other
T040:a11y P3⏳ | T041:minify P3⏳ | T042:HP-hero-color P1⏳(dark-vs-light) | T043:HP-CTA-pos P2⏳ | T044:file-reorg P0✅(countries/) | T045:doc-encode P0✅(this-commit) | T046:EU-non-WIP-activate P0✅(10cards) | T047:GH-acct-security P1⏳(2FA+SSH+tokens)

## Stats
Total:56 | ✅:18 | 🔄:3 | ⏳:34 | 💤:1

## Log
04-12 v1.0: init-review | v2.0: DEC-confirm+41-tasks | v2.1: P1-done(-870KB) | v2.2: HP-hero+DX-page+sitemap67 | v2.3: GA-deploy+EEAT-page+file-reorg+doc-encode | v2.4: EU-non-10cards-activate+GH-sec-task
04-13 v2.5: DX-report-system(P5.3)+region-remove+free-paid-diff+T019→61c+CLAUDE-md-restore+GSC-resubmit
04-13 v2.6: domain-immiforyou.com+CF-CDN+GHP-CNAME+sitemap-newdomain+GSC-newdomain-verified
