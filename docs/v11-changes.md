# 客户端 v1.1 页面优化改动说明

| 项 | 内容 |
|---|---|
| 仓库 | house-rental-client-front（客户端前端；管理端 house-rental-server / house-rental-front 不在本次范围） |
| 基线 | master `40878b6`（feat: 合入第1代原开发工作区（安居租租赁系统）业务源码） |
| 分支 | `feat/client-v11-visual-ix` |
| 需求依据 | 《安居租客户端页面与交互优化需求文档 v1.1》第 3/8/9/10/12 章 + 附录 A/B |
| 页面范围 | 首页 `#/`、我的 `#/pages/mine/index`、我的租约 `#/pages/lease/list`、房源详情 `#/pages/property/detail?id=H-1025` |
| 视口/环境 | 1280×900（另复检 1440×900）；沙箱内 headless chromium 真实渲染 |

## 1 分批完成情况

| 批次 | 条目 | 目标 | 状态 |
|---|---|---|---|
| P0（第一批） | LOGO-01/02/03、VIS-01/02/03/05、IX-01/02/03/05/06/08、STY-01 | 首屏不再「淡」、Logo 立住、主路径无歧义 | 已完成 |
| P1（第二批） | VIS-04/06、IX-04/07、STY-02/03/04 | 组件态完整、标签与图标体系一致、布局稳定 | 已完成 |

说明：两批合并为同一分支/同一 PR 提交，便于一次性提测；两批均未触碰后端与管理端，可按 v1.1 第 9 章分别回归。改动集中在样式层与页内重排，`<script setup>` 中的数据来源与接口调用未改写。

## 2 21 条条目 → 代码 / SVG 定位

定位方式：源码内以条目编号注释作为锚点（形如 `/* IX-01 ... */`、`<!-- LOGO-01 -->`），可用 `grep -n "IX-01" <file>` 复现；行号基于本分支提交。

