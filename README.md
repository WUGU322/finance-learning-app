# 理财学习App

一个从零开始学习理财知识的渐进式Web应用（PWA）

## 功能特性

- 📚 **5大学习模块**：理财基础、储蓄规划、投资入门、风险管理、实践模拟
- 🎨 **8个交互动画**：复利增长、通胀演示、预算饼图、资产天平等
- 📈 **实时行情数据**：基金和股票实时数据（每分钟更新）
- 🛠️ **实用工具**：复利计算器、储蓄计算器、风险评估
- 💰 **模拟投资**：虚拟10万元体验投资
- 📱 **PWA支持**：可添加到手机主屏幕，离线使用
- 🔔 **推送通知**：新功能上线自动通知

## 技术栈

- React 18 + TypeScript + Vite
- Ant Design Mobile
- Service Worker + Web Push API
- 天天基金网API + 新浪财经API

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署到Vercel

1. Fork本仓库到你的GitHub
2. 访问 [Vercel](https://vercel.com)
3. 点击 "Import Project"
4. 选择你fork的仓库
5. 点击 "Deploy"

部署完成后，每次push代码到GitHub，Vercel会自动重新部署。

## 在手机上使用

1. 用手机浏览器打开部署后的网址
2. 点击浏览器菜单中的"添加到主屏幕"
3. 在主屏幕点击图标即可像App一样使用

## 开发计划

- [ ] 用户登录注册（Supabase Auth）
- [ ] 学习进度云同步
- [ ] 更多行情数据源
- [ ] 社区功能

## License

MIT
