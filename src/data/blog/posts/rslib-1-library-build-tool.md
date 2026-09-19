---
title: Rslib 1.0：面向 JavaScript 库、组件库和 CLI 的构建工具
description: 整理 Rslib 1.0 的公开摘要：基于 Rsbuild 统一 JavaScript 库的编译、类型生成和资源处理，覆盖工具库、组件库与 CLI，支持 ESM、CJS、模块保留和 Rstest、Rspress 组合。
date: 2026-09-19
category: 技术教程
tags: [Rslib, Rsbuild, JavaScript, TypeScript, 组件库, ESM, CJS]
readTime: 9
relatedPath: /docs/blog/product-project-agent-workspace-init/
relatedTitle: 产品项目初始化 Prompt：让 Agent 参与全流程
---

应用构建工具和库构建工具解决的不是同一个问题。应用通常需要产出一组可部署资源，而 JavaScript 库需要兼容不同消费者、模块系统、类型声明、构建目标和发布方式。Rslib 1.0 的定位，就是在 Rsbuild 基础上为库开发提供统一工程入口。

本文根据 ByteDance Web Infra 关于 Rslib 1.0 的公开摘要整理。摘要披露的能力包括编译、类型生成、资源处理、ESM/CJS 输出、打包或保留模块结构，以及与 Rstest、Rspress 等工具组合；具体配置字段应以当前官方文档为准。

## 一、Rslib 解决什么问题

手动维护库构建通常要拼接多个工具：TypeScript 负责类型，Babel 或 SWC 负责语法转换，打包器负责模块输出，插件处理 CSS、图片和声明文件，发布配置再决定 `exports`。工具越多，配置之间越容易不一致。

Rslib 的统一入口可以让团队集中管理：

- 编译目标和语法降级；
- ESM、CJS 等模块格式；
- 类型声明生成；
- CSS、图片和其他资源；
- 是否打包依赖；
- 是否保留模块结构；
- 开发、测试、文档和发布流程。

## 二、打包与保留模块结构如何选择

| 输出策略 | 适合场景 | 代价 |
| --- | --- | --- |
| 打包 | 组件库、单入口工具、减少消费者配置 | 体积、Tree Shaking 和依赖边界需验证 |
| 保留模块结构 | 多入口库、按需加载、希望消费者继续 Tree Shaking | 发布目录和 `exports` 更复杂 |

选择不能只看构建是否成功。还要测试 Node、浏览器、Bundler、TypeScript 和不同模块解析条件下的真实消费。

## 三、类型生成是发布契约

类型文件不是构建附属物，而是库用户看到的 API。发布前应验证：

- 公共 API 都有声明；
- 私有实现没有意外暴露；
- 路径别名在声明中可解析；
- ESM/CJS 入口与类型入口对应；
- TypeScript 不同版本的兼容性。

周刊摘要提到类型生成适配 TypeScript 7。版本事实和兼容范围属于随工具变化的内容，使用前需要以 Rslib 和 TypeScript 当前文档核对。

## 四、和 Rstest、Rspress 组合

库工程的完整循环不仅是 build：

```text
源代码 → Rslib 构建 → Rstest 验证 → Rspress 文档 → 发布包
```

构建测试应检查产物能否被真实消费者安装和导入；文档站则应引用公共 API 和示例，而不是只展示源码内部实现。

## 五、迁移检查清单

- [ ] 明确支持的 Node、浏览器和模块格式。
- [ ] 测试 ESM、CJS、类型和多入口导入。
- [ ] 检查 `exports`、`types`、`main` 和 `module` 字段。
- [ ] 验证依赖是打包、外置还是 peer dependency。
- [ ] 构建后用临时消费者项目安装测试。
- [ ] 类型声明和文档示例与实际导出一致。
- [ ] 将构建、测试、文档和发布纳入同一 CI 流程。

## 来源与边界

原文：[ByteDance Web Infra｜Rslib 1.0 正式发布：面向多场景的 JavaScript 库开发工具](https://mp.weixin.qq.com/s?__biz=MzkxNDIzNTg4MA==&mid=2247490253&idx=1&sn=e93cdee87d5044410c98c09393e0a1be&scene=21#wechat_redirect)。本文依据奇舞周刊第 597 期摘要整理，未取得原文全文和配图；命令、配置字段和 TypeScript 兼容矩阵请以 Rslib 官方文档为准。
