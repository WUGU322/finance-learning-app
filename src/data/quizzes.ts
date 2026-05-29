export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizzes: Record<string, QuizQuestion[]> = {
  basics: [
    {
      question: '理财的核心目标是什么？',
      options: ['一夜暴富', '让财富保值增值，实现人生目标', '只是存钱不花', '跟风炒股'],
      correctIndex: 1,
      explanation: '理财是合理管理资金，让财富保值增值，帮助实现人生各阶段的目标。',
    },
    {
      question: '以下哪个属于被动收入？',
      options: ['工资', '兼职收入', '银行存款利息', '加班费'],
      correctIndex: 2,
      explanation: '被动收入是不需要持续劳动就能获得的收入，如利息、房租、投资收益等。',
    },
    {
      question: '净资产的计算公式是？',
      options: ['收入 - 支出', '总资产 - 总负债', '存款 + 投资', '工资 × 12'],
      correctIndex: 1,
      explanation: '净资产 = 总资产 - 总负债，代表你真正拥有的财富。',
    },
    {
      question: '根据72法则，年利率6%时，资金大约多少年翻倍？',
      options: ['6年', '8年', '12年', '18年'],
      correctIndex: 2,
      explanation: '72法则：72 ÷ 年利率 = 翻倍年数。72 ÷ 6 = 12年。',
    },
    {
      question: '通货膨胀意味着什么？',
      options: ['钱越来越值钱', '物价下降', '同样的钱能买到的东西越来越少', '银行利率上升'],
      correctIndex: 2,
      explanation: '通货膨胀就是物价持续上涨，同样的钱购买力下降。',
    },
  ],
  savings: [
    {
      question: '紧急备用金一般建议准备多少？',
      options: ['1个月生活费', '3-6个月生活费', '1年生活费', '越多越好'],
      correctIndex: 1,
      explanation: '一般建议准备3-6个月的生活支出作为紧急备用金。',
    },
    {
      question: '50/30/20法则中，20%应该用于？',
      options: ['房租', '娱乐', '储蓄和投资', '餐饮'],
      correctIndex: 2,
      explanation: '50/30/20法则：50%必要支出，30%个人消费，20%储蓄和投资。',
    },
    {
      question: '紧急备用金最适合放在哪里？',
      options: ['股票账户', '长期定期存款', '货币基金或活期存款', '买黄金'],
      correctIndex: 2,
      explanation: '备用金需要安全且随时可取，货币基金和活期存款最合适。',
    },
    {
      question: '"先付给自己"是什么意思？',
      options: ['先给自己买礼物', '收到工资先储蓄再消费', '先还信用卡', '先交房租'],
      correctIndex: 1,
      explanation: '先付给自己 = 收到工资后先把一部分存起来，剩下的才是可以花的钱。',
    },
  ],
  investment: [
    {
      question: '以下哪个是投资而非投机的行为？',
      options: ['追涨杀跌', '加杠杆炒短线', '定投指数基金长期持有', '听消息买股票'],
      correctIndex: 2,
      explanation: '投资基于分析和研究，关注长期价值。定投指数基金并长期持有是典型的投资行为。',
    },
    {
      question: '风险从低到高排列正确的是？',
      options: ['股票<基金<债券<存款', '存款<债券<基金<股票', '基金<股票<存款<债券', '债券<存款<股票<基金'],
      correctIndex: 1,
      explanation: '一般来说，风险从低到高：银行存款 < 债券 < 基金 < 股票。',
    },
    {
      question: '有人推荐"保本年化收益15%"的产品，你应该？',
      options: ['赶紧投资', '多投一些', '高度警惕，很可能是骗局', '介绍给朋友'],
      correctIndex: 2,
      explanation: '高收益必然伴随高风险，"保本高收益"几乎一定是骗局。',
    },
    {
      question: '定投的优势是什么？',
      options: ['保证赚钱', '自动实现低买多高买少', '不需要任何资金', '一个月就能翻倍'],
      correctIndex: 1,
      explanation: '定投通过固定金额定期买入，自动实现价格低时买得多、价格高时买得少。',
    },
  ],
  risk: [
    {
      question: '买保险应该遵循什么顺序？',
      options: ['先小孩后大人', '先理财后保障', '先保障后理财，先大人后小孩', '只买最贵的'],
      correctIndex: 2,
      explanation: '先保障后理财（纯保障型优先），先大人后小孩（大人是经济支柱）。',
    },
    {
      question: '以下哪种不建议购买？',
      options: ['百万医疗险', '意外险', '返还型保险', '定期重疾险'],
      correctIndex: 2,
      explanation: '返还型保险保费贵且收益低，不如买纯保障型+自己投资。',
    },
    {
      question: '投资组合需要多久再平衡一次？',
      options: ['每天', '每周', '每半年到一年', '永远不需要'],
      correctIndex: 2,
      explanation: '建议每半年或一年调整一次组合比例，不要频繁操作。',
    },
  ],
}
