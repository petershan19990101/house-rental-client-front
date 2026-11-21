const BASE = (import.meta as any).env?.VITE_CLIENT_API || 'http://127.0.0.1:8082'

export function currentPartyId(): string {
  return uni.getStorageSync('partyId') || 'party-demo-001'
}

export interface CommandResult {
  ok: boolean
  offline?: boolean
  data?: any
}

// 客户端仅通过 client-bff 的 8 条白名单命令提交，写权威在管理端
export function sendCommand(command: string, payload: Record<string, unknown> = {}): Promise<CommandResult> {
  return new Promise((resolve) => {
    uni.request({
      url: BASE + '/client-api/commands/' + command + '?partyId=' + encodeURIComponent(currentPartyId()),
      method: 'POST',
      data: payload,
      success: (res: any) => resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, data: res.data }),
      fail: () => resolve({ ok: false, offline: true })
    })
  })
}

// 双端待办固定字段：partyId、command、todoType、idempotencyKey、status、createdAt
export function buildTodo(command: string) {
  return {
    partyId: currentPartyId(),
    command,
    todoType: command,
    idempotencyKey: command + '-' + Date.now(),
    status: 'ACCEPTED',
    createdAt: new Date().toISOString()
  }
}
