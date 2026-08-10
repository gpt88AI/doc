---
title: Nano Banana Pro 提示词完整指南 2025：从入门到精通的实战教程
description: Nano Banana Pro提示词完整教程，涵盖7大核心技巧、中英文文字渲染秘诀、10+场景模板，从写实摄影到动漫风格全覆盖。附可复制代码示例，助你快速掌握AI生图精髓。
date: 2025-12-26
category: Gemini专题
tags: [nano banana pro, 提示词, prompt, AI生图, Gemini 3 Pro Image, 文字渲染]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

Nano Banana Pro作为Google DeepMind发布的最新图像生成模型，在文字渲染准确率上达到了94%，远超竞品的70-82%水平。然而，同样使用这个模型，不同的提示词却能产生天壤之别的效果。一个精心设计的提示词可以让模型生成专业级的4K图像，而随意拼凑的关键词往往只能得到模糊、走形的结果。

本指南将系统讲解Nano Banana Pro提示词的核心技巧，从基础的六要素结构到高级的角色一致性控制，从中英文文字渲染到各类风格模板。无论你是刚接触AI生图的新手，还是希望提升输出质量的进阶用户，都能在这里找到可直接应用的实战方法。

## 为什么提示词决定Nano Banana Pro的成败

Nano Banana Pro的技术架构与传统图像生成模型有本质区别。它基于Gemini 3 Pro构建，具备深度语言理解和逻辑推理能力。这意味着模型不仅在"画图"，更是在"思考"你的需求。当你提供一个提示词时，模型会先进行语义分析和意图推理，然后才开始生成图像。

这种"思考型"架构带来的直接影响是：**提示词的质量直接决定了模型理解的准确度**。给模型"一只猫"和"一只橘色的英国短毛猫，蹲坐在阳光下的窗台上，毛发蓬松，眼睛半闭，享受午后阳光"，生成结果的差异可想而知。前者让模型自由发挥，后者则精确控制了关键元素。

Google官方的测试数据显示，使用结构化提示词的生成成功率比随机关键词高出47%。在商业应用场景中，这个差距直接转化为时间和成本的节省。一个好的提示词可能一次就得到满意结果，而糟糕的提示词可能需要反复调整十几次。

本文接下来将教你如何构建高质量提示词，让每一次API调用都物有所值。

## 提示词六要素：构建完美提示词的基础

一个完整的Nano Banana Pro提示词应该包含六个核心要素，每个要素在最终图像中扮演特定角色：

| 要素     | 英文名      | 作用               | 示例                             |
|----------|-------------|--------------------|----------------------------------|
| 主体     | Subject     | 定义图像核心内容   | 一位年轻女性、一只橘猫、一杯咖啡 |
| 构图     | Composition | 控制视角和画面布局 | 特写镜头、俯视角度、居中构图     |
| 动作     | Action      | 描述主体正在做什么 | 微笑着阅读、奔跑中、静静站立     |
| 场景     | Setting     | 设定环境和背景     | 现代咖啡厅、雨中的街道、日落海滩 |
| 风格     | Style       | 确定整体美学       | 电影质感、动漫风格、油画效果     |
| 编辑指令 | Editing     | 特殊处理要求       | 添加文字、调整色调、去除背景     |

这六个要素的组合形成了标准的提示词结构：

``` blog-inline-code
[主体+形容词] 正在 [动作] 在 [场景/环境]。
[构图/镜头角度]。[光线/氛围]。[风格/媒介]。
```

实际应用示例：

**基础版本**：生成一张咖啡图片

**优化版本**：一杯热气腾腾的拿铁咖啡，放在深棕色木质桌面上，咖啡表面有精美的拉花图案。特写镜头，自然光从左侧45度角照入，营造温暖的早晨氛围。产品摄影风格，高清4K画质。

这种结构化方法确保了提示词的完整性，让模型能够准确理解你的创作意图。

## 七大核心技巧：官方推荐的黄金法则

<img src="/docs/blog/zh/nano-banana-pro-prompts-guide/img/content-img-1.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro七大核心技巧图示：场景描述、具体化、上下文、迭代、分步指令、负向提示、参考图像" />

Google官方发布的提示词指南中总结了七个最有效的技巧，这些技巧经过大量测试验证，能显著提升生成质量。

**技巧一：描述场景而非罗列关键词**

模型的核心优势在于深度语言理解能力。用叙述性段落进行提示，几乎总比零散词汇列表效果更好。

