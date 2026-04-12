# GV · Project Context

> Auto-read by Claude Code. Encoded for continuity. All refs use internal codenames.

## SYS

- STACK: static HTML/CSS/JS, GH-Pages, zero-framework
- GA: G-7T4EQEHBCG (all pages)
- GSC: submitted 2026-04-09
- CUTOFF: 2025-05, realtime data needs user verify or WebSearch

## TREE

```
/
├── index.html          # HP (独立CSS/JS, vars: --bg/--text)
├── diagnosis.html      # DX page
├── membership.html     # MBR page (独立CSS/JS)
├── about.html          # EEAT page
├── countries/          # 62 CP files (shared css/js)
│   └── *.html          # refs: ../css/country.css, ../js/country.js
├── css/country.css     # 14.7KB shared
├── js/country.js       # nav/footer/faq/scroll
├── sitemap.xml         # 67 URLs
├── robots.txt
└── docs/tracker.md     # progress (encoded)
```

## DEV

- CP style → `css/country.css` (62 auto)
- CP nav/footer → `js/country.js` IIFE
- CP specific → edit `countries/X.html`
- A-tier CP (usa/uk/ca/au/nz) have inline `<style>`
- HP/MBR independent CSS, don't mix with CP vars (--ink/--paper)
- Link CP from root: `countries/X.html`
- New CP: copy `countries/albania.html` template → update meta → add to sitemap + HP grid
- Git: main direct, push = deploy
- Post-work: update tracker.md + show summary to user

## DESIGN

- Colors: gold=#b07d2a, ink=#1d1d1f, green=#1a5c35, red=#8b1a1a, blue=#1a3f6f, amber=#7c4d00
- Fonts: NotoSerifSC(zh-title), DMSans(body), PlayfairDisplay(numbers)
- Breakpoint: 768px
- Hero: calc(100vh) adaptive, CTA above fold

## ROLE

- BIZ: prioritize by rev-impact, funnel=traffic→reg→pay, no vanity features
- SEO: every page needs meta/canonical/JSON-LD, search-intent focus, internal linking
- UX: design-system consistency, mobile-first, major visual changes need user approval
- SEC: no API keys in frontend, CF-WK as middleware
- COMM: neutral, no hype, mark uncertain data, update tracker after work

## DEC (confirmed 04-12)

- D01: no-WP, keep GH-Pages static
- D02: TA=CN-mainland
- D03: PAY=WX+ZFB (MBD/HPJ/AFD), no-Stripe
- D04: INFRA=GHP+CF-CDN → mid:ALI-HK-OSS
- D05: CORE-PROD=DX-AI single-pay
- D06: DB=Supabase-free(500MB/50kMAU)
- D07: CONTENT=AI-write+human-verify
- D08: SEO=AI-assist+human-value(src-cite/orig-analysis/time-signal)
- D09: ROLES=user(CEO+PM), claude(fullstack)

## CONTENT

- TIER-A(monthly): us/ca/uk/au/nz/jp/sg/de/pt
- TIER-B(quarterly): kr/hk/ae/ie/nl/fr/ch
- TIER-C(semi-annual): rest
- LAYERS: L0=free(basic info, funnel-top), L1=MBR(deep analysis), L2=DX(personalized report, core-rev)

## TEAM

- EC: LYZ/10x/P+D
- R1: CSY/PR-CA/NA
- R2: ZKM/BC-DE/EU
- R3: ZHZ/EP-SG/AP

## SEO

- EEAT: about.html live
- Structured: JSON-LD WebSite+ItemList on HP
- Compliance: src-cite + orig-analysis + timestamp
- TODO: blog section, baidu-stats, longtail-KW content

## NOTES

- U:NT, all-tech=CL
- NO-CN-TLD(reg-constraint)
- PAY:WX/ZFB only
- NODE:avoid-ML
