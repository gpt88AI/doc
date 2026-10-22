> **GPT88 使用说明**
> 模型名、API 字段、分辨率、运行限制和价格以 GPT88 模型导航及对应 API 文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## GPT88 Seedance 视频生成 API 指南

通过 GPT88 Seedance API，可完成文生视频、图生视频、参考生成、视频编辑、视频延长、多媒体参考和同步音频生成。本页提供可直接使用的请求示例，以及任务提交、状态查询和结果获取方法。

> **开始前**
> 先使用自己的 API Key 调用 `/v1/models` 获取可用模型。图片、视频和音频必须使用可公开访问的 HTTPS URL；媒体可访问性和模型处理结果可能影响任务完成，建议先用较短时长和少量素材进行小规模测试。 示例中的 YOUR_PUBLIC_MEDIA_HOST 是占位符，必须替换为你自己无需登录即可访问的 HTTPS 素材地址，不能原样提交。令牌需具有 Seedance 分组与对应模型的使用权限。

## 支持的功能

- 文生视频（Text-to-Video）：根据文字提示生成视频。
- 图生视频（Image-to-Video）：使用一张首帧图片，或首帧与尾帧生成视频。
- 参考生成（Reference-to-Video）：使用多张参考图保持人物、场景、服装或风格一致。
- 视频编辑（Video Edit）：通过 `video_edit` 修改参考视频，仅支持直接调用 API。
- 视频延长（Video Extend）：通过 `video_extend` 延长参考视频，仅支持直接调用 API。
- 多媒体参考：可通过数组提供多个图片、视频和音频参考。
- 同步音频：在适用模型中使用 `generate_audio:true` 生成与画面同步的声音。
- 异步任务：提交任务后，可查询状态并获取结果 URL。
## 接口与认证

| GET | `/v1/models` | 获取当前 API Key 可用的模型 |
| POST | `/v1/video/generations` | 提交视频生成任务 |
| GET | `/v1/video/generations/{task_id}` | 查询任务状态与结果 |
| GET | `/v1/videos/{task_id}/content` | 通过 GPT88 认证代理下载已完成结果 |
> **按全量下载路径使用**
> 认证内容代理返回完整视频文件。当前不支持 Range 分段请求；请按完整文件下载使用，不要依赖断点续传或分段读取。

API 基础地址为 `https://api.gpt88.cc`。所有请求都需要 `Authorization: Bearer <API_KEY>`；示例中的 `<API_KEY>` 只是占位符。

~~~bash
curl --request GET \
  --url 'https://api.gpt88.cc/v1/models' \
  --header 'Authorization: Bearer <API_KEY>'
~~~

## 模型规格与模式限制

| 模型 | 分辨率 | 时长 | 画面比例 | 输出与音频 |
| --- | --- | --- | --- | --- |
| Seedance 2.5 | 支持 `720p`、`1080p`，默认 `720p`；不支持 `480p`、`4k`。 | `-1` 或 4–30 秒；`video_edit` 必须使用 `-1`，`video_extend` 可省略。 | 支持 `21:9`、`16:9`、`4:3`、`1:1`、`3:4`、`9:16`、`adaptive`，默认 `adaptive`。 | `mp4`、`mov`；适用场景可生成同步音频。 |
| Seedance 2.0 pro | 支持 `480p`、`720p`、`1080p`、`4k`。 | `-1` 或 4–15 秒；默认 5 秒。 | 支持七种通用比例；使用 `4k` 时推荐 `16:9`。 | `mp4`；适用场景可生成同步音频。 |
| Seedance 2.0 fast / mini | 不支持 `4k`。 | 以 `/v1/models` 中可用的具体模型为准。 | 按具体模型选择。 | 适合对速度更敏感的场景。 |

| 模式 | 输入方式 | 画面比例要求 |
| --- | --- | --- |
| 文生视频 | 文字提示 | 可使用固定比例或 `adaptive`。 |
| 参考图生成 | `images[]` 全部使用 `reference_image` | 可使用固定比例或 `adaptive`。 |
| 首帧生成 | `image` 或一个 `first_frame` | 必须使用 `adaptive`。 |
| 首帧与尾帧 | 一个 `first_frame` 加一个 `last_frame` | 必须使用 `adaptive`。 |
| 视频编辑与视频延长 | 有序 `content[]` 中的 `reference_video` | 必须使用 `adaptive`。 |

> **图片角色不要混用**
> 首帧模式只使用 `first_frame`，或使用 `first_frame` 加 `last_frame`；参考图模式中的所有图片都应使用 `reference_image`。同一请求不要混合首尾帧角色与参考图角色。

## 常用生成示例

### 文生视频