| 类型     | 示例                                                                                         |
|----------|----------------------------------------------------------------------------------------------|
| 错误写法 | 猫, 可爱, 橘色, 阳光, 窗台, 4K                                                               |
| 正确写法 | 一只橘色的猫蜷缩在阳光明媚的窗台上，阳光透过薄纱窗帘洒在它蓬松的毛发上，营造出温暖惬意的氛围 |

**技巧二：高度具体化**

细节越多，控制力越强。不要只写"奇幻盔甲"，而是描述为"华丽的精灵板甲，刻有银叶图案，高领设计，肩甲呈猎鹰翅膀形状"。

**技巧三：提供上下文和意图**

说明图像的用途会影响最终输出。"为高端极简护肤品牌设计一个徽标"比单纯写"设计一个徽标"更容易得到理想效果。

**技巧四：迭代与优化**

不要期望一次就能生成完美图像。利用模型的对话特性进行微调："太棒了，但能把光线调得更暖一些吗？"或者"其他都保持不变，但把角色的表情变得更严肃一些。"

**技巧五：分步指令处理复杂场景**

对于包含许多元素的复杂场景，将提示词分解成几个步骤：

``` blog-inline-code
首先，创建一个宁静、薄雾笼罩的黎明森林背景。
然后，在前景中，添加一个长满苔藓的古老石坛。
最后，在祭坛上放上一把发光的剑。
```

**技巧六：语义化负向提示**

不要说"不要汽车"，而是从正面描述期望的场景："一条空旷、荒芜的街道，没有任何交通迹象。"这种正向描述更容易被模型准确理解。

**技巧七：善用参考图像**

Nano Banana Pro支持最多14张参考图像。明确定义每张图的作用："使用图A的人物姿态，图B的艺术风格，图C的背景环境。"

## 文字渲染完全攻略：中英文精准生成

文字渲染是Nano Banana Pro最强大的能力之一，94%的文字准确率远超竞品。但要达到这个水平，需要掌握正确的提示词格式。

### 英文文字渲染技巧

成功率与单词数量直接相关：

| 文字长度  | 成功率 | 建议           |
|-----------|--------|----------------|
| 1-3个单词 | 75%    | 最佳选择       |
| 4-8个单词 | 40%    | 需分步描述     |
| 9+个单词  | 15%    | 建议拆分或迭代 |

关键技巧：

-   用引号明确标注文字内容
-   指定字体样式："large bold sans-serif typography"
-   明确位置："centered in the top third"
-   强调清晰度："text must be sharp and readable at 100% zoom"

**英文文字渲染模板**：

``` blog-inline-code
Create a professional poster with the text "YOUR TEXT HERE"
displayed prominently in bold sans-serif font,
centered at the top of the image.
The text should be large, clear, and readable.
All letters must be sharp with proper spacing.
```

### 中文文字渲染五步法

中文文字渲染是许多用户的痛点，"春节快乐"变成"节快春乐"的情况时有发生。以下是经过验证的五步法：

**步骤一：使用全角符号包裹**

用中文引号「」或全角引号""包裹文字内容，帮助模型识别这是需要渲染的文字而非提示词的一部分。

**步骤二：逐字列出**

对于关键文字，逐一列出每个字符："春节快乐"（四个汉字：春、节、快、乐，按此顺序排列）

**步骤三：指定字体和颜色**

明确字体风格（楷体、黑体、宋体）和颜色（红色、金色、白色），避免模型自由发挥。

**步骤四：强调准确性**

在提示词末尾添加："每个汉字笔画必须准确，不能有任何变形或错误"

**步骤五：避免生僻字和复杂字**

尽量使用常用汉字，避免生僻字。对于笔画复杂的字，可以考虑使用其他表述方式。

**中文文字渲染完整模板**：

``` blog-inline-code
生成一张新年贺卡海报。
文字内容：「新年快乐」（四个汉字：新、年、快、乐，按此顺序从左到右排列）
文字样式：金色，楷体风格，大号加粗
文字位置：画面中央偏上
背景：红色喜庆风格，带有祥云图案
要求：每个汉字笔画必须准确完整，字间距均匀，整体美观大方
```

## 风格控制大师课：四种主流风格模板

不同的创作需求需要不同的风格控制方法。以下是四种最常用风格的详细模板。

### 写实摄影风格

想生成逼真的照片效果，需要像摄影师一样思考。在提示词中明确机位角度、镜头参数、布光方式以及细节纹理。

**写实摄影模板**：

``` blog-inline-code
A photorealistic [镜头类型: close-up/wide shot/portrait] of [主体],
[动作或表情], set in [环境描述].
The scene is illuminated by [灯光描述: natural sunlight/studio lighting/golden hour],
creating a [氛围: warm/dramatic/serene] atmosphere.
Captured with a [相机参数: 85mm f/1.4 lens, shallow depth of field],
emphasizing [关键纹理: skin texture/fabric details/water droplets].
4K resolution, photorealistic quality.
```

