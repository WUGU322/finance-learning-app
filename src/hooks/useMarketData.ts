import { useState, useEffect } from 'react'
import axios from 'axios'

interface FundData {
  code: string
  name: string
  netValue: string
  dayGrowth: string
  updateTime: string
}

interface StockData {
  code: string
  name: string
  price: string
  change: string
  changePercent: string
}

export function useMarketData() {
  const [funds, setFunds] = useState<FundData[]>([])
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFunds = async () => {
    setLoading(true)
    try {
      const codes = ['000300', '110011', '161725']
      const results = await Promise.all(
        codes.map(async code => {
          const res = await axios.get(`https://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`, {
            transformResponse: [(data) => {
              const match = data.match(/jsonpgz\((.*)\)/)
              return match ? JSON.parse(match[1]) : null
            }]
          })
          return {
            code: res.data.fundcode,
            name: res.data.name,
            netValue: res.data.gsz,
            dayGrowth: res.data.gszzl,
            updateTime: res.data.gztime
          }
        })
      )
      setFunds(results)
    } catch (error) {
      console.error('获取基金数据失败', error)
    }
    setLoading(false)
  }

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const codes = ['sh000001', 'sz399001', 'sh600519']
      const res = await axios.get(`https://hq.sinajs.cn/list=${codes.join(',')}`)
      const lines = res.data.split('\n').filter((l: string) => l)
      const results = lines.map((line: string) => {
        const match = line.match(/var hq_str_(.+?)="(.+?)"/)
        if (!match) return null
        const [, code, data] = match
        const parts = data.split(',')
        return {
          code: code.toUpperCase(),
          name: parts[0],
          price: parts[3],
          change: (parseFloat(parts[3]) - parseFloat(parts[2])).toFixed(2),
          changePercent: (((parseFloat(parts[3]) - parseFloat(parts[2])) / parseFloat(parts[2])) * 100).toFixed(2)
        }
      }).filter(Boolean)
      setStocks(results)
    } catch (error) {
      console.error('获取股票数据失败', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFunds()
    fetchStocks()
    const interval = setInterval(() => {
      fetchFunds()
      fetchStocks()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return { funds, stocks, loading, refresh: () => { fetchFunds(); fetchStocks() } }
}