使用文字提示、分辨率、画面比例和时长创建任务。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "清晨的海边栈道上，一名跑步者迎着阳光前进，镜头平稳跟随，画面自然真实，不出现文字、商标或水印。",
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 8,
  "generate_audio": false,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @text-to-video.json
~~~

### 图生视频

单张 `image` 按首帧处理，因此画面比例使用 `adaptive`。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "保持首帧主体、构图与光线不变，镜头缓慢向前推进，树叶随微风自然摆动，不出现文字、商标或水印。",
  "image": "https://YOUR_PUBLIC_MEDIA_HOST/first-frame.jpg",
  "resolution": "720p",
  "ratio": "adaptive",
  "duration": 5,
  "generate_audio": false,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @image-to-video.json
~~~

### 多张参考图生成

使用对象数组时，为每张图片明确设置 `role:"reference_image"`。参考图模式可使用固定画面比例。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "参考人物、档案室与红色文件夹图片，生成角色走进档案室并打开绿色文件柜的连续镜头；保持人物外观、场景和道具一致，不出现文字、商标或水印。",
  "images": [
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/character.png",
      "role": "reference_image"
    },
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/scene.png",
      "role": "reference_image"
    },
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/prop.png",
      "role": "reference_image"
    }
  ],
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 6,
  "generate_audio": false,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @reference-to-video.json
~~~

### 多图片、视频和音频参考

顶层 `images[]`、`videos[]` 和 `audios[]` 用于通用参考生成，不等同于视频编辑或视频延长。不同素材组合的处理效果可能因模型和素材而异，建议先使用少量公开 HTTPS 素材测试。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "综合人物与场景图片、动作视频和参考音频生成一个新的连续镜头；保持主体一致，并让输出声音与画面动作自然同步，不出现文字、商标或水印。",
  "images": [
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/character.png",
      "role": "reference_image"
    },
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/scene.png",
      "role": "reference_image"
    }
  ],
  "videos": [
    {
      "url": "https://YOUR_PUBLIC_MEDIA_HOST/reference-video.mp4"
    }
  ],
  "audios": [
    "https://YOUR_PUBLIC_MEDIA_HOST/reference-audio.wav"
  ],
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 8,
  "generate_audio": true,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @multi-image-video-audio-reference.json
~~~

### 生成同步音频

将 `generate_audio` 放在请求体顶层。设置为 `true` 时，请求模型为输出视频生成同步声音。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "雨后的城市街道上，一辆电车缓慢驶过；生成与画面同步的自然雨声、车轮声和远处城市环境声，不出现文字、商标或水印。",
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 8,
  "generate_audio": true,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @synchronous-audio.json
~~~

### Seedance 2.5 生成 1080p 视频

Seedance 2.5 支持 `1080p`。以下示例使用 `16:9`、4 秒时长并生成同步音频。任务完成后，可使用结果 URL 或认证内容代理 `/v1/videos/{task_id}/content` 下载完整视频文件；该代理当前不支持 Range 分段请求。