**产品摄影示例**：

``` blog-inline-code
一张专业的产品摄影照片，展示一瓶高端护肤精华。
玻璃瓶身通透，金色瓶盖闪耀。
放置在白色大理石台面上，背景是柔和的渐变灰色。
5600K色温主光从左上方45度角照射，
右侧有30%强度的补光消除阴影。
浅景深效果，产品清晰锐利，背景柔和虚化。
4K高清画质，商业级产品摄影标准。
```

### 动漫插画风格

动漫风格需要指定具体的渲染方式和上色风格。

**动漫插画模板**：

``` blog-inline-code
高保真二次元插画，官方立绘风格。
[角色描述：外貌、服装、表情]
赛璐璐上色技法，清晰的轮廓线条。
[背景描述]
画面整体色调[明亮/暗黑/柔和]，
光影层次分明，细节丰富。
日本动漫工作室品质。
```

### 3D渲染风格

3D风格强调材质、光线和空间感。

**3D渲染模板**：

``` blog-inline-code
3D rendered image in a semi-realistic cartoon style.
[主体描述] with clean geometric shapes and smooth surfaces.
Soft shadows and volumetric lighting.
[环境描述]
Rendered in Unreal Engine 5 quality,
with subtle ambient occlusion and global illumination.
High resolution, crisp details.
```

### 艺术绘画风格

艺术风格可以参考特定艺术家或艺术流派。

**油画风格模板**：

``` blog-inline-code
Transform the scene into the artistic style of [艺术家/流派: Impressionism/Van Gogh/Monet].
[场景描述]
Preserve the composition but render with visible brushstrokes,
rich color palette, and painterly texture.
Canvas texture visible, museum quality artwork.
```

## 角色一致性进阶：多图保持同一角色

Nano Banana Pro支持最多14张参考图像，其中6张可以高保真还原。这使得在不同场景中保持角色一致成为可能。

### 多图参考基本原则

测试数据显示，使用参考图的角色一致率达到98%，而不使用参考图仅有71%。因此，在需要角色一致的场景中，务必提供参考图。

**多图参考提示词结构**：

``` blog-inline-code
使用提供的参考图像：
- 图像A：作为角色面部特征参考
- 图像B：作为服装和姿态参考
- 图像C：作为背景环境参考

保持角色的面部特征与图像A完全一致，
包括脸型、眼睛形状、发型。
服装样式参考图像B，但可以调整颜色。
将角色放置在图像C的环境中。
```

### Identity Locking技巧

当需要同一角色出现在多个场景时：

``` blog-inline-code
Keep the person's facial features exactly the same as Image 1.
Same face shape, same eye color, same hairstyle.
Only change: [描述要改变的元素: expression/pose/environment]

Important:
- skin tone must remain consistent
- facial proportions must be identical
- no drift in character appearance
```

### 连续叙事场景

创建故事性的连续画面时：

``` blog-inline-code
Same subjects, same wardrobe/appearance, same time-of-day lighting style.
Only the following may change: action, expression, camera angle, and framing.
Scene [X] of a narrative sequence.
[具体场景描述]
```

## 实战模板库：10个场景即用提示词

以下是10个经过验证的实战模板，可直接复制使用或根据需求修改。

### 模板1：社交媒体海报

``` blog-inline-code
设计一张Instagram风格的社交媒体海报。
主题：[你的主题，如咖啡店促销]
配色：[主色调，如暖棕色系]
文字内容：「[你的文字]」，使用现代无衬线字体
布局：方形1:1比例，文字位于上部三分之一处
风格：时尚简约，高级感
元素：[相关元素，如咖啡杯、咖啡豆]
整体调性：[温暖/活力/优雅]
```

### 模板2：产品展示图

``` blog-inline-code
专业产品摄影。
产品：[产品描述]
放置于[表面描述：白色大理石/木质桌面]
背景：[纯色渐变/场景化背景]
光线：柔和的工作室灯光，主光源从左上方45度
细节：产品材质纹理清晰可见
画质：4K高清，商业级品质
```

### 模板3：信息图表

``` blog-inline-code
Create a clean, modern infographic about [主题].
Layout: vertical format, white background
Use [颜色方案] as accent colors
Include:
- Title at top: "[标题文字]"
- [X] key data points with icons
- Clear visual hierarchy
- Readable sans-serif typography
All text must be sharp and legible.
Professional design quality.
```

### 模板4：人物肖像

