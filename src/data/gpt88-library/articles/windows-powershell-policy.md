> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Windows PowerShell 脚本执行权限修复教程

## 文档概述

本文档用于解决 Windows 环境执行 npm、codex 等命令时，PowerShell 拦截 ps1 脚本、提示「禁止运行脚本」的权限报错，提供安全合规的修复方案、原理说明与兜底处理方式。

### 一、典型报错信息

## 一、典型报错信息

出现以下任意报错，适用本教程处理：

~~~text
无法加载文件 C:\Users\你的用户名\AppData\Roaming\npm\npm.ps1，因为在此系统上禁止运行脚本。
~~~

~~~text
npm.ps1 cannot be loaded because running scripts is disabled on this system.
~~~

识别关键词：`.ps1`、running scripts is disabled、禁止运行脚本。

### 二、快速修复完整步骤

## 二、快速修复完整步骤

### 步骤1：打开 PowerShell / Windows 终端

右键 Windows 开始菜单，选择「终端」或「Windows PowerShell」； 普通用户权限即可执行，企业/校园设备普通窗口失败时，右键选择「以管理员身份运行」重试。

### 步骤2：执行权限修改命令

复制命令粘贴至终端并回车：

~~~text
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
~~~

### 步骤3：确认策略变更

弹出交互提示时输入 `Y` 回车确认：

~~~text
Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help
~~~

输入内容：

~~~text
Y
~~~

### 步骤4：重启终端验证生效

关闭全部现有 PowerShell 窗口，重新打开新终端执行校验命令： 校验 npm：

~~~text
npm -v
~~~

校验 Codex：

~~~text
codex --version
~~~

终端正常输出版本号即代表权限修复完成。

### 三、报错产生根本原因

## 三、报错产生根本原因

Windows PowerShell 内置「执行策略」安全机制，默认策略 `Restricted` 会拦截所有 `.ps1` 脚本运行，防止恶意脚本自动执行。 Node.js / npm 工具安装后会生成 ps1 格式启动脚本，包括：

- npm.ps1
- npx.ps1
- codex.ps1 默认策略下这些脚本会被系统拦截，抛出权限错误。
### 修复命令安全说明

~~~text
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
~~~

- 生效范围：仅作用于当前登录用户，不修改整机策略；
- 权限规则：本机生成脚本可直接运行，网络下载脚本必须携带可信数字签名；
- 安全性远高于完全放开限制的 `Unrestricted`，是开发环境推荐配置。

### 四、查看当前执行策略

## 四、查看当前执行策略

执行查看命令校验配置状态：

~~~text
Get-ExecutionPolicy -List
~~~

正常修复后 `CurrentUser` 行显示：

~~~text
RemoteSigned
~~~

### 五、修复后仍异常兜底方案

## 五、修复后仍异常兜底方案

### 方案1：确认重启终端

修改策略后必须关闭旧终端窗口，新开窗口再测试命令。

### 方案2：临时使用 CMD 命令提示符

快捷键 `Win + R`，输入 `cmd` 回车打开 CMD，CMD 不依赖 ps1 脚本限制：

~~~text
npm -v
codex --version
~~~

### 方案3：企业/校园设备组策略锁定

若查询策略出现 `MachinePolicy` / `UserPolicy` = `Restricted`，代表设备由管理员统一管控，普通用户无修改权限：

1. 临时使用 CMD 完成安装操作；
1. 联系企业/校园 IT 管理员调整设备策略。
### 方案4：禁止使用 Unrestricted 全放开策略

不推荐执行以下命令，会大幅降低系统安全防护：

~~~text
Set-ExecutionPolicy Unrestricted
~~~

### 六、修复后配套操作指引

## 六、修复后配套操作指引

### Codex 安装接续文档

修复权限后可继续 Codex 部署流程：

- [Codex Windows 一键安装教程（推荐小白）](/docs/guides/gpt88-library/codex-windows-manual/)
- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
### npm 下载缓慢配套文档

npm 安装长时间转圈、超时：

- [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)
### 其他运行报错统一排查入口

修复权限后出现 401 令牌错误、流式传输异常、桌面端/VS Code 插件故障：

- [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
