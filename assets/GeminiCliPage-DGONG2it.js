import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation uses the native Gemini generateContent endpoint.`,l=`curl -s -X POST \\
  "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "Generate a 1:1 tech-style icon with no text"}]}],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }'`;function u(){return(0,s.jsxs)(a,{path:`/docs/integrations/dev/gemini-cli`,title:`Gemini CLI with gpt88.cc`,description:`Use Gemini CLI and Google image models through gpt88.cc.`,headings:[{id:`setup`,text:`Configuration`,level:2},{id:`image`,text:`Image endpoint test`,level:2},{id:`notes`,text:`Notes`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Gemini image models use native generateContent`,children:(0,s.jsxs)(`p`,{children:[`Gemini image generation does not use the standard `,(0,s.jsx)(`code`,{children:`/v1/chat/completions`}),` path. It uses the native `,(0,s.jsx)(`code`,{children:`/v1beta/models/:generateContent`}),` endpoint.`]})}),(0,s.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:c}),(0,s.jsx)(`h2`,{id:`image`,children:`Image endpoint test`}),(0,s.jsx)(i,{lang:`bash`,filename:`gemini-image-test.sh`,code:l}),(0,s.jsx)(`h2`,{id:`notes`,children:`Notes`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[`For image generation, use the media Base URL `,(0,s.jsx)(`code`,{children:`https://img.gpt88.cc`}),`.`]}),(0,s.jsxs)(`li`,{children:[`Aspect ratios must use Gemini-supported values such as `,(0,s.jsx)(`code`,{children:`1:1`}),`, `,(0,s.jsx)(`code`,{children:`16:9`}),`, or `,(0,s.jsx)(`code`,{children:`9:16`}),`.`]}),(0,s.jsxs)(`li`,{children:[`Image sizes use uppercase values such as `,(0,s.jsx)(`code`,{children:`1K`}),`, `,(0,s.jsx)(`code`,{children:`2K`}),`, and `,(0,s.jsx)(`code`,{children:`4K`}),`.`]})]}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/api/images/`,`en`),children:`Read the image API guide`}),`.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var d=`BASE_URL=https://img.gpt88.cc
API_KEY=你的-gpt88-api-key
MODEL=gemini-3-pro-image-preview

图片生成走 Gemini 原生 generateContent 接口。`,f=`curl -s -X POST \\
  "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "生成一张 1:1 的科技感图标，无文字"}]}],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }'`;function p(){let{locale:e}=n();return e===`en`?(0,s.jsx)(u,{}):(0,s.jsxs)(a,{path:`/docs/integrations/dev/gemini-cli`,title:`Gemini CLI 接入 gpt88.cc`,description:`Gemini CLI 与 Google 图片模型的 gpt88.cc 接入说明。`,headings:[{id:`setup`,text:`配置方法`,level:2},{id:`image`,text:`图片接口测试`,level:2},{id:`notes`,text:`注意事项`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Gemini 图片模型走原生 generateContent`,children:(0,s.jsxs)(`p`,{children:[`Gemini 图片生成不是普通 `,(0,s.jsx)(`code`,{children:`/v1/chat/completions`}),`，需要走 `,(0,s.jsx)(`code`,{children:`/v1beta/models/:generateContent`}),`。`]})}),(0,s.jsx)(`h2`,{id:`setup`,children:`配置方法`}),(0,s.jsx)(i,{lang:`text`,filename:`setup`,code:d}),(0,s.jsx)(`h2`,{id:`image`,children:`图片接口测试`}),(0,s.jsx)(i,{lang:`bash`,filename:`gemini-image-test.sh`,code:f}),(0,s.jsx)(`h2`,{id:`notes`,children:`注意事项`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[`图片模型建议使用 `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),` 加速域名。`]}),(0,s.jsxs)(`li`,{children:[`比例使用 `,(0,s.jsx)(`code`,{children:`1:1`}),`、`,(0,s.jsx)(`code`,{children:`16:9`}),`、`,(0,s.jsx)(`code`,{children:`9:16`}),` 等 Gemini 支持的枚举。`]}),(0,s.jsxs)(`li`,{children:[`尺寸使用 `,(0,s.jsx)(`code`,{children:`1K`}),`、`,(0,s.jsx)(`code`,{children:`2K`}),`、`,(0,s.jsx)(`code`,{children:`4K`}),` 这种大写格式。`]})]}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/api/images/`,children:`查看图片 API 说明`})}),(0,s.jsx)(`li`,{children:(0,s.jsx)(t,{to:`/docs/integrations/`,children:`返回集成总览`})})]})]})}export{p as default};