| 条目 | 改动内容 | 定位（文件:行） |
|---|---|---|
| VIS-01 | 三级背景（`--bg-page` / `--bg-card` / 品牌浅色强调块）；卡片 1px 中性描边 + 极轻阴影 | `src/styles/v11.css:18`、`src/styles/v11.css:59`；`src/pages/index/index.vue:31`、`src/pages/lease/list.vue:26`、`src/pages/property/detail.vue:9` |
| VIS-02 | 1 个品牌主色 `#07C160`（深色态 `#059A4C`）承担主按钮、选中态、品牌区与关键标签 | `src/styles/v11.css:10`、`src/styles/v11.css:69`；`src/pages/index/index.vue:10`、`src/pages.json:95`（tabBar selectedColor=#059A4C） |
| VIS-03 | 文字三档 `--text-primary/--text-secondary/--text-tertiary`，关键业务信息不用 tertiary | `src/styles/v11.css:22`、`src/styles/v11.css:51`、`src/styles/v11.css:115`；`src/pages/mine/index.vue:20` |
| VIS-04 | 状态标签四色体系（可租=主色、待审核=暖橙、在租=蓝、已出租=中性灰），统一高度与圆角 | `src/components/StatusTag.vue:7`、`src/components/StatusTag.vue:13`；`src/pages/lease/list.vue:26` |
| VIS-05 | 压缩无内容留白：内容区 padding 12/16/24、含固定栏页面 padding-bottom 88px、末屏与底部栏 ≤24px | `src/styles/v11.css:47`、`src/styles/v11.css:148`；`src/pages/lease/list.vue:36` |
| VIS-06 | 组件态：悬停/按下/禁用/加载/空/失败类与输入聚焦态 | `src/styles/v11.css:62`、`src/styles/v11.css:69`、`src/styles/v11.css:155`；`src/pages/index/index.vue:88` |
| IX-01 | 可点元素即时反馈：点击态 hover-class、刷新按钮加载态与结果提示 | `src/pages/index/index.vue:88`、`src/pages/lease/list.vue:13`、`src/pages/lease/list.vue:55`、`src/styles/v11.css:126` |
| IX-02 | 大搜索框 + 主色「搜索」按钮；区域/价格/户型/整租合租筛选展开面板 | `src/pages/index/index.vue:10`、`src/pages/index/index.vue:19`、`src/styles/v11.css:77`、`src/styles/v11.css:83` |
| IX-03 | 主次按钮分级：每屏唯一实心主色主操作，其余描边 | `src/pages/property/detail.vue:44`、`src/styles/v11.css:69`、`src/styles/v11.css:148` |
| IX-04 | 标题去重：租约页仅保留导航栏一处标题 | `src/pages/lease/list.vue:3`、`src/styles/v11.css:93` |
| IX-05 | 底部四 Tab 图标 + 文字；选中态颜色 + 字重双信号 | `src/pages.json:100`~`src/pages.json:121`（iconPath/selectedIconPath）、`src/styles/v11.css:93`、`src/pages/index/index.vue:41` |
| IX-06 | 未登录态：展示「登录 / 注册」主色主按钮，隐藏「退出登录」 | `src/pages/mine/index.vue:15`、`src/pages/mine/index.vue:65` |
| IX-07 | 列表可扫读：分组标题 + 图标 + 行高 ≥48px；快捷入口图标网格 | `src/pages/mine/index.vue:20`、`src/pages/index/index.vue:41`、`src/styles/v11.css:108`、`src/styles/v11.css:115` |
| IX-08 | 刷新结果反馈（成功提示 + 更新时间戳）、空态文案 + 下一步「去首页找房」、失败态原因 + 重试 | `src/pages/lease/list.vue:13`、`src/pages/lease/list.vue:36`、`src/pages/lease/list.vue:55`、`src/styles/v11.css:126` |
| LOGO-01 | 首页首屏品牌区：32px 图形 Logo + 「安居租」+ 主色浅底，min-height 56px | `src/pages/index/index.vue:3`、`src/styles/v11.css:101`、`src/static/brand/logo-anju.svg` |
| LOGO-02 | 四页同一标识与同一主色（首页/我的/租约/详情引用同一 SVG） | `src/pages/index/index.vue:3`、`src/pages/mine/index.vue:3`、`src/pages/lease/list.vue:3`、`src/pages/property/detail.vue:3` |
| LOGO-03 | 标识辨识度：24×24 viewBox 主色图形，对浅色品牌底 ≥3:1，100% 缩放不糊不叠 | `src/styles/v11.css:104`、`src/static/brand/logo-anju.svg`、`src/static/brand/logo-anju-white.svg` |
| STY-01 | 色板落地：主色十六进制 + 3 级中性灰；主色在品牌区/主按钮/选中态 ≥3 处出现 | `src/styles/v11.css:10`、`src/styles/v11.css:12`、`src/styles/v11.css:101`、`src/pages/index/index.vue:3` |
| STY-02 | 8pt 栅格与文字层级：快捷入口 gap 12、三档字号 20/16/13 | `src/styles/v11.css:51`、`src/styles/v11.css:108`、`src/pages/index/index.vue:41` |
| STY-03 | 圆角 ≤3 种（8/12/999）、阴影 ≤2 种，同类组件一致 | `src/styles/v11.css:26`、`src/styles/v11.css:139`、`src/pages/property/detail.vue:3` |
| STY-04 | 布局稳定：内容区 max-width 1200px 居中，1280/1440 无横向滚动 | `src/styles/v11.css:47`（`.page`） |

## 3 涉及文件

修改（7）：`src/App.vue`、`src/components/StatusTag.vue`、`src/pages.json`、`src/pages/index/index.vue`、`src/pages/lease/list.vue`、`src/pages/mine/index.vue`、`src/pages/property/detail.vue`

新增：`src/styles/v11.css`（设计 token 与逐条样式，含条目编号注释）、`src/static/brand/*.svg`（2）、`src/static/icons/*.svg`（22）、`docs/v11-changes.md`（本文件）、`docs/v11-screenshots/*.png`（9）

未纳入提交：`dist/`（本地 `uni build` 产物）、`node_modules/`。

## 4 SVG 源文件清单（24）

