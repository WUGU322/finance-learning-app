import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

const tabs = [
  { key: '/', title: '首页', icon: '🏠' },
  { key: '/courses', title: '课程', icon: '📖' },
  { key: '/market', title: '行情', icon: '📈' },
  { key: '/tools', title: '工具', icon: '🔧' },
  { key: '/profile', title: '我的', icon: '👤' },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
      <div style={{ borderTop: '1px solid #eee', background: '#fff' }}>
        <TabBar activeKey={location.pathname} onChange={key => navigate(key)}>
          {tabs.map(tab => (
            <TabBar.Item
              key={tab.key}
              icon={<span style={{ fontSize: 20 }}>{tab.icon}</span>}
              title={tab.title}
            />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
