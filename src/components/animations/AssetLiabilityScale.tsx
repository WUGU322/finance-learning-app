import { useState, useEffect } from 'react'

export default function AssetLiabilityScale() {
  const [assets, setAssets] = useState(0)
  const [liabilities, setLiabilities] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssets(150000)
      setLiabilities(80000)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const netWorth = assets - liabilities
  const tilt = Math.max(-15, Math.min(15, (liabilities - assets) / 10000))

  return (
    <div style={{ background: '#f6fff6', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 16 }}>
        资产 vs 负债 天平
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 260, height: 120 }}>
          <div style={{
            position: 'absolute', left: '50%', top: 0, width: 4, height: 50,
            background: '#999', transform: 'translateX(-50%)',
          }} />
          <div style={{
            position: 'absolute', top: 50, left: '50%', width: 220, height: 4,
            background: '#666', borderRadius: 2,
            transform: `translateX(-50%) rotate(${tilt}deg)`,
            transformOrigin: 'center', transition: 'transform 1s ease',
          }}>
            <div style={{
              position: 'absolute', left: -10, top: -40,
              width: 80, textAlign: 'center',
            }}>
              <div style={{ fontSize: 24 }}>💎</div>
              <div style={{ fontSize: 11, color: '#52c41a', fontWeight: 600 }}>资产</div>
            </div>
            <div style={{
              position: 'absolute', right: -10, top: -40,
              width: 80, textAlign: 'center',
            }}>
              <div style={{ fontSize: 24 }}>💳</div>
              <div style={{ fontSize: 11, color: '#ff4d4f', fontWeight: 600 }}>负债</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 40, height: 8, background: '#ddd', borderRadius: 4 }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div>
          <input type="range" min={0} max={500000} step={10000} value={assets}
            onChange={e => setAssets(Number(e.target.value))}
            style={{ width: 100 }}
          />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#52c41a' }}>¥{assets.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: '#999' }}>总资产</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>净资产</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: netWorth >= 0 ? '#52c41a' : '#ff4d4f' }}>
            ¥{netWorth.toLocaleString()}
          </div>
        </div>
        <div>
          <input type="range" min={0} max={500000} step={10000} value={liabilities}
            onChange={e => setLiabilities(Number(e.target.value))}
            style={{ width: 100 }}
          />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4d4f' }}>¥{liabilities.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: '#999' }}>总负债</div>
        </div>
      </div>
    </div>
  )
}
