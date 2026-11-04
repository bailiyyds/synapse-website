# SYNAPSE · 智创未来

Next.js 15 / React 19 / TypeScript strict / Tailwind CSS v4。

## 运行

```sh
npm ci
npm run dev
npm run build
```

生产构建导出到 `out/`，可托管于任何静态站点服务。字体通过 next/font/local 在构建时打包，访问者无需连接外部字体 CDN。

## 功能

- 原生 WebGL2 神经织体：900 节点、2400 连线、单次实例化绘制；无 WebGL 时 Canvas 280 节点降级。
- DPR 上限 2；页面隐藏、离屏时停止动画；减少动态效果偏好切换。
- 7 节点能力图谱，支持键盘焦点与点击/触摸选择。
- Lenis 与 GSAP ScrollTrigger 同步，桌面场景横向滚动，移动端与减少动态效果时静态阅读。
- Motion 表单按钮过渡、滚动数字、宣言揭示、交替时间轴。
- 接入表单打开预填 GitHub Issue，由访客确认提交；不含邮件收集或私有后台。
- 自动 CI 类型检查、构建及静态站点包。

## 内容边界

架构数字来自页面实现，不是商业运营数据。演进路径是概念阶段，不宣称未经提供的历史日期。未宣称 200 席位或已过期的 2026 Q1 招募。

## 本地 Windows 编译器问题

若原生 SWC 下载不完整，可使用已安装的同版本 WASM 编译器。只在当前终端设置 `NEXT_TEST_WASM=1` 和 `NEXT_TEST_WASM_DIR` 为本项目 `node_modules/@next/swc-wasm-nodejs` 的绝对路径后构建。正常部署环境无需这些变量。

详细验证流程见 VERIFICATION.md；浏览器测试与性能数据以最终验收报告为准。