``` blog-inline-code
专业人像摄影。
主体：[人物描述：年龄、性别、特征]
表情：[自信的微笑/严肃专注/轻松愉快]
服装：[服装描述]
背景：[纯色/渐变/场景]
光线：Rembrandt lighting，柔和过渡
镜头：85mm f/1.4，浅景深
画质：高清锐利，皮肤纹理自然
```

### 模板5：风景摄影

``` blog-inline-code
Stunning landscape photography.
Scene: [场景描述：山脉/海滩/城市天际线]
Time: [时间：golden hour/blue hour/night]
Weather: [天气：晴朗/多云/薄雾]
Composition: [构图：三分法/引导线/框架]
Captured with wide-angle lens, sharp throughout.
HDR processing, vivid colors, dramatic sky.
National Geographic quality.
```

### 模板6：Logo设计

``` blog-inline-code
设计一个专业的品牌Logo。
品牌名称：「[品牌名]」
行业：[行业描述]
风格：[极简/现代/复古/科技感]
配色：[主色+辅色]
元素：[可选的图形元素]
要求：
- 文字清晰可读
- 适合各种尺寸使用
- 背景透明或纯色
专业品牌设计标准。
```

### 模板7：UI界面设计

``` blog-inline-code
Modern mobile app UI design.
Screen: [屏幕类型：home/profile/settings]
App type: [应用类型：社交/电商/工具]
Style: [风格：iOS/Material Design/custom]
Color scheme: [配色方案]
Include:
- Navigation bar
- [主要功能区域]
- Clear typography
- Proper spacing and alignment
Figma-quality mockup, clean and professional.
```

### 模板8：游戏角色设计

``` blog-inline-code
游戏角色概念设计，全身立绘。
角色：[角色设定：职业、种族、性格]
服装：[服装详细描述]
武器/道具：[装备描述]
姿态：[战斗姿态/站立pose]
风格：[写实/卡通/像素]
背景：简洁或透明
多角度视图：正面为主
游戏美术工业标准。
```

### 模板9：古风插画

``` blog-inline-code
中国古风水墨插画。
主题：[场景描述：江南水乡/山间仙境/古代庭院]
人物：[人物描述，如有]
元素：[传统元素：亭台楼阁/梅兰竹菊/祥云瑞兽]
色调：[淡雅水墨/青绿山水/工笔重彩]
意境：[空灵悠远/大气磅礴/婉约细腻]
留白处理得当，构图符合中国画审美。
绘画品质精湛，笔触细腻。
```

### 模板10：商业广告

``` blog-inline-code
高端商业广告设计。
产品/服务：[描述]
目标受众：[受众画像]
广告语：「[你的广告语]」
视觉风格：[奢华/活力/温馨/专业]
主视觉：[描述主要画面元素]
配色：[品牌色系]
尺寸比例：[16:9/1:1/9:16]
品牌感强，视觉冲击力，促进转化。
广告公司级别品质。
```

## 新手避坑指南：8个常见错误及纠正

掌握了技巧和模板后，还需要了解常见错误以避免踩坑。

### 错误1：关键词堆砌

**问题**：把所有想要的元素用逗号罗列，如"猫, 可爱, 毛茸茸, 阳光, 窗台, 花瓶, 4K, HDR, 专业"

**纠正**：用完整句子描述场景，让元素之间有逻辑关系。"一只毛茸茸的可爱小猫蜷缩在阳光洒满的窗台上，旁边放着一个装有鲜花的陶瓷花瓶。"

### 错误2：描述过于模糊

**问题**：提示词太短或太泛，如"画一个漂亮的风景"

**纠正**：具体说明什么风景、什么时间、什么氛围。"日落时分的托斯卡纳田园风光，金色麦田延伸至远方的山丘，天空呈现橙红渐变。"

### 错误3：忽略文字格式

**问题**：直接写"海报上写着新年快乐"

**纠正**：使用引号标注、逐字说明、指定字体颜色位置。参考前文的中文文字渲染五步法。

### 错误4：不使用参考图

**问题**：期望仅通过文字描述就能精确控制角色外观

**纠正**：在需要精确还原的场景中，务必上传参考图并明确说明各图的用途。

### 错误5：期望一次完美

**问题**：发现生成结果不满意就完全重写提示词

**纠正**：利用迭代功能微调："保持其他不变，把背景颜色改成蓝色"或"整体很好，但把人物的微笑改得更自然一些"。

### 错误6：忽视负向描述

**问题**：使用"不要汽车"这样的否定句

**纠正**：从正面描述期望的状态："一条安静的步行街，只有行人漫步"。模型对正向描述的理解更准确。

### 错误7：分辨率设置不当

