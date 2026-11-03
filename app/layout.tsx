import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '智创未来 · SYNAPSE', description: '让意图长出结构。连接模型、工具与人的创造流程。' };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="zh-CN"><body>{children}</body></html> }