~~~json
{
  "model": "doubao-seedance-2.5",
  "prompt": "One continuous cinematic shot of a small scarlet paper boat drifting across a rain-dark stone fountain at dawn. The camera glides slowly beside it while ripples match gentle water splashes and a soft morning breeze. No text, captions, logos, watermark, cuts, or people.",
  "resolution": "1080p",
  "ratio": "16:9",
  "duration": 4,
  "generate_audio": true,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @seedance-2-5-1080p.json
~~~

### Seedance 2.0 pro 生成 4k 视频

`4k` 仅用于支持该分辨率的 Seedance 2.0 Pro 模型，推荐使用 `16:9`。Seedance 2.5、fast 和 mini 不支持 `4k`。

~~~json
{
  "model": "doubao-seedance-2.0",
  "prompt": "广角镜头展示夜晚的现代城市天际线，灯光倒映在河面上，镜头缓慢横移，画面写实，不出现文字、商标或水印。",
  "resolution": "4k",
  "ratio": "16:9",
  "duration": 5,
  "generate_audio": false,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @seedance-2-0-pro-4k.json
~~~

## 视频编辑与视频延长（仅 API）

> **仅限直接调用 API**
> `video_edit` 和 `video_extend` 使用下面的请求格式。本页不宣称 Playground 可创建这两类请求。

两种模式都通过 omni_reference_task_type 选择，并按顺序传递 content[]。参考视频项必须使用 type:"video_url"、video_url.url 和 role:"reference_video"；不要发送 resolution。项目顺序和未知字段按 JSON 语义保留，但重新序列化不保证字节逐一相同。

### 视频编辑 video_edit

使用 `omni_reference_task_type:"edit"`，画面比例必须为 `adaptive`，时长必须为 `-1`。

~~~json
{
  "model": "doubao-seedance-2.5",
  "omni_reference_task_type": "edit",
  "content": [
    {
      "type": "text",
      "text": "保留主体动作、镜头节奏和原始构图，把天空改为日落，并增加自然的暖色光线；不要添加文字、商标或水印。"
    },
    {
      "type": "video_url",
      "video_url": {
        "url": "https://YOUR_PUBLIC_MEDIA_HOST/reference-video.mp4"
      },
      "role": "reference_video"
    }
  ],
  "ratio": "adaptive",
  "duration": -1,
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @video-edit.json
~~~

### 视频延长 video_extend

使用 omni_reference_task_type:"extend"，画面比例必须为 adaptive。最小模板省略 duration；如显式提供，传输层只接受整数、精确 -1 哨兵，拒绝小数、其他负数和大于 3600 的值，最终仍由上游判断。

~~~json
{
  "model": "doubao-seedance-2.5",
  "omni_reference_task_type": "extend",
  "content": [
    {
      "type": "text",
      "text": "沿用原视频的运镜、主体、场景和光线，自然延长后续画面；保持视觉连续，不添加文字、商标或水印。"
    },
    {
      "type": "video_url",
      "video_url": {
        "url": "https://YOUR_PUBLIC_MEDIA_HOST/reference-video.mp4"
      },
      "role": "reference_video"
    }
  ],
  "ratio": "adaptive",
  "output_format": "mp4"
}
~~~

~~~bash
curl --request POST \
  --url 'https://api.gpt88.cc/v1/video/generations' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data @video-extend.json
~~~

> **不要混淆参考视频入口**
> `images[].role=reference_video` 是无效写法。顶层 `videos[]` 是参考生成输入，不等同于视频编辑或视频延长；编辑和延长必须使用有序 `content[]` 中的 `reference_video`。

## 提交任务、查询状态与获取结果

提交成功后，从响应中的 `id` 或 `task_id` 取得任务 ID。任务通常经历 `pending`、`in_progress`、`completed` 或 `failed` 等状态；状态为 `completed` 时即可获取结果。

~~~json
{
  "id": "task_xxxxxxxxxxxxxxxxx",
  "task_id": "task_xxxxxxxxxxxxxxxxx",
  "status": "pending"
}
~~~

使用任务 ID 轮询状态：

~~~bash
curl --request GET \
  --url 'https://api.gpt88.cc/v1/video/generations/<TASK_ID>' \
  --header 'Authorization: Bearer <API_KEY>'
~~~

当状态为 `completed` 时，从响应中的 `url` 或 `metadata.url` 获取结果地址；当状态为 `failed` 时，查看 `error` 信息并调整请求。结果地址可能有有效期，建议及时下载。

~~~json
{
  "id": "task_xxxxxxxxxxxxxxxxx",
  "task_id": "task_xxxxxxxxxxxxxxxxx",
  "status": "completed",
  "metadata": {
    "url": "https://YOUR_PUBLIC_MEDIA_HOST/generated-output.mp4"
  }
}
~~~

## 常见请求问题

| 问题 | 处理方法 |
| --- | --- |
| 媒体 URL 无法访问 | 使用无需登录、可公开访问的 HTTPS URL，并先检查图片、视频或音频能否直接下载。 |
| 首帧模式使用固定比例 | 将 `ratio` 改为 `adaptive`。首帧、首尾帧、视频编辑和视频延长都需要 `adaptive`。 |
| 图片角色混用 | 首尾帧模式与参考图模式分开使用；参考图模式中的全部图片都设置为 `reference_image`。 |
| 把参考视频放进 `images[]` | 参考生成使用顶层 `videos[]`；视频编辑或延长使用有序 `content[]` 中的 `reference_video`。 |
| 选择了模型不支持的分辨率 | Seedance 2.5 仅使用 `720p` 或 `1080p`；需要 `4k` 时选择可用的 Seedance 2.0 pro 模型。 |

## 安全、素材与成本

> **提交前检查**
> 只使用无需登录、可公开读取的 HTTPS 素材；API Key 只通过环境变量或密钥服务注入。每个建立的任务都可能产生费用。只上传自己拥有或已获授权的人像、声音、视频、音乐和品牌素材；真人脸部或声音模仿需取得明确同意。结果 URL 可能过期，完成后及时下载。

## 相关文档与示例素材

查看通用视频接口、模型发现和任务字段说明：

[视频生成接口（主站参考）](https://www.juapi.net/docs/quickstart/page-1786638658501)

查看可下载的参考图片、音频、生成视频和更多 Seedance 2.5 请求示例：

[Seedance 2.5 示例与复现（主站参考）](https://www.juapi.net/docs/quickstart/seedance-2-5-real-test)
