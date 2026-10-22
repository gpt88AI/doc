> **GPT88 使用说明**
> 模型名、API 字段、分辨率、运行限制和价格以 GPT88 模型导航及对应 API 文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

本文介绍如何在GPT88 调用 Gemini 系列生图模型，包含文生图、参考图编辑与原生 Gemini 请求。普通应用推荐使用 Images 接口；已有 Gemini 原生客户端可使用 `generateContent`。

## 接入地址与模型

| 项目 | 内容 |
| --- | --- |
| 站点根地址 | https://api.gpt88.cc |
| OpenAI 兼容 SDK 的 Base URL | https://api.gpt88.cc/v1 |
| 文生图 | POST /v1/images/generations |
| 参考图编辑 | POST /v1/images/edits |
| Gemini 原生生成与编辑 | POST /v1beta/models/{model}:generateContent |

本文示例使用 `gemini-nano-banana-2.1`。当前平台也配置了 `gemini-3-pro-image`、`gemini-3-pro-image-preview`、`gemini-3.1-flash-image-preview`；具体可用模型以你的 API 密钥所属分组、模型权限及平台当前列表为准。这些名称是调用时填写的平台模型标识，不代表它们彼此等价。

使用用户 API 密钥鉴权：`Authorization: Bearer sk-你的密钥`。不要使用系统管理令牌。密钥仅保存在服务端或可信本地环境，不要嵌入公开网页。

以下 cURL 使用 Bash 语法，先在本地设置 `GPT88_API_KEY` 环境变量。完整 URL 已含接口路径，不要再次追加 `/v1`。

## 1. 文生图

~~~bash
curl --fail-with-body --max-time 300 \
  'https://api.gpt88.cc/v1/images/generations' \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "model": "gemini-nano-banana-2.1",
    "prompt": "一只坐在窗边的橘猫，水彩插画风格，柔和自然光",
    "n": 1,
    "response_format": "b64_json",
    "aspect_ratio": "1:1"
  }'
~~~

如需指定清晰度，可添加 `"image_size": "2K"`。不填写时由上游选择；平台接受 `1K`、`2K`、`4K`，但具体模型是否支持该档位，以该模型实际能力为准。

## 2. 参考图编辑

### 上传本地文件

将 `reference.png` 换成你的本地图片路径。使用 `-F` 时让 cURL 自动生成 multipart 请求头，不要手动指定 `Content-Type`。

~~~bash
curl --fail-with-body --max-time 300 \
  'https://api.gpt88.cc/v1/images/edits' \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -F 'model=gemini-nano-banana-2.1' \
  -F 'prompt=保留图中主体和构图，将背景改为日落海边' \
  -F 'n=1' \
  -F 'response_format=b64_json' \
  -F 'aspect_ratio=1:1' \
  -F 'image=@reference.png'
~~~

多张参考图使用重复的 `-F 'image[]=@文件路径'`，不要同时使用 `image` 与 `image[]` 文件字段。模型能处理的参考图数量由上游决定，本文不承诺固定上限或生成效果。

### JSON 图片引用

也可将下列 JSON 作为 `/v1/images/edits` 的请求体，使用与文生图相同的 Bearer 和 JSON 请求头。把示例 URL 替换为服务端可直接下载的实际图片链接：

~~~json
{
  "model": "gemini-nano-banana-2.1",
  "prompt": "保留图中主体，将背景改为日落海边",
  "image": "https://your-domain.example/reference.png",
  "n": 1,
  "response_format": "b64_json",
  "aspect_ratio": "1:1"
}
~~~

`image` 支持一个引用或引用数组，也可使用完整的 `data:image/png;base64,...` 数据 URI。示例中的省略号不是有效图片数据。远程链接必须返回实际图片，不能是图片展示网页、登录页或本机路径；下载还需满足平台的媒体访问限制。

