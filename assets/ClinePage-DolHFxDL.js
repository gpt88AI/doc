import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,n as o,s,t as c}from"./index-ivPh6OuT.js";var l=e(),u=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-your-gpt88-api-key
Model: claude-sonnet-4-6`,d=`1. Open VS Code
2. Open Cline settings
3. Choose OpenAI Compatible as the provider
4. Fill in Base URL and API key
5. Add a default model
6. Ask Cline to read one small file first`,f=`1. Cline does not use tools
   - Confirm VS Code permissions and workspace access first

2. Model connection fails
   - Validate gpt88.cc with curl before debugging the editor

3. Cost is too high
   - Reduce context size
   - Use a smaller model for simple tasks`;function p(){return(0,l.jsxs)(a,{path:`/docs/integrations/dev/cline`,title:`Cline with gpt88.cc`,description:`Model access and agent workflow configuration for using Cline with gpt88.cc.`,headings:[{id:`setup`,text:`Configuration`,level:2},{id:`verify`,text:`Verification`,level:2},{id:`troubleshoot`,text:`Troubleshooting`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(s,{tone:`info`,title:`Validate with a small task first`,children:(0,l.jsx)(`p`,{children:`Cline reads files, writes files, and uses tools. Validate model routing and workspace permissions with a low-risk task before giving it broad code changes.`})}),(0,l.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:d}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`h2`,{id:`verify`,children:`Verification`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`Ask Cline to explain the current project README.`}),(0,l.jsx)(`li`,{children:`Ask it to modify one safe low-risk file.`}),(0,l.jsx)(`li`,{children:`Confirm the file is actually written before using it for larger tasks.`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`Troubleshooting`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:f}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsx)(`ul`,{children:(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})})]})}var m=`Provider: OpenAI Compatible
Base URL: https://api.gpt88.cc
API Key: sk-你的-gpt88-api-key
Model: claude-sonnet-4-6`,h=`1. 打开 VS Code
2. 打开 Cline 设置
3. Provider 选择 OpenAI Compatible
4. 填入 Base URL 和 API Key
5. 添加默认模型
6. 先让 Cline 读取一个小文件验证工具链`,g=`1. Cline 不调用工具
   - 先确认 VS Code 权限和工作区是否正常

2. 模型连接失败
   - 先用 curl 验证 gpt88.cc

3. 输出成本偏高
   - 降低上下文范围
   - 先用小模型做简单任务`;function _(){let{locale:e}=n();return e===`en`?(0,l.jsx)(p,{}):(0,l.jsxs)(a,{path:`/docs/integrations/dev/cline`,title:`Cline 配置 OpenAI 兼容 API`,description:`Cline 自定义 OpenAI 兼容提供商的配置、最短请求和常见错误排查。`,headings:[{id:`setup`,text:`配置方法`,level:2},{id:`verify`,text:`验证方式`,level:2},{id:`troubleshoot`,text:`排障清单`,level:2},{id:`next`,text:`下一步`,level:2},...c(`cline`)],children:[(0,l.jsx)(s,{tone:`info`,title:`先跑通小任务`,children:(0,l.jsx)(`p`,{children:`Cline 会读写文件和运行工具，先用小任务验证模型与文件权限，再交给它大规模改代码。`})}),(0,l.jsx)(`h2`,{id:`setup`,children:`配置方法`}),(0,l.jsx)(i,{lang:`text`,filename:`flow`,code:h}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:m}),(0,l.jsx)(`h2`,{id:`verify`,children:`验证方式`}),(0,l.jsxs)(`ol`,{children:[(0,l.jsx)(`li`,{children:`让 Cline 解释当前项目 README。`}),(0,l.jsx)(`li`,{children:`让它修改一个无风险的小文件。`}),(0,l.jsx)(`li`,{children:`确认文件确实落盘，再执行复杂任务。`})]}),(0,l.jsx)(`h2`,{id:`troubleshoot`,children:`排障清单`}),(0,l.jsx)(i,{lang:`text`,filename:`troubleshooting`,code:g}),(0,l.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,l.jsx)(`ul`,{children:(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})}),(0,l.jsx)(o,{intent:`cline`})]})}export{_ as default};