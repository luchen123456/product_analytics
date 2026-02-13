# 电商选品分析系统（后端）README

面向跨境电商卖家：采集（爬取）Shopee 商品数据 → 清洗与结构化 → 潜力评估与选品算法 → 结合大模型生成 AI 选品建议 → 对外提供 API，供前端与自动化流程调用。

前端已部署：`https://product-analytics-one.vercel.app/`

---

## 0. 路线 A（TS + Playwright）本仓库已落地的骨架

本目录已提供一个可部署到 Vercel 的 **Serverless API（`backend/api/`）**，以及一个可在独立环境运行的 **Playwright Worker（`backend/src/worker/`）**。

**任务投递/消费（已补齐）**
- 创建任务时会把 `jobId` 入队（Upstash Redis list；若未配置 Upstash，则退化为进程内内存队列，仅适合本地开发）。
- Worker 通过 `npm run worker:consume` 轮询队列并执行 Playwright 抓取，然后更新 job 状态。

**快速开始（本地）**
1) 进入后端目录：`cd backend`
2) 安装依赖：`npm install`
3) 参考 `.env.example` 配置环境变量（可选但推荐）
4) 启动 Serverless 本地开发（需安装 Vercel CLI）：`vercel dev`
5) 创建任务：`POST /api/crawl/jobs`
6) 查询任务：`GET /api/crawl/jobs/{jobId}`

**建议的环境变量**
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`：用于存储 job 状态（未配置时会退化为内存存储，不适合线上）。
- `INTERNAL_API_KEY`：Worker 回写 job 状态用（请求头 `x-internal-key`，线上建议必配）。
- `WORKER_POLL_MS`：Worker 轮询队列间隔（毫秒）。
- `SHOPEE_BASE_URL`：用于 `keyword/shopId` 输入时拼接抓取目标（默认 `https://shopee.sg`）。

**Worker 示例**
- 抓取一次并回写 job（独立机器/容器运行）：`npm run worker:crawl -- --url <productUrl> --jobId <jobId> --backendBaseUrl <https://your-backend.vercel.app>`
- 启动队列消费者（建议独立机器/容器运行）：`npm run worker:consume`

---

## 1. 目标与非目标

**目标**
- 稳定采集 Shopee 商品/店铺/类目数据，并可持续增量更新。
- 产出可解释的“潜力评分/标签”（High/Med/Low）与关键指标（销量、价格带、评价等）。
- 提供 AI 选品建议：机会点、风险点、定价建议、差异化方向。
- 以 Vercel Serverless Functions 对外提供低延迟 API（查询/触发任务/取结果）。

**非目标（建议单独系统承载）**
- 大规模、长耗时的全站爬取与重算（不适合直接跑在 Vercel 函数里）。
- 重度实时流式计算（建议用专门的流处理或数仓体系）。

---

## 2. 技术栈选择（及理由）

以下以“Vercel 承载 API + 外部 Worker 承载爬虫/批处理”为默认推荐架构（更贴合 Serverless 运行约束）。

### 2.1 语言与运行时
- **TypeScript + Node.js（API 层）**
  - 与前端同栈，模型/类型可复用（DTO、枚举、校验规则）。
  - Vercel 原生支持，冷启动与部署体验好。
- **Python 或 Node.js（爬虫/清洗/算法 Worker）**
  - 爬虫侧可选 Python（生态成熟）或 Node（Playwright 体验好）。
  - Worker 适合放在可运行更久的环境（容器/定时任务/队列消费者）。

### 2.2 数据存储
- **PostgreSQL（主数据）**
  - 结构化商品/店铺/历史快照、可做 SQL 分析与聚合。
  - 易配合 PostgREST/Prisma/Drizzle 等 ORM。
- **对象存储（原始页面/HTML/JSON/截图）**
  - 用于回溯与审计，支持离线再清洗与算法重跑。
- **Redis（缓存 + 任务队列）**
  - 缓存高频查询（热词、榜单、商品详情）。
  - 支撑异步任务状态与幂等键（jobId / lock）。

### 2.3 AI 与特征/算法
- **特征工程 + 规则/统计模型（可解释、成本低）**
  - 先给出稳定的“潜力评分”，再用 AI 生成自然语言建议。
- **大模型（建议层）**
  - 输入：结构化指标、对比样本、风险信号、价格带与类目上下文。
  - 输出：机会点、风险点、差异化建议、定价与上架策略。

### 2.4 API 框架与工程化
- **Vercel Serverless Functions（API）**
  - 适合低延迟读 API、触发异步任务、返回任务状态。
- **OpenAPI（接口契约）**
  - 降低前后端沟通成本，利于自动生成 SDK/Mock。
- **Observability（日志/指标/追踪）**
  - 必备：任务失败率、封禁率、请求耗时、缓存命中率。

---

## 3. 推荐项目目录结构（后端）

建议后端独立成 `backend/`（或单独 repo）。下面为可落地的目录蓝图：

