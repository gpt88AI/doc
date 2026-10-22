> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## DeepSeek 接入 Codex

> **適用範圍**
> 本指南說明如何透過 gpt88 的 Responses API，讓 Codex CLI、Codex 桌面版與 VS Code Codex extension 使用 deepseek-v4-flash。三種 Codex client 共用使用者層級的 ~/.codex/config.toml。

> 模型示例：`deepseek-v4-flash`（gpt88）。请先在 GPT88 模型导航确认当前可用性。

## 準備工作

- 安裝或更新 Codex，並至少啟動一次，確保 ~/.codex 目錄可用。
- 準備可使用 deepseek-v4-flash 的 gpt88 API Key；本文只使用 placeholder，不會要求把真實 key 貼到文件或群聊。
- 先備份既有 config.toml、auth.json 與 models.json，避免覆蓋其他 provider 設定。
### 1. 建立目錄並備份現有設定

~~~bash
mkdir -p ~/.codex/backup-deepseek
cp -p ~/.codex/config.toml ~/.codex/backup-deepseek/config.toml.bak 2>/dev/null || true
cp -p ~/.codex/auth.json ~/.codex/backup-deepseek/auth.json.bak 2>/dev/null || true
cp -p ~/.codex/models.json ~/.codex/backup-deepseek/models.json.bak 2>/dev/null || true
~~~

~~~powershell
$CodexHome = Join-Path $HOME '.codex'
$Backup = Join-Path $CodexHome 'backup-deepseek'
New-Item -ItemType Directory -Force -Path $Backup | Out-Null
Copy-Item "$CodexHome\config.toml" "$Backup\config.toml.bak" -ErrorAction SilentlyContinue
Copy-Item "$CodexHome\auth.json" "$Backup\auth.json.bak" -ErrorAction SilentlyContinue
Copy-Item "$CodexHome\models.json" "$Backup\models.json.bak" -ErrorAction SilentlyContinue
~~~

### 2. 建立 DeepSeek model catalog

將下列內容儲存為 ~/.codex/models.json。此 metadata 依 DeepSeek 官方 Codex integration 的 deepseek-v4-flash 設定整理。

~~~json
{
  "models": [
    {
      "slug": "deepseek-v4-flash",
      "display_name": "DeepSeek-V4-Flash",
      "description": "DeepSeek V4 Flash for Codex",
      "context_window": 1048576,
      "max_context_window": 1048576,
      "effective_context_window_percent": 95,
      "default_reasoning_level": "high",
      "supported_reasoning_levels": [
        {"effort": "low", "description": "較快回應"},
        {"effort": "high", "description": "複雜任務的深度推理"},
        {"effort": "max", "description": "最高推理深度"}
      ],
      "prefer_websockets": false,
      "supports_parallel_tool_calls": true,
      "shell_type": "shell_command",
      "visibility": "list",
      "minimal_client_version": "0.144.0",
      "supported_in_api": true,
      "priority": 1
    }
  ]
}
~~~

### 3. 設定 ~/.codex/config.toml

> **使用者層級設定**
> model_provider、model_providers 與 model_catalog_json 應寫在使用者層級 ~/.codex/config.toml。Codex 會忽略 project-local .codex/config.toml 內用來改 provider 或 auth 的設定。

~~~toml
model = "deepseek-v4-flash"
model_provider = "gpt88"
model_reasoning_effort = "high"
approval_policy = "never"
sandbox_mode = "danger-full-access"
preferred_auth_method = "apikey"
model_catalog_json = "~/.codex/models.json"

[model_providers.gpt88]
name = "GPT88"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

> **Base URL**
> Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要在末尾追加 `/v1`。

### 4. 寫入 API key

~~~json
{
  "OPENAI_API_KEY": "貼上你的 gpt88 API Key"
}
~~~

~~~bash
chmod 600 ~/.codex/auth.json ~/.codex/config.toml ~/.codex/models.json
~~~

> **不要公開 API Key**
> auth.json 只能保留在本機私有目錄。不要提交到 Git、貼到群聊、寫入文件或把完整 key 放進錯誤截圖。若 key 已外洩，立即撤銷並重新建立。

### 5. 啟動並驗證

~~~bash
codex --version
codex
~~~

~~~powershell
codex --version
codex
~~~

~~~text
/status
~~~

> **驗證通過**
> 啟動畫面或 /status 顯示 model=deepseek-v4-flash、provider=gpt88，並能完成一個需要讀檔與 tool calling 的測試任務，即代表設定生效。

## 安全設定說明

> **danger-full-access + never**
> approval_policy="never" 會停用互動核准，sandbox_mode="danger-full-access" 會讓 Codex 不受 workspace sandbox 限制。這組設定只適合你完全信任的 repository、prompt、AGENTS.md 與 shell 環境；不要在來源不明的專案使用。

~~~toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
~~~

## gpt88 與 DeepSeek 官方 endpoint 的差異

> **Provider 與 API Key 必須成對**
> 本指南的 provider 是 gpt88，base_url 使用 https://api.gpt88.cc，认证也必须使用 GPT88 API Key。若改用 DeepSeek 官方 API Key，請建立獨立的 deepseek provider，base_url 使用 https://api.deepseek.com/；不要把兩個平台的 endpoint 與 key 交叉混用。

## 常見問題

### 401 Unauthorized / invalid token

確認 auth.json 中的 OPENAI_API_KEY 是完整且仍有效的 gpt88 API Key，沒有空格或換行；確認沒有誤用 DeepSeek 官方 key。修改後完全退出 Codex 再重啟。


### 404、Responses endpoint 不存在或 wire API 錯誤

gpt88 的 Codex base_url 應為 https://api.gpt88.cc，且 wire_api 必須是 responses。不要把 /chat/completions 貼進 base_url。


### model not found / key not allowed to access model

模型名稱必須精確為 deepseek-v4-flash。model catalog 只描述模型能力，不會授予模型權限；若 API Key 的帳戶或分組沒有該模型權限，需先在 gpt88 控制台調整或更換可用 key。


### 仍然顯示舊 model/provider

確認修改的是使用者層級 ~/.codex/config.toml，而不是專案內 .codex/config.toml。Codex CLI、桌面版與 IDE extension 共用同一設定，但已啟動的 process 需要完全退出後重新開啟。


### 可以對話，但 tool calling 或 reasoning 不正常

先更新 Codex，再確認 model_catalog_json 指向可讀取的 models.json、wire_api=responses，且 /status 顯示 deepseek-v4-flash。只有文字對話成功不代表 Codex agent tools 已完整可用。


## 相關文件

- [令牌選擇與 API 配置](/docs/guides/gpt88-library/token-api-config/)
- [Codex macOS / Linux 手動安裝指南](/docs/guides/gpt88-library/codex-mac-linux/)
- [Codex Windows 桌面版配置指南](/docs/guides/gpt88-library/codex-windows-desktop-config/)
