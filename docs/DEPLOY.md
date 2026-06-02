# 部署指南

## 部署到Vercel（推荐）

### 方式1：通过GitHub自动部署

1. **创建GitHub仓库**
   ```bash
   # 在GitHub上创建新仓库（不要初始化README）
   # 然后在本地执行：
   git remote add origin https://github.com/你的用户名/finance-learning-app.git
   git branch -M main
   git push -u origin main
   ```

2. **连接Vercel**
   - 访问 https://vercel.com
   - 点击 "Add New Project"
   - 选择你的GitHub仓库
   - 点击 "Deploy"

3. **自动部署**
   - 每次push代码到GitHub，Vercel会自动重新部署
   - 部署完成后会生成一个网址，如：https://finance-learning-app.vercel.app

### 方式2：通过Vercel CLI部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 在手机上使用

### Android手机

1. 用Chrome浏览器打开部署后的网址
2. 点击右上角菜单 → "添加到主屏幕"
3. 在主屏幕点击图标即可使用

### iPhone

1. 用Safari浏览器打开部署后的网址
2. 点击底部分享按钮 → "添加到主屏幕"
3. 在主屏幕点击图标即可使用

## 推送通知设置

部署后，用户可以在浏览器中订阅推送通知：

1. 打开网站后，浏览器会提示"允许通知"
2. 点击"允许"即可接收更新通知

### 发送推送通知

当你更新代码并部署后，可以通过以下方式通知用户：

```javascript
// 在浏览器控制台执行
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.ready.then(registration => {
    registration.showNotification('理财学习', {
      body: '新功能上线啦！快来体验吧',
      icon: '/icon-192.png'
    })
  })
}
```

## 环境变量（可选）

如果需要使用付费API或Supabase，在Vercel项目设置中添加环境变量：

```
VITE_SUPABASE_URL=你的Supabase URL
VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

## 自定义域名（可选）

在Vercel项目设置中可以绑定自己的域名：

1. 进入项目 → Settings → Domains
2. 添加你的域名
3. 按照提示配置DNS记录

## 常见问题

### Q: 部署后无法访问？
A: 检查Vercel部署日志，确保构建成功。

### Q: 手机上无法添加到主屏幕？
A: 确保使用HTTPS访问，Vercel自动提供HTTPS。

### Q: 行情数据不更新？
A: 免费API可能有限制，刷新页面重新获取数据。

### Q: 推送通知不工作？
A: iOS Safari需要先"添加到主屏幕"后才支持推送。