- 品牌：`src/static/brand/logo-anju.svg`（主形态，24×24，`#059A4C`+`#07C160`）、`src/static/brand/logo-anju-white.svg`（深底反白形态）
- 底部 Tab（8）：`tab-home.svg` / `tab-home-on.svg`、`tab-lease.svg` / `tab-lease-on.svg`、`tab-msg.svg` / `tab-msg-on.svg`、`tab-mine.svg` / `tab-mine-on.svg`（默认描边 `#5A6472`，选中 `#059A4C`）
- 功能图标（14）：`ic-search`、`ic-filter`、`ic-refresh`、`ic-arrow`、`ic-lease`、`ic-repair`、`ic-contract`、`ic-checkout`、`ic-contact`、`ic-privacy`、`ic-agent`、`ic-facility`、`ic-fav`、`ic-loc`（统一 24×24 viewBox、线宽 1.5/1.6、圆角端点）

## 5 未新增 / 未改动声明（红线）

1. 路由：`src/pages.json` 的 `pages` 数组与基线一致（14 vs 14，比对结果 ROUTES_IDENTICAL）；仅新增 tabBar 的 `iconPath`/`selectedIconPath` 与 `selectedColor`，未新增页面或路由。
2. 业务字段/能力：未新增业务字段、未新增业务能力、未删除既有业务入口。
3. 接口：`src/utils/api.ts` 未在改动文件内；`sendCommand` 的路径、命令名、查询参数与基线一致。
4. 依赖：`package.json` 未改，未引入或整体替换第三方 UI 库。
5. 后端与管理端：`house-rental-client-server` HEAD=`b9ab3f3` 且工作树干净；管理端 `house-rental-server`/`house-rental-front` 未部署、未克隆、无改动。
6. 未做生产上线发布；状态标签仍使用后端下发的 `displayStatus`/`tone`，前端不新增状态映射（`StatusTag.vue` 仅调整样式）。

## 6 改前 / 改后截图对照（同视口 1280×900）

| 页面 | 改前（基线 40878b6 静态构建 5180） | 改后（dev 5173） |
|---|---|---|
| 首页 | `docs/v11-screenshots/before-home-1280x900.png` | `docs/v11-screenshots/after-home-1280x900.png` |
| 我的 | `docs/v11-screenshots/before-mine-1280x900.png` | `docs/v11-screenshots/after-mine-1280x900.png` |
| 我的租约 | `docs/v11-screenshots/before-lease-1280x900.png` | `docs/v11-screenshots/after-lease-1280x900.png` |
| 房源详情 | `docs/v11-screenshots/before-detail-1280x900.png` | `docs/v11-screenshots/after-detail-1280x900.png` |
| 首页 1440×900 复检 | 未采集（见下注） | `docs/v11-screenshots/after-home-1440x900.png` |

注：STY-04 的 1440×900 判定以改后首页 `scrollWidth==innerWidth==1440`（无横向滚动）加 1280×900 改前/改后对照为依据；基线 1440 截图未采集，属本次证据缺口，已在交付说明中披露。

## 7 自测记录（可复核事实）

- 改后四页 headless chromium 渲染：`status=200`、`consoleErrors=0`、`failedRequests=0`；SVG 图标 `naturalWidth=24`；`body` 背景 `rgb(245, 246, 248)`。
- 首页改后可见：品牌区（图形 Logo + 安居租 + 口号）、「搜索」主色按钮、区域/价格/户型/整租合租四个筛选触发件、可租/已出租/待审核三态标签、带图标快捷入口、带图标底部 Tab。
- 我的改后：未登录卡片出现「登录 / 注册」主按钮、分组标题 + 图标列表、未登录态不再出现「退出登录」。
- 我的租约改后：标题仅导航栏一处、「刷新」为次级按钮并带状态文案、空态文案 + 下一步操作、失败态原因 + 重试样式。
- 房源详情改后：固定底部操作栏，唯一实心主色「预约看房」+ 描边「收藏房源」；模块统一为卡片 + 模块标题。
- 改前基线四页同视口渲染同样 `status=200`，可见：纯文字品牌、无搜索按钮、租约页双标题、Tab 无图标、详情双按钮权重接近。

## 8 复现要点

- 改后：`cd /workspace/src/front && npm run dev:h5`（5173），headless chromium 以 1280×900 渲染四页路由。
- 改前：`git worktree add /tmp/baseline 40878b6`，构建后静态服务 5180，同参数渲染。
