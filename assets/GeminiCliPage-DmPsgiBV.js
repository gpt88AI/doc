import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{c as a,l as o}from"./index-DCJmtdkW.js";import{n as s,t as c}from"./integrationLocaleCopy-DCRt8AIz.js";var l=e(),u=`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation uses the native Gemini generateContent endpoint.`,d=`curl -s -X POST \\
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
  }'`;function f(){return(0,l.jsxs)(o,{path:`/docs/integrations/dev/gemini-cli`,title:`Gemini CLI with gpt88.cc`,description:`Use Gemini CLI and Google image models through gpt88.cc.`,headings:[{id:`setup`,text:`Configuration`,level:2},{id:`image`,text:`Image endpoint test`,level:2},{id:`notes`,text:`Notes`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,l.jsx)(a,{tone:`info`,title:`Gemini image models use native generateContent`,children:(0,l.jsxs)(`p`,{children:[`Gemini image generation does not use the standard `,(0,l.jsx)(`code`,{children:`/v1/chat/completions`}),` path. It uses the native `,(0,l.jsx)(`code`,{children:`/v1beta/models/:generateContent`}),` endpoint.`]})}),(0,l.jsx)(`h2`,{id:`setup`,children:`Configuration`}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:u}),(0,l.jsx)(`h2`,{id:`image`,children:`Image endpoint test`}),(0,l.jsx)(i,{lang:`bash`,filename:`gemini-image-test.sh`,code:d}),(0,l.jsx)(`h2`,{id:`notes`,children:`Notes`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[`For image generation, use the media Base URL `,(0,l.jsx)(`code`,{children:`https://img.gpt88.cc`}),`.`]}),(0,l.jsxs)(`li`,{children:[`Aspect ratios must use Gemini-supported values such as `,(0,l.jsx)(`code`,{children:`1:1`}),`, `,(0,l.jsx)(`code`,{children:`16:9`}),`, or `,(0,l.jsx)(`code`,{children:`9:16`}),`.`]}),(0,l.jsxs)(`li`,{children:[`Image sizes use uppercase values such as `,(0,l.jsx)(`code`,{children:`1K`}),`, `,(0,l.jsx)(`code`,{children:`2K`}),`, and `,(0,l.jsx)(`code`,{children:`4K`}),`.`]})]}),(0,l.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,l.jsxs)(`ul`,{children:[(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/api/images/`,`en`),children:`Read the image API guide`}),`.`]}),(0,l.jsxs)(`li`,{children:[(0,l.jsx)(t,{to:r(`/docs/integrations/`,`en`),children:`Return to the integrations hub`}),`.`]})]})]})}var p=`BASE_URL=https://img.gpt88.cc
API_KEY=你的-gpt88-api-key
MODEL=gemini-3-pro-image-preview

图片生成走 Gemini 原生 generateContent 接口。`,m=`curl -s -X POST \\
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
  }'`,h={zh:{title:`Gemini 图片模型走原生 generateContent`,info:`Gemini 图片生成不是普通 /v1/chat/completions，需要走 /v1beta/models/:generateContent。`,setup:p,notes:[`图片模型建议使用 https://api.gpt88.cc 加速域名。`,`比例使用 1:1、16:9、9:16 等 Gemini 支持的枚举。`,`尺寸使用 1K、2K、4K 这种大写格式。`],next:[`查看图片 API 说明`,`返回集成总览`]},hi:{title:`Gemini image model native generateContent उपयोग करता है`,info:`Gemini image generation सामान्य /v1/chat/completions नहीं है; /v1beta/models/:generateContent उपयोग करें।`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint से चलती है।`,notes:[`Image model के लिए https://api.gpt88.cc acceleration domain उपयोग करें।`,`1:1, 16:9, 9:16 जैसे Gemini-supported ratios चुनें।`,`Size को 1K, 2K, 4K uppercase format में दें।`],next:[`Image API docs देखें`,`Integrations overview पर लौटें`]},bn:{title:`Gemini image model native generateContent ব্যবহার করে`,info:`Gemini image generation সাধারণ /v1/chat/completions নয়; /v1beta/models/:generateContent ব্যবহার করুন।`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint দিয়ে চলে।`,notes:[`Image model-এর জন্য https://api.gpt88.cc acceleration domain ব্যবহার করুন।`,`1:1, 16:9, 9:16-এর মতো Gemini-supported ratio ব্যবহার করুন।`,`Size 1K, 2K, 4K uppercase format-এ দিন।`],next:[`Image API docs দেখুন`,`Integrations overview-এ ফিরুন`]},ur:{title:`Gemini image model native generateContent استعمال کرتا ہے`,info:`Gemini image generation عام /v1/chat/completions نہیں؛ /v1beta/models/:generateContent استعمال کریں۔`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint سے چلتی ہے۔`,notes:[`Image model کے لیے https://api.gpt88.cc acceleration domain استعمال کریں۔`,`1:1، 16:9، 9:16 جیسے Gemini-supported ratios استعمال کریں۔`,`Size 1K، 2K، 4K uppercase format میں دیں۔`],next:[`Image API docs دیکھیں`,`Integrations overview پر واپس جائیں`]},ta:{title:`Gemini image model native generateContent-ஐ பயன்படுத்துகிறது`,info:`Gemini image generation சாதாரண /v1/chat/completions அல்ல; /v1beta/models/:generateContent பயன்படுத்தவும்.`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint மூலம் இயங்கும்.`,notes:[`Image model-க்கு https://api.gpt88.cc acceleration domain பயன்படுத்தவும்.`,`1:1, 16:9, 9:16 போன்ற Gemini-supported ratios பயன்படுத்தவும்.`,`Size 1K, 2K, 4K uppercase format-ல் வழங்கவும்.`],next:[`Image API docs பார்க்கவும்`,`Integrations overview-க்கு திரும்பவும்`]},ne:{title:`Gemini image model ले native generateContent प्रयोग गर्छ`,info:`Gemini image generation सामान्य /v1/chat/completions होइन; /v1beta/models/:generateContent प्रयोग गर्नुहोस्।`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint बाट चल्छ।`,notes:[`Image model का लागि https://api.gpt88.cc acceleration domain प्रयोग गर्नुहोस्।`,`1:1, 16:9, 9:16 जस्ता Gemini-supported ratio प्रयोग गर्नुहोस्।`,`Size 1K, 2K, 4K uppercase format मा दिनुहोस्।`],next:[`Image API docs हेर्नुहोस्`,`Integrations overview मा फर्कनुहोस्`]},si:{title:`Gemini image model native generateContent භාවිතා කරයි`,info:`Gemini image generation සාමාන්‍ය /v1/chat/completions නොවේ; /v1beta/models/:generateContent භාවිතා කරන්න.`,setup:`BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation Gemini native generateContent endpoint එකෙන් ක්‍රියා කරයි.`,notes:[`Image model සඳහා https://api.gpt88.cc acceleration domain භාවිතා කරන්න.`,`1:1, 16:9, 9:16 වැනි Gemini-supported ratios භාවිතා කරන්න.`,`Size 1K, 2K, 4K uppercase format එකෙන් දෙන්න.`],next:[`Image API docs බලන්න`,`Integrations overview වෙත ආපසු යන්න`]}};function g(){let{locale:e}=n();if(e===`en`)return(0,l.jsx)(f,{});let r=c(e,`gemini-cli`,{title:`Gemini CLI 接入 gpt88.cc`,description:`Gemini CLI 与 Google 图片模型的 gpt88.cc 接入说明。`,intro:`文本请求和 Gemini 原生图片请求使用不同协议与端点，请按任务选择。`}),u=s(e,`gemini-cli`,{setup:`配置方法`,image:`图片接口测试`,notes:`注意事项`,next:`下一步`}),d=h[e]??h.zh;return(0,l.jsxs)(o,{path:`/docs/integrations/dev/gemini-cli`,title:r.title,description:r.description,headings:[{id:`setup`,text:u.setup,level:2},{id:`image`,text:u.image,level:2},{id:`notes`,text:u.notes,level:2},{id:`next`,text:u.next,level:2}],children:[(0,l.jsx)(`p`,{children:r.intro}),(0,l.jsx)(a,{tone:`info`,title:d.title,children:(0,l.jsx)(`p`,{children:d.info})}),(0,l.jsx)(`h2`,{id:`setup`,children:u.setup}),(0,l.jsx)(i,{lang:`text`,filename:`setup`,code:d.setup}),(0,l.jsx)(`h2`,{id:`image`,children:u.image}),(0,l.jsx)(i,{lang:`bash`,filename:`gemini-image-test.sh`,code:m}),(0,l.jsx)(`h2`,{id:`notes`,children:u.notes}),(0,l.jsx)(`ul`,{children:d.notes.map(e=>(0,l.jsx)(`li`,{children:e},e))}),(0,l.jsx)(`h2`,{id:`next`,children:u.next}),(0,l.jsxs)(`ul`,{children:[(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/api/images/`,children:d.next[0]})}),(0,l.jsx)(`li`,{children:(0,l.jsx)(t,{to:`/docs/integrations/`,children:d.next[1]})})]})]})}export{g as default};