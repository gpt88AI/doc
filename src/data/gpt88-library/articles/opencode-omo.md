> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## OpenCode + OMO 安装与 GPT88 接入配置教程

## 文档概述

> **适用范围**
> 本文档完整覆盖 OpenCode 客户端安装、OMO 组件部署，以及将 OpenCode 对接 GPT88 OpenAI 兼容网关的全流程操作规范。

### 一、安装前置准备

## 一、安装前置准备

部署前请提前准备以下依赖与凭证：

1. 已完成 Node.js / npm 环境安装；
1. GPT88 专属 API Key；
1. GPT88 OpenAI 兼容接口 Base URL。
未获取密钥与接口地址请查阅配套文档： [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

### 接口地址规范说明

OpenCode、OpenAI 兼容类工具必须使用携带 `/v1` 后缀的网关地址，标准示例：

~~~text
https://api.gpt88.cc
~~~

> **建议**
> 网络备选地址：全球 CDN 访问异常时可替换直连地址 `https://api.gpt88.cc/v1`。

### 二、安装 OpenCode 主程序

## 二、安装 OpenCode 主程序

在终端执行全局安装命令：

~~~text
npm i -g opencode-ai
~~~

### 下载缓慢处理方案

若安装命令长时间转圈、下载超时，优先配置 npm 国内镜像后重试，参考文档： [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)

### 安装校验

安装完成后执行启动命令验证：

~~~text
opencode
~~~

> **验证成功**
> 能够正常唤起 OpenCode 客户端即代表安装成功。

### 三、OMO 组件两种安装方式

## 三、OMO 组件两种安装方式

OpenCode 内置免费大模型，可自动执行 OMO 安装脚本，也支持手动部署。

### 方式一：OpenCode 自动安装 OMO

1. 正常打开 OpenCode 客户端；
1. 在对话输入框粘贴下方指令并发送：
~~~text
Install and configure by following the instructions here https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/refs/heads/master/README.md
~~~

客户端将自动拉取并运行 OMO 安装脚本。

### 方式二：手动命令行安装 OMO

依次执行两条终端指令：

~~~text
opencode
~~~

~~~text
bunx oh-my-opencode install
~~~

指令说明：

1. `opencode`：校验主程序可正常启动；
1. `bunx oh-my-opencode install`：执行 OMO 组件安装流程。

### 四、GPT88 网关接入说明

## 四、GPT88 网关接入说明

GPT88 标准 OpenAI 兼容网关地址：

~~~text
https://api.gpt88.cc
~~~

在 OpenCode 配置中，将 GPT88 作为自定义 OpenAI 服务商接入使用。

### 五、定位 OpenCode 配置文件 opencode.json

## 五、定位 OpenCode 配置文件 opencode.json

配置文件系统存放路径：

- Windows：`\.config/opencode.json`（用户根目录下）
- Linux / macOS：`~/.config/opencode.json`
> **建议**
> 查找提示：若目录无配置文件，先启动一次 OpenCode，程序会自动生成空白配置后再修改。

### 六、服务商与模型完整配置模板

## 六、服务商与模型完整配置模板

将以下完整 JSON 内容写入 `opencode.json`，**务必替换 **`把你的 GPT88 API Key 填到这里`** 为自身真实密钥**，不可直接原样保存：

~~~text
{
  "provider": {
    "openai": {
      "options": {
        "baseURL": "https://api.gpt88.cc/v1",
        "apiKey": "把你的 GPT88 API Key 填到这里",
        "protocol": "responses"
      },
      "models": {
        "gpt-5.5": {
          "name": "GPT-5.5",
          "limit": {
            "context": 1050000,
            "output": 128000
          },
          "modalities": {
            "input": [
              "text",
              "image"
            ],
            "output": [
              "text"
            ]
          },
          "options": {
            "store": false,
            "reasoningEffort": "xhigh"
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.4": {
          "name": "GPT-5.4",
          "limit": {
            "context": 1050000,
            "output": 128000
          },
          "modalities": {
            "input": [
              "text",
              "image"
            ],
            "output": [
              "text"
            ]
          },
          "options": {
            "store": false,
            "reasoningEffort": "xhigh"
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.4-mini": {
          "name": "GPT-5.4 Mini",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "modalities": {
            "input": [
              "text",
              "image"
            ],
            "output": [
              "text"
            ]
          },
          "options": {
            "store": false,
            "reasoningEffort": "xhigh"
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.3-codex": {
          "name": "GPT-5.3 Codex",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "modalities": {
            "input": [
              "text",
              "image"
            ],
            "output": [
              "text"
            ]
          },
          "options": {
            "store": false,
            "reasoningEffort": "xhigh"
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        }
      }
    }
  },
  "$schema": "https://opencode.ai/config.json"
}
~~~

### 七、配置生效验证流程

## 七、配置生效验证流程

1. 保存修改后的 `opencode.json` 文件；
1. 完全关闭并重新启动 OpenCode；
1. 客户端模型列表可读取到配置的服务商与模型，且可正常发起对话，即代表接入完成。

### 八、常见问题排查

## 八、常见问题排查

### 问题1：npm 安装 OpenCode 缓慢、长时间无响应

解决方法：先部署 npm 国内镜像，再重新执行安装命令： [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)

~~~text
npm i -g opencode-ai
~~~

### 问题2：API Key 填写位置说明

密钥写入配置内 `apiKey` 对应字段：

~~~text
"apiKey": "把你的 GPT88 API Key 填到这里"
~~~

> **安全提醒**
> 安全提示：API Key 属于私密凭证，禁止发送至公开群、共享文档或截图泄露。

### 问题3：Base URL 填写规范

OpenCode 兼容网关必须使用带 `/v1` 的地址，标准值：

~~~text
https://api.gpt88.cc
~~~

若「令牌选择与 API 配置」页面更新网关地址，以页面最新内容为准替换。