平台也识别 `images`、`image_urls`、`referenceImages`，但一次请求只选其中一个引用字段；不能混用别名，也不能把上传文件和 JSON 图片引用混在一起。编辑请求至少提供一张参考图。

## 3. Images 参数与限制

| 参数 | 用法 |
| --- | --- |
| model | 必填，使用平台对当前密钥开放的准确模型名。 |
| prompt | 必填，描述生成内容或编辑要求。 |
| n | 使用 1；不填写时按 1 处理。不支持用较大的值批量生成。 |
| response_format | 省略或填 b64_json；不支持 url。 |
| aspect_ratio | 可选，见下方比例列表。 |
| image_size | 可选，1K、2K、4K，受具体模型能力限制。 |
| resolution | image_size 的兼容写法，不要同时提交冲突值。 |
| size | 兼容比例、清晰度档位和部分标准像素组合；建议优先使用 aspect_ratio 与 image_size，不要随意填写任意宽高。 |
| quality | 省略或填 auto；不要填 hd、high 等其他图像模型参数。 |
| stream | 省略或填 false；Images 接口不支持流式生图。 |

支持的比例：`1:1`、`2:3`、`3:2`、`3:4`、`4:3`、`4:5`、`5:4`、`9:16`、`16:9`、`21:9`。

参考图支持 **PNG、JPEG、WebP**；图片实际格式须与声明的 MIME 类型一致。Images 接口按解码后的图片字节计算：单张不超过 **10 MiB**，合计不超过 **45 MiB**。这是平台接入限制，上游模型或传输链路可能有更严格的限制。

目前不支持 `mask`、`style`、`background`、`output_format`、`output_compression`、`moderation`、`partial_images` 等参数。不要把其他模型的整套参数直接复制过来。若使用 `gemini-2.5-flash-image`，不要指定 `image_size` 或等价分辨率参数；是否可调用该模型仍以你的分组权限为准。

## 4. 获取并保存 Images 返回的图片

成功响应格式如下，Base64 内容仅为结构示意：

~~~json
{
  "created": 1791417600,
  "data": [
    { "b64_json": "这里是完整的图片Base64数据" }
  ]
}
~~~

逐项解码 `data[].b64_json` 即可得到图片字节。返回的实际格式可能是 PNG、JPEG 或 WebP，保存时应识别文件头后选择扩展名，不要固定保存为 `.png`。不要依赖返回公开下载 URL，也不要假定成功响应必定包含 `usage`。

### Python 请求与图片保存

将下面的代码保存为 `gemini_image_example.py`。使用 Python 3 即可运行，无需安装额外依赖。脚本读取 `GPT88_API_KEY` 环境变量，一次运行只提交一次请求，不自动重试；它会识别实际图片格式并保存到指定目录。

Windows PowerShell 可这样设置密钥，运行前替换占位值：

~~~powershell
$env:GPT88_API_KEY = 'sk-你的完整API密钥'
~~~

四种调用方式如下。每次生成建议使用新的 `--output` 目录，避免覆盖已有图片；编辑命令中的 `reference.png` 需要指向真实本地文件。

~~~bash
# Images 文生图
python gemini_image_example.py --prompt "一只窗边的橘猫，水彩风格" --output images-generation-01

# Images 参考图编辑
python gemini_image_example.py --prompt "保留主体，将背景改为日落海边" --reference reference.png --output images-edit-01

# Gemini 原生文生图
python gemini_image_example.py --protocol native --prompt "一只窗边的橘猫，水彩风格" --output native-generation-01

# Gemini 原生参考图编辑
python gemini_image_example.py --protocol native --prompt "保留主体，将背景改为日落海边" --reference reference.png --output native-edit-01
~~~

默认模型为 `gemini-nano-banana-2.1`，可通过 `--model` 指定当前分组开放的其他 Gemini 生图模型。

~~~python
"""gpt88 Gemini image example: standard library only, one request, no retries.

Set GPT88_API_KEY to your full sk- key before running this script.
"""
import argparse
import base64
import json
import os
from pathlib import Path
import urllib.error
import urllib.parse
import urllib.request