```text
backend/
  api/                         # Vercel Serverless Functions（对外 HTTP API）
    health.ts
    products.search.ts
    products.get.ts
    crawl.createJob.ts
    crawl.getJob.ts
    insights.generate.ts
  src/
    config/                    # 环境变量、配置、常量
    domain/                    # 领域模型（Product/Shop/Category/Insight/Job）
    adapters/
      shopee/                  # Shopee 采集适配层（解析、签名、反爬应对）
      llm/                     # 大模型调用适配层（prompt、输出校验）
      storage/                 # DB/Redis/Object storage 抽象
    services/
      crawl/                   # 任务编排（创建/重试/限流/幂等）
      clean/                   # 清洗与标准化（字段映射、去噪、补全）
      features/                # 特征提取（价格带、增长、竞争度、评分质量）
      scoring/                 # 潜力评分（规则+统计）
      insights/                # AI 建议（上下文组装、模板、引用证据）
    jobs/                      # Worker 任务入口（由队列/定时触发）
    api-contract/              # OpenAPI/DTO/校验（zod 等）
    utils/                     # 通用工具（重试、限速、日志、traceId）
  prisma/ or migrations/       # 数据库 schema 与迁移
  scripts/                     # 本地工具脚本（回填、重算、数据修复）
  docs/
    openapi.yaml
    data-model.md
    anti-bot.md
  vercel.json
  README.md
```

> 说明：Vercel 函数仅负责“轻逻辑 + 编排”；耗时任务（爬取/批处理/大模型长输出）通过队列投递到 Worker 执行。

---

## 4. 核心模块设计

### 4.1 爬虫模块（Crawler）
**职责**
- 输入：关键词、类目、商品链接/ID、店铺链接/ID、抓取策略（页数/排序/过滤）。
- 输出：原始响应（HTML/JSON）、结构化商品数据、抓取元数据（时间、IP、UA、状态码、耗时）。

**关键点**
- **多策略采集**：优先走公开接口/JSON（若存在），否则走页面解析/Headless 浏览器。
- **幂等与去重**：对同一商品同一时间窗口写入快照，避免重复入库。
- **限流与重试**：指数退避 + 抖动；按店铺/关键词维度分桶限速。

### 4.2 清洗模块（Cleaning）
**职责**
- 统一币种/价格单位、销量字段规范化、类目映射、文本去噪（emoji/模板词）、图片链接规范化。
- 生成可用于特征工程的“干净表”（事实表 + 维表）。

**输出**
- `products`（当前态）+ `product_snapshots`（历史快照）
- `shops`、`categories`、`keyword_runs`

### 4.3 算法模块（Scoring / Analytics）
**目标**：给出稳定、可解释、可迭代的潜力评估。

**示例特征（可按类目调参）**
- 需求强度：近 30 天销量/增长率、搜索热度代理指标。
- 竞争强度：同价位/同类目商品数量、头部集中度、价格分散度。
- 质量风险：评分、差评率、评价量可信度、退货/投诉信号（若可得）。
- 利润空间：价格带、运费/重量（若可得）、可替代性。

**输出**
- `analysisScore`（0~10）
- `analysisLabel`（High/Med/Low）
- `reasons[]`（可解释项：增长快、竞争低、评分高等）

### 4.4 AI 模块（Insights）
**定位**：在“评分/数据”之上生成可执行建议，并且尽量“有证据可追溯”。

**输入上下文**
- 结构化指标（销量、价格、评分、竞争度、趋势）。
- 同类目 Top 对照样本（前 N 名竞争品）。
- 风险信号（波动、评价异常、价格战迹象、疑似刷单等）。

**输出结构（建议 JSON schema）**
- `opportunities[]`：机会点（差异化方向、包装/组合、主图策略）
- `risks[]`：风险（高退货、同质化、侵权、供应不稳定）
- `pricing`：建议价格区间与理由
- `launchPlan`：上架节奏与测试方案（小单测试、投放建议）

### 4.5 API 模块（API）
**原则**
- 读写分离：查询走缓存/只读副本；任务创建走强一致存储。
- 异步优先：长任务统一用 `jobId` 查询。
- 可观测：所有请求返回 `traceId`，便于排查。

---

## 5. Vercel Serverless Functions 部署方案

### 5.1 适合放在 Vercel 的内容
- 低延迟查询 API：商品列表/详情、榜单、统计聚合（可缓存）。
- 任务编排 API：创建抓取任务、查询任务状态、触发生成 AI 建议。
- Webhook 接收器：队列回调、定时任务触发。

### 5.2 不适合放在 Vercel 的内容（建议外置）
- 长耗时爬虫（翻页多、需要浏览器、易超时）。
- 批量重算（全量特征重建、历史回填）。
- 大模型长输出（token 多、耗时长）可由 Worker 异步跑，结果落库。

### 5.3 推荐执行流（Serverless + Worker）
1) 前端调用 `POST /api/crawl/jobs` 创建任务（返回 `jobId`）。
2) API 写入数据库并投递队列（Redis/消息队列）。
3) Worker 消费队列 → 执行爬取/清洗/评分 → 落库 → 更新 `job` 状态。
4) 前端轮询 `GET /api/crawl/jobs/{jobId}` 获取进度与结果摘要。
5) 需要 AI 建议时：`POST /api/insights/jobs` 创建生成任务，异步产出建议。