**问题**：不指定分辨率，或者需要4K却忘记标注

**纠正**：明确在提示词中指定"4K resolution"或"2K quality"，根据实际用途选择合适的分辨率。

### 错误8：忽略API限制

**问题**：提示词过长超出token限制，或请求参数不符合规范

**纠正**：了解API的具体限制，控制提示词长度在合理范围内。如果内容复杂，考虑分步生成或使用迭代优化。

## API调用实践：代码集成完整流程

<img src="/docs/blog/zh/nano-banana-pro-prompts-guide/img/content-img-2.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro API调用流程：从提示词到图像生成的完整代码集成示意图" />

掌握了提示词技巧后，下一步是将其应用到实际项目中。对于国内开发者，[GPT88.ai](https://gpt88.cc)可以作为Nano Banana Pro API网关候选路线；正式使用前应核对当前模型、价格、日志、失败扣费和并发行为。

### 基础调用示例

    hljs python复制import requests
    import base64

    # API配置
    API_KEY = "sk-your-api-key"  # 从 GPT88.ai 获取
    API_URL = "https://gpt88.cc/v1"

    def generate_image(prompt: str, resolution: str = "2K") -> bytes:
        """
        使用Nano Banana Pro生成图像

        Args:
            prompt: 提示词
            resolution: 分辨率 - "1K", "2K", 或 "4K"

        Returns:
            图像二进制数据
        """
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "responseModalities": ["IMAGE"],
                "imageConfig": {
                    "aspectRatio": "auto",
                    "imageSize": resolution
                }
            }
        }

        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=180
        )

        if response.status_code != 200:
            raise Exception(f"API错误: {response.status_code}")

        result = response.json()
        image_data = result["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]

        return base64.b64decode(image_data)

    # 使用示例
    prompt = """
    一只橘色的英国短毛猫，蹲坐在阳光洒满的窗台上。
    毛发蓬松柔软，眼睛半闭，享受午后温暖的阳光。
    旁边放着一盆绿色多肉植物。
    写实摄影风格，自然光，浅景深效果。
    4K高清画质。
    """

    image_bytes = generate_image(prompt, resolution="4K")

    with open("cat.png", "wb") as f:
        f.write(image_bytes)

    print("图像已保存为 cat.png")

### 提示词优化建议

为了获得最佳效果并节省API调用成本：

1.  **先用简短提示词测试方向**：用较低分辨率快速验证整体效果
2.  **确认方向后完善细节**：补充具体描述，提高分辨率
3.  **利用迭代功能微调**：小幅修改时使用对话式迭代，避免完全重新生成
4.  **保存成功的提示词模板**：建立自己的提示词库，复用效果好的结构

通过GPT88.ai调用，每次生成仅需$0.05（官方价格的两折），非常适合需要批量生成或反复迭代的场景。

## 常见问题解答

### 提示词最大长度是多少？

Nano Banana Pro支持较长的提示词，但建议控制在500-1000个字符以内。过长的提示词可能导致模型无法完全理解所有细节，关键信息反而被稀释。

### 中文和英文提示词效果有差异吗？

模型对中英文都有良好支持，但在某些特定场景下可能有细微差异。对于技术性描述（如相机参数、光线设置），英文表述更精确；对于中文文字渲染，中文提示词配合规范格式效果更佳。

### 生成失败或结果不满意怎么办？

首先检查提示词是否足够具体和清晰。如果方向正确但细节不满意，使用迭代功能微调；如果完全偏离预期，建议重新审视提示词结构，确保六要素完整。

### 如何设置多图参考？

通过API调用时，可以在contents数组中同时包含多个图像和文字说明。每张参考图需要明确标注其用途（面部参考、风格参考、背景参考等）。

### 迭代修改的提示词怎么写？

保持简洁和具体。例如："保持整体构图不变，把背景从白色改成浅蓝色"或"角色表情太严肃了，改成轻松的微笑"。避免重复描述已经满意的部分。

### 如何提高文字渲染成功率？

遵循本文介绍的格式规范，特别是：用引号标注文字、控制文字长度在3个单词以内、明确指定字体和位置、强调清晰度要求。对于中文，额外注意逐字列出和避免复杂字。

------------------------------------------------------------------------

掌握Nano Banana Pro提示词的核心技巧，能让你的AI生图效率提升数倍。从基础的六要素结构到高级的角色一致性控制，每一个技巧都是提升输出质量的关键。建议先从本文提供的模板开始实践，逐步积累经验，形成自己的提示词风格。

想要立即体验Nano Banana Pro的强大能力？可以在[在线体验平台](https://gpt88.cc)免费试用，感受不同提示词带来的效果差异。