def image_type(raw):
    if raw.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'image/png', 'png'
    if raw.startswith(b'\xff\xd8\xff'):
        return 'image/jpeg', 'jpg'
    if raw[:4] == b'RIFF' and raw[8:12] == b'WEBP':
        return 'image/webp', 'webp'
    raise ValueError('Expected a PNG, JPEG or WebP image')


def make_request(model, prompt, reference=None, protocol='images'):
    encoded = mime = None
    if reference is not None:
        if len(reference) > 10 * 1024 * 1024:
            raise ValueError('Reference image exceeds 10 MiB')
        mime, _ = image_type(reference)
        encoded = base64.b64encode(reference).decode('ascii')
    if protocol == 'native':
        parts = [{'text': prompt}]
        if encoded:
            parts.append({'inlineData': {'mimeType': mime, 'data': encoded}})
        return '/v1beta/models/' + urllib.parse.quote(model, safe='') + ':generateContent', {
            'contents': [{'role': 'user', 'parts': parts}],
            'generationConfig': {'responseModalities': ['TEXT', 'IMAGE']},
        }
    body = {'model': model, 'prompt': prompt, 'n': 1, 'response_format': 'b64_json'}
    if encoded:
        body['image'] = 'data:' + mime + ';base64,' + encoded
    return ('/v1/images/edits' if encoded else '/v1/images/generations'), body


def extract_images(payload, protocol):
    if not isinstance(payload, dict) or payload.get('error'):
        raise ValueError('API returned an error or an invalid response')
    if protocol == 'native':
        if payload.get('promptFeedback', {}).get('blockReason') not in (None, '', 'BLOCK_REASON_UNSPECIFIED'):
            raise ValueError('Native request was blocked; inspect promptFeedback')
        if any(candidate.get('finishReason') not in (None, '', 'STOP')
               for candidate in payload.get('candidates', [])):
            raise ValueError('Native generation did not finish normally; inspect finishReason')
        items = [part['inlineData']['data']
                 for candidate in payload.get('candidates', [])
                 for part in candidate.get('content', {}).get('parts', [])
                 if not part.get('thought') and part.get('inlineData', {}).get('data')]
    else:
        items = [item['b64_json'] for item in payload.get('data', []) if item.get('b64_json')]
    if not items:
        raise ValueError('Response contains no image; inspect the error or finishReason')
    images = []
    for item in items:
        raw = base64.b64decode(item, validate=True)
        _, extension = image_type(raw)
        images.append((raw, extension))
    return images


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', default='gemini-nano-banana-2.1')
    parser.add_argument('--prompt', required=True)
    parser.add_argument('--reference', type=Path)
    parser.add_argument('--protocol', choices=['images', 'native'], default='images')
    parser.add_argument('--output', type=Path, default=Path('generated'))
    args = parser.parse_args()
    if args.output.exists() and (not args.output.is_dir() or any(args.output.glob('result-*'))):
        raise ValueError('Choose a new output directory before submitting another request')
    key = os.environ['GPT88_API_KEY'].strip()
    if not key.startswith('sk-'):
        raise ValueError('GPT88_API_KEY must contain your complete sk- API key')
    reference = None
    if args.reference:
        with args.reference.open('rb') as stream:
            reference = stream.read(10 * 1024 * 1024 + 1)
    endpoint, body = make_request(args.model, args.prompt, reference, args.protocol)
    request = urllib.request.Request(
        'https://api.gpt88.cc' + endpoint,
        data=json.dumps(body, ensure_ascii=False).encode('utf-8'),
        headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            payload = json.load(response)
    except urllib.error.HTTPError as error:
        message = error.read(4096).decode('utf-8', errors='replace').replace(key, '<redacted>')
        raise SystemExit(f'HTTP {error.code}: {message}') from None
    images = extract_images(payload, args.protocol)
    args.output.mkdir(parents=True, exist_ok=True)
    for index, (raw, extension) in enumerate(images, start=1):
        destination = args.output / f'result-{index}.{extension}'
        # Exclusive creation protects earlier generated images from overwrite.
        with destination.open('xb') as stream:
            stream.write(raw)
        print(destination)


if __name__ == '__main__':
    main()
~~~

## 5. Gemini 原生接口

原生接口使用站点根地址下的 `/v1beta`，不要拼接成 `/v1/v1beta`。请求使用 `contents`；生成图片需设置 `generationConfig.responseModalities`。

~~~bash
curl --fail-with-body --max-time 300 \
  'https://api.gpt88.cc/v1beta/models/gemini-nano-banana-2.1:generateContent' \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "一只坐在窗边的橘猫，水彩插画风格"}]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {"aspectRatio": "1:1"}
    }
  }'