---

## 6. 反爬策略（工程建议）

> 注意：请遵守目标站点的服务条款、robots 以及当地法律法规；建议只采集公开信息并为对方基础设施留出余量。

### 6.1 访问层策略
- **请求节奏**：分桶限速（按关键词/店铺/IP），加入随机抖动。
- **连接与重试**：超时/429/5xx 走指数退避；设置最大重试次数与熔断。
- **Header/UA/指纹**：User-Agent 池、Accept-Language、时区；必要时浏览器自动化并隔离 profile。
- **IP 策略**：代理池（住宅/机房）分层；按封禁率自动降级与切换。

### 6.2 数据层策略
- **缓存与去重**：同一请求参数的结果短期缓存，减少重复打点。
- **增量抓取**：按更新时间/销量变化触发重抓，避免全量扫。
- **异常检测**：识别返回内容异常（验证码页、空白页、重定向），快速停止该策略并告警。

### 6.3 账号/会话策略（如必须）
- **Cookie 管理**：会话池、失效检测、最小权限原则。
- **风险控制**：账号冷却、同账号并发限制、行为模式随机化。

---

## 7. API 接口设计（建议稿）

统一约定：
- Base：`/api`
- 认证：建议 `Bearer <token>`（或签名请求），并区分读/写权限。
- 返回：统一包裹 `{ data, error, traceId }`；错误用稳定的 `code`。

### 7.1 系统与元数据
- `GET /api/health`
  - 用途：健康检查、版本信息。

### 7.2 商品搜索与详情
- `GET /api/products/search?keyword=&categoryId=&minPrice=&maxPrice=&sort=&page=&pageSize=`
  - 返回：商品列表（含 `analysisScore/analysisLabel`、销量、评分等）。
- `GET /api/products/{productId}`
  - 返回：商品详情 + 最近快照 + 关键特征与评分解释项。

### 7.3 抓取任务（异步）
- `POST /api/crawl/jobs`
  - body：`{ keyword | productUrl | shopId, pages, strategy }`
  - 返回：`{ jobId }`
- `GET /api/crawl/jobs/{jobId}`
  - 返回：`{ status, progress, resultSummary, error? }`

### 7.4 竞品对比
- `POST /api/competitors/compare`
  - body：`{ productIds: string[] }`
  - 返回：对比维度、雷达图指标、差距解释。

### 7.5 AI 选品建议（异步）
- `POST /api/insights/jobs`
  - body：`{ productId | keyword | categoryId, goals?: string[] }`
  - 返回：`{ jobId }`
- `GET /api/insights/jobs/{jobId}`
  - 返回：结构化建议（机会/风险/定价/执行计划）。

### 7.6 数据分析
- `GET /api/analytics/market?categoryId=&range=30d`
  - 返回：价格分布、销量分布、质量-需求矩阵等。

---

## 8. 清晰的项目蓝图（从 0 到 1）

### Phase 0：打底（1~3 天）
- 定义数据模型（Product/Shop/Snapshot/Job/Insight）。
- 定义 OpenAPI + 前后端 DTO（先 Mock，再落库）。
- 打通 Vercel API 部署与环境变量管理。

### Phase 1：采集闭环（3~7 天）
- 最小可用爬虫：关键词 → 列表页 → 商品详情 → 入库。
- 清洗与标准化：价格、销量、评分等字段统一。
- 任务系统：`jobId` + 状态机（queued/running/succeeded/failed）。

### Phase 2：潜力评分（1~2 周）
- 特征工程与可解释评分：输出分数 + 原因。
- 缓存与榜单：热词/类目 Top、价格带统计。
- 监控与告警：封禁率、失败率、重试、耗时分布。

### Phase 3：AI 建议（1~2 周）
- 设计结构化输出 schema，并做严格校验（防止幻觉与格式漂移）。
- 引用证据：建议尽量能回指到指标与对照样本。
- 成本控制：按需生成、缓存结果、分层模型策略。

### Phase 4：规模化与合规（持续）
- 代理/指纹/节奏策略自动化与灰度。
- 数据权限与审计（token、限流、日志脱敏）。
- 增量更新策略与重算管道（离线任务/容器化 Worker）。

---

## 9. 与前端对接说明

前端（已部署）建议只依赖后端 API：
- 列表：`/api/products/search`
- 详情：`/api/products/{id}`
- 触发分析：`/api/crawl/jobs` + `GET /api/crawl/jobs/{jobId}`
- AI 建议：`/api/insights/jobs` + `GET /api/insights/jobs/{jobId}`

---

## 10. 下一步（建议我帮你做的）

如果你希望我直接把后端骨架也搭出来（Vercel Functions + OpenAPI + Job 状态机 + Prisma 数据模型），告诉我：
- 你更偏向 **Node/TS 全栈** 还是 **Python 爬虫 + Node API**？
- 数据库用 **PostgreSQL** 还是先用 **SQLite（本地验证）**？
