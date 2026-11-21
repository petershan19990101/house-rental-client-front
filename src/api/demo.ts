export interface PropertyItem {
  id: string
  title: string
  region: string
  layout: string
  rent: number
  displayStatus: string
  tone: string
  desc: string
}

export const properties: PropertyItem[] = [
  { id: 'H-1024', title: '阳光花园A1-2-1503', region: '朝阳', layout: '2室1厅', rent: 5200, displayStatus: '可租', tone: 'success', desc: '南北通透，近地铁6号线，配套齐全，可随时看房。' },
  { id: 'H-1025', title: '翠湖苑B2-1-802', region: '海淀', layout: '1室1厅', rent: 6800, displayStatus: '已出租', tone: 'brand', desc: '精装修，家电齐全，物业24小时值守。' },
  { id: 'H-1026', title: '金地C3-3-501', region: '西城', layout: '3室2厅', rent: 4500, displayStatus: '待审核', tone: 'warning', desc: '整租，采光好，业主直租。' }
]

export interface LeaseItem {
  id: string
  property: string
  period: string
  rent: number
  deposit: number
  displayStatus: string
  tone: string
}

export const leases: LeaseItem[] = [
  { id: 'LT-2026-0871', property: '阳光花园A1-2-1503', period: '2026-03-01 ~ 2027-02-28', rent: 5200, deposit: 10400, displayStatus: '在租', tone: 'success' },
  { id: 'LT-2025-0321', property: '翠湖苑B2-1-802', period: '2025-01-01 ~ 2025-12-31', rent: 6800, deposit: 13600, displayStatus: '已到期', tone: 'neutral' }
]

export interface RepairItem {
  id: string
  category: string
  desc: string
  displayStatus: string
  tone: string
  createdAt: string
}

export const repairs: RepairItem[] = [
  { id: 'WO-2026-0512', category: '水电', desc: '厨房水管漏水', displayStatus: '处理中', tone: 'info', createdAt: '2026-05-12 09:20' },
  { id: 'WO-2026-0318', category: '门窗', desc: '卧室门锁卡顿', displayStatus: '已完成', tone: 'success', createdAt: '2026-03-18 14:05' }
]

export interface MessageItem {
  id: string
  title: string
  body: string
  createdAt: string
  unread: boolean
}

export const messages: MessageItem[] = [
  { id: 'MSG-1', title: '合同待签署', body: '阳光花园A1-2-1503 合同已生成，请在 3 日内完成线上签署。', createdAt: '2026-03-01 10:00', unread: true },
  { id: 'MSG-2', title: '工单进度更新', body: '厨房水管漏水工单已派单，维修人将于今日 18:00 上门。', createdAt: '2026-05-12 11:30', unread: true },
  { id: 'MSG-3', title: '租约到期提醒', body: '阳光花园A1-2-1503 租约将于 2027-02-28 到期，可发起续租。', createdAt: '2027-01-29 09:00', unread: false }
]
