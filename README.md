# SYNAPSE — 智创未来

当前状态：阶段一静态界面草稿，尚未通过构建与浏览器视觉验收，不是最终交付版本。

已新增：app/layout.tsx、app/page.tsx、app/globals.css、components/layout/Chrome.tsx、components/sections/Sections.tsx、components/sections/CapabilityGraph.tsx、lib/constants.ts、package.json、tsconfig.json、postcss.config.mjs、.gitignore。

设计决策：黑白明暗切换、左下大标题、细线能力关系图与克制酸绿信号；避免通用卡片堆叠。

已知遗留：依赖安装未完成；本地字体未接入；尚未实现 WebGL/Canvas 织体、GSAP/Lenis 滚动编排、motion 过渡及性能测量；尚未完成全部文案集中与独立 section 文件拆分；接入表单与真实业务数据尚待接入；GitHub 仓库已创建，本次提交保存阶段一草稿。当前 CSS 几何图为阶段一静态构图。

启动：npm install，然后 npm run dev。验证：npm run build。

目标仓库：bailiyyds/synapse-website。
