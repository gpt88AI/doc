# 在 Codex 中使用 GPT88 图片生成

本页使用 GPT88 的当前接入路径。不要下载或运行来历不明的 Skill 包，也不要把 GPT88 API Key 写入公开仓库中的 Skill 配置。

## 先验证图片 API

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)，在 [API Key 管理](https://agent.gpt88.cc/keys)创建并保存 API Key。
2. 打开 [GPT88 模型导航](/models/)，确认当前账户可用的图片模型 ID。
3. 阅读 [GPT88 图片 API](/docs/api/images/)；图片任务使用 GPT88 图片服务端点对应的接口与参数，不要照抄其他平台的模型名或请求体。
4. 先按 API 文档完成一次最小请求，再接入 Codex Skill。

## 配置 Skill

将自己审核过的图片生成 Skill 安装到 Codex 支持的 Skill 目录。Skill 应从环境变量读取 Key，并调用 GPT88 图片 API；具体安装来源、模型 ID 和参数必须在当前 GPT88 文档中核对。不要在 SKILL.md、config.json 或示例脚本中硬编码完整密钥。

## 验收

- Codex 能识别并调用该 Skill。
- 请求使用 GPT88 图片服务端点和账户可用的模型。
- 生成结果符合预期，且控制台记录中能找到本次请求。
- 对话、仓库和截图中没有完整 API Key。

CLI 配置见 [Codex 集成](/docs/integrations/dev/codex-cli/)；API Key 安全管理见[密钥管理指南](/docs/guides/api-key-management/)。
