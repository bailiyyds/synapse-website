# 阶段交付与验收

## 阶段一：结构与字体
- 文件：app/layout.tsx、page.tsx、globals.css、icon.svg；components/layout/Chrome.tsx；七个独立 section；lib/constants.ts。
- 决策：中文粗体建立主标题力度，英文 Instrument Serif 提供冷暖对比；首屏左下锚定，明暗章节切换。
- 状态：TypeScript strict 检查和生产构建通过；本地字体在构建时打包。

## 阶段二：神经织体
- 文件：components/visual/LatticeLayer.tsx、WebGLLattice.tsx、Lattice.tsx、NoiseOverlay.tsx、GridField.tsx；lib/webgl.ts、shaders.ts、motion.ts。
- 决策：WebGL2 单次实例化绘制 900 个节点与 2400 条连线；Canvas 280 节点降级。无 three.js 或后处理依赖。
- 状态：浏览器实际显示 WebGL 织体，无控制台错误；一次 CPU 提交耗时读数约 0.30 ms（不代表 GPU 时间或帧率保证）。
- 限制：漂移使用平滑插值噪声；注意力场随指针高亮，连线脉冲以 180 ms 时间常数衰减。

## 阶段三：滚动编排
- 文件：components/layout/SmoothScroll.tsx；CapabilityGraph.tsx、Metrics.tsx、AccessForm.tsx；lib/scroll.ts。
- 决策：首次滚动才载入 GSAP/Lenis；桌面横向场景，移动端保持纵向阅读；交互支持点击与键盘焦点。
- 状态：能力选择切换说明已实际验证。滚动编排已实现，reduced-motion 使用静态布局和停止绘制。

## 阶段四：打磨
- 文件：next.config.ts、.github/workflows/verify.yml、VERIFICATION.md、README.md、package-lock.json。
- 状态：480/768/1024/1440 四个视口检查均无横向溢出；浏览器控制台错误为 0；表单提供标签、原生约束验证与可见焦点。
- 构建：Next.js 报告首页 First Load JS 108 KB；异步滚动库不计入该数字。真实设备 LCP/INP/CLS 与持续帧率不可由构建输出推断。
- 接入边界：表单仅打开预填 GitHub Issue，最终发布由访客确认；没有私有申请后台、邮件发送或虚构的成功提示。
- 内容边界：未提供真实运营数据、历史日期与席位信息，因此使用可核实架构数字与概念演进阶段。
- Lighthouse 移动端模拟：性能 94、无障碍 100、最佳实践 100、SEO 100；LCP 2.4 s、CLS 0、TBT 210 ms。使用本地 gzip 服务和无头 Edge（禁用 GPU）。LCP 尚未达到 <2.0 s 的原始目标；INP 与真实设备持续帧率仍需上线实测。