~~~

支持的模型可在 `imageConfig` 中按需添加 `"imageSize": "2K"`。原生 `imageSize` 和 Images 接口的 `image_size` 写法不同，不能直接互换层级。

原生编辑仍调用同一个 `generateContent` 接口，在 `parts` 中同时提供编辑文字与图片。下面仅展示结构，必须把占位内容替换为图片的完整 Base64：

~~~json
{
  "contents": [{
    "role": "user",
    "parts": [
      {"text": "保留主体，将背景改为日落海边"},
      {"inlineData": {
        "mimeType": "image/png",
        "data": "替换为真实PNG文件的完整Base64，不带data:前缀"
      }}
    ]
  }],
  "generationConfig": {
    "responseModalities": ["TEXT", "IMAGE"]
  }
}
~~~

原生响应从 `candidates[].content.parts[]` 中读取：跳过 `thought: true` 的部分，找到 `inlineData.data` 后解码图片，并根据 `inlineData.mimeType` 保存。文字说明位于 `text`，不应把它当作图片。还应检查 `promptFeedback`、`finishReason` 及是否实际存在图片，不能仅凭 HTTP 200 判断出图成功。

不要用 `responseMimeType: "image/png"` 强制指定输出格式。它不是本接口保证图片编码格式的开关；本示例省略该字段，以实际返回图片类型为准。

## 6. 常见报错与排查

| 状态或错误 | 含义与处理 |
| --- | --- |
| 401 | 检查是否使用有效用户 API 密钥，且 Bearer 请求头格式正确。 |
| 403 | 根据错误正文检查账户状态、令牌与模型权限、入口访问策略；余额不足也可能返回此状态，需按正文判断。 |
| 429 | 可能是请求频率限制，也可能是余额不足等限制；先看错误正文，频控按提示等待，余额不足则检查账户或令牌额度。 |
| 400 model does not support Gemini image generation | 当前请求未进入正确的生图适配。若使用本文列出的模型仍出现此错误，请将模型名、接口路径、请求时间和请求 ID 提交平台排查；不要自行改成另一个模型名。 |
| 400 参数错误 | 检查 n、response_format、流式选项、参考图字段和比例/清晰度是否冲突。修改对应参数后再请求。 |
| 400 安全策略拒绝 | 上游拒绝了本次内容，调整提示词或参考图；同一请求连续重试通常无效。 |
| 502 no_image_generated | 上游完成响应但未返回可用图片；记录错误并联系平台排查。 |
| 502 incomplete_image_response | 上游图片生成未完整结束。 |
| 502 missing_image_usage | 上游未提供当前计费方式所需的用量信息，需由平台核查。 |
| 其他 500 / 502 | 查看完整错误正文和请求 ID，可能是上游故障、响应损坏或服务处理异常，不能单凭状态码认定原因。 |

遇到超时、无图或响应中断，不要立即无限自动重试：客户端停止等待时，上游生成可能仍在继续，再发请求可能产生重复任务和费用。先保存错误正文、时间和请求 ID，再判断是否重新提交。排查资料中请隐藏 API 密钥。
