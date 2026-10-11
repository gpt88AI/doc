import{D as e,K as t,T as n,Y as r,d as i,j as a,x as o}from"./icons-BdoF5TkG.js";import{n as s,r as c,t as l}from"./vendor-BB_MfLXE.js";import{n as u}from"./ui-6T_4G6VH.js";import{n as d,u as f}from"./router-BH55i7sL.js";import{t as p,u as m,x as h}from"./index-Cjjrt7Of.js";var g=`## 打开命令面板

按 \`Cmd + K\`（Mac）或当前应用显示的对应快捷键打开，也可以从左上角菜单进入命令面板。若快捷键被浏览器拦截，直接使用菜单。

## 搜索和执行

1. 输入功能名称或关键词。
2. 用 \`↑\` / \`↓\` 选择命令。
3. 按 \`Enter\` 执行。
4. 按 \`Esc\` 退出，不执行当前命令。

命令通常按工具、编辑、视图、AI、导出和设置分类。忘记功能在哪个菜单时，先输入最具体的名词，再从结果中确认图标和描述。

## 使用时的检查

命令面板会直接触发操作，清空画布、删除素材和清理数据前先阅读确认提示。高频操作可通过命令面板快速打开[任务队列](/docs/user-manual/advanced-task-queue/)、[素材库](/docs/user-manual/advanced-media-library/)或导出工具。

快捷键冲突时，确认焦点不在输入框、输入法处于预期语言，并尝试工具栏按钮。若命令不存在，说明当前版本或当前权限可能不提供该功能。
`,_=`## 导出图片和项目

从菜单选择导出图片，再选择 PNG 或 JPG。PNG 支持透明背景，适合需要保留透明区域的素材；JPG 文件较小，适合照片类内容。

导出前先选中需要分享的区域，确认只有目标内容会进入文件。快捷键 \`Ctrl/Cmd + Shift + E\` 可快速打开导出流程。

要保存可继续编辑的项目，选择保存文件，生成 \`.drawnix\` 项目文件（本质为 JSON）。需要恢复时选择打开文件。项目文件适合自己在相同或兼容的画布工具中继续编辑，不等同于普通图片。

## 备份与恢复

打开备份 / 恢复功能，选择要导出的提示词历史、项目文件和素材库内容，再下载 ZIP。导入时选择备份文件和恢复项；导入通常会与现有数据合并，开始前仍应阅读当前界面的提示。

导出后解压检查文件数量和大小，确认重要图片、项目和笔记都在。恢复前先保留当前数据的一份备份，避免误操作后无法回退。

## 自动保存的边界

原画布会在浏览器本地自动保存部分工作，但自动保存不等于跨设备同步。换浏览器、清除网站数据、隐私模式或存储空间不足都可能导致内容不可见。

建议在重要里程碑手动导出项目和备份，并把文件放在有访问控制的位置。不要把包含 API Key 的配置截图或导出文件上传到公开仓库。

## 分享前检查

PNG/JPG 分享前查看尺寸、背景和文字清晰度；项目或 ZIP 分享前移除不应共享的素材、提示词和凭证。需要与他人协作时，先确认对方使用的应用支持该格式，再发送文件。
`,v=`## 打开预览

在画布上双击图片元素打开预览。预览通常提供关闭、缩放、适应窗口、原始大小和多图切换；多图浏览时先确认当前图片名称。

预览页的缩放可以用滚轮、加减按钮或滑块，拖动查看细节。多图联动缩放等高级按钮是否存在，以当前版本为准。

## 裁剪与调整

选中图片后进入编辑，使用裁剪框调整范围。支持自由裁剪时可拖动边角；常见预设包括 1:1、4:3、16:9、9:16 与原始比例。

“自动去白边”适合处理带多余边缘的生成图，但执行前先保留原图。滤镜通常包括原图、鲜艳、柔和、复古、黑白、冷色和暖色，并可调亮度、对比度、饱和度、色温与锐化。

## 保存结果

- 保存：覆盖画布上的原图；确认不需要保留原版再使用。
- 另存为：保留原图并创建新图片，适合对比版本。
- 下载：把编辑结果保存到本地，适合交付或备份。
- 关闭 / \`Esc\`：放弃未保存修改。

编辑中可用 \`Ctrl/Cmd + Z\` 撤销、\`Ctrl/Cmd + Y\` 重做；\`Enter\` 确认当前操作。SVG 等矢量格式可能不支持同样的位图编辑功能。

完成后以原始大小和目标导出尺寸各预览一次，检查裁剪边缘、文字清晰度和色彩。必要时回到[素材库](/docs/user-manual/advanced-media-library/)保留两个版本。
`,y=`## 建立知识库结构

从工具箱打开知识库。左侧通常包含搜索、标签、目录树和笔记列表，中间是 Markdown 编辑区，右侧可能显示相似笔记或知识提取。

建议按项目、产品和 Skill 分目录；先写一篇短笔记验证检索和保存，再批量导入资料。

## 管理目录与笔记

在目录上使用右键菜单新建、复制、重命名或删除；在笔记上可创建副本、插入画布或删除。删除前确认是否有画布引用和备份。

顶部搜索用于关键词检索，标签用于筛选。标签保持少量、稳定和有含义，避免把每个提示词都建成独立标签。

## 导入和导出

从更多操作菜单导入 Markdown 或 ZIP，导出时选择 ZIP 保存目录、笔记和标签。导入通常会与现有知识合并；先做备份并检查重名文件，确认没有覆盖重要笔记。

\`\`\`text
知识库
├── 项目资料
├── 提示词规范
└── Skill
    ├── 产品图
    └── 流程图
\`\`\`

## 知识提取与自定义 Skill

知识提取会让 AI 归纳关键点。逐条检查提取内容，确认来源和范围，再保存或合并，避免把未经验证的推断当作项目事实。

系统 Skill 通常以只读笔记展示；自定义 Skill 可在 Skill 目录新建笔记，写清角色、输入、步骤、输出格式和失败处理，再从 AI 输入区选择。

知识库可能保存在浏览器本地。迁移前使用[备份与恢复](/docs/user-manual/advanced-export-import/)；不要把 API Key、Cookie 或客户数据写入可公开分享的笔记。
`,b=`## 打开与添加素材

从底部工具栏或图库入口打开素材库。AI 生成的图片和视频通常会自动进入这里；本地图片可通过“上传”加入。

素材库是复用结果的中心：点击图片可预览详情，选择素材后可以插入画布，也可以在生成参考图时从素材库挑选。

## 筛选和管理

按全部、图片或视频筛选，搜索时使用提示词或内容关键词。删除前确认该素材是否还有项目引用；删除素材通常不会移除已经插入画布的副本，但不同版本行为可能不同。

素材大图预览、下载和编辑入口可能位于详情面板。需要继续处理时，先保留原始素材，再另存编辑结果。

## 存储和迁移

原教程将素材描述为浏览器本地存储。清除网站数据、使用隐私模式或更换浏览器，可能让素材不可见；本地存储空间也受浏览器限制。

重要素材定期通过[备份与恢复](/docs/user-manual/advanced-export-import/)导出。迁移到新设备时，先导出完整备份，再在目标浏览器导入，并检查随机抽取的图片、视频和项目是否可打开。

不要把包含账户凭证的截图当成素材分享。GPT88 生成入口见 [OpenTu 工作台](https://agent.gpt88.cc/opentu)，模型与用量以当前工作台为准。
`,x=`## 打开设置

在 [GPT88 OpenTu 工作台](https://agent.gpt88.cc/opentu) 从左上角菜单进入“设置”。当前设置页的主要标签是“供应商”“模型预设”“画布显示”和“语音播放”；进入后先确认当前页面标题，再修改对应字段。

## 供应商与模型预设

供应商、接口类型、图片接口格式、API 地址和 API Key 都在“供应商”标签管理；模型预设负责保存常用的模型组合。需要完整接入步骤时，阅读[API 配置与首次生成](/docs/user-manual/api-configuration/)。不要把旧供应商地址或价格 URL 复制到 GPT88 配置。

图片和文本 API 使用不同服务地址：OpenTu 图片模型先配置 \`https://img.gpt88.cc\`，标准文本 API 使用 \`https://api.gpt88.cc/v1\`。保存供应商后用一次最小任务验证，再把稳定配置保存为模型预设。接口路径、模型和字段参照对应 API 页面。

## 主题、语言和移动端

“画布显示”用于主题、网格和画布相关偏好；“语音播放”用于语音功能的播放设置。主题支持亮色和暗色时，可从右下角切换按钮或设置项选择。语言选项从左上角菜单进入；切换后检查工具栏、快捷键和导出菜单是否仍然易于识别。

移动端可能支持双指缩放、单指拖动和长按菜单，工具栏会改为更紧凑的布局。先在小项目上验证文本输入、选择、缩放和导出，再处理复杂画布。

## 浏览器数据与清理

原画布把项目、素材、提示词历史和设置保存在浏览器的数据存储中，实际位置可能包括 IndexedDB、LocalStorage 和 Cache Storage。数据是否上传、哪些配置会同步，取决于当前应用实现与服务商协议，不要据此推断 GPT88 API 的服务端存储政策。

清理网站数据前，先用[导出与导入](/docs/user-manual/advanced-export-import/)备份。清理操作可能无法撤销；API Key 应在控制台管理，而不是把它当作普通画布数据保存。

## 常见设置问题

- 设置未生效：保存后刷新，重新打开设置检查字段是否保留。
- 生成失败：检查 Key、地址、模型权限、余额与网络，见[问题排查](/docs/user-manual/advanced-troubleshooting/)。
- 换电脑：导出项目和素材，重新在目标浏览器配置凭证，不要把 Key 写进备份分享。
`,S=`## 查看任务状态

打开右侧工具栏底部的任务队列。顶部标签通常包含全部、生成中、失败和已完成；状态筛选能帮助你快速找到需要处理的项目。

任务卡片可能显示提示词、模型、创建时间、结果和错误信息。长任务先记录任务 ID，再切换到其他页面操作。

## 单个任务操作

完成任务可以插入画布或下载；失败任务可在错误原因明确后重试；不再需要的记录可删除。重试前先确认不是重复提交、权限失败或余额不足。

按类型筛选图片、视频或角色任务，搜索提示词或内容关键词。生成结果一般也会出现在[素材库](/docs/user-manual/advanced-media-library/)，但两处记录的生命周期可能不同。

## 批量处理

进入多选模式后，按当前版本提供的操作批量取消、重试或删除。先只选择同一状态的任务，避免对进行中的任务执行不可逆删除。

完成一批任务后抽查几个结果：确认文件能打开、尺寸正确、没有重复和敏感内容，再整理到项目目录。

## 失败任务的最短排查路径

1. 读取错误码和任务创建时间。
2. 检查[API 配置](/docs/user-manual/api-configuration/)中的 Key、服务端点、模型和余额。
3. 用更短提示词和默认尺寸创建一次小任务。
4. 仍失败时保留任务 ID，按[问题排查](/docs/user-manual/advanced-troubleshooting/)收集脱敏信息。
`,C=`## 找到工具箱

从工具栏的工具箱按钮或更多工具入口打开抽屉。常见工具分为内容工具和 AI 工具；工具名称与分组会随应用版本更新。

内容工具通常用于提示词参考、动作参考和知识管理；AI 工具可能包含聊天、单图生成、批量出图和视频生成。打开前先确认工具所需的网络、权限和 API 配置。

## 在抽屉或独立窗口使用

抽屉内点击“打开”在侧边面板使用；支持独立窗口时选择“新窗口”。独立窗口通常可以拖动、调整大小、最小化和关闭。

常用工作流是：在提示词工具中复制一条描述，回到生成输入框修改主体和尺寸，提交小样本，再到任务队列与素材库检查结果。

## 批量出图

批量工具通常以表格方式编辑，每行一条提示词，可添加参考图并统一设置模型和尺寸。先填写 2 至 3 行验证结果，再扩大数量。

批量任务启动后不要重复点击；到[任务队列](/docs/user-manual/advanced-task-queue/)查看完成与失败项。结果保存后，再按[素材库](/docs/user-manual/advanced-media-library/)分类管理。

## 知识库与提示词

知识库适合记录产品规范、风格词和自定义 Skill。将可复用内容写成清晰的角色、输入、输出和验收条件，避免保存 API Key 或个人隐私。

GPT88 的图片创作入口见 [OpenTu 工作台](https://agent.gpt88.cc/opentu)。如果某个工具在当前工作台不可见，使用 API 或工作台文档中明确提供的入口，不要假设工具箱一定包含原画布的全部功能。
`,w=`## 先收集可复现信息

记录操作步骤、页面 URL、浏览器版本、发生时间、模型、任务 ID 和完整错误码。截图或日志中遮住 API Key、Cookie、邮箱和其他个人信息。

原画布的调试工具是否可用，取决于当前应用版本。优先使用应用内置的日志导出、任务队列和设置检查；不要把一个旧版调试地址拼到 GPT88 域名上。

## AI 生成失败

按以下顺序排查：

1. 刷新页面并确认网络稳定。
2. 打开设置，核对服务端点、API Key 是否有效且没有多余空格。
3. 到 GPT88 控制台确认 Key 未停用、模型权限和余额正常。
4. 用最短提示词、默认尺寸和已知可用模型提交一次小任务。
5. 查看任务队列的状态、错误码和重试入口；保存任务 ID。

401 / 403 通常先看凭证状态和权限；模型可见但任务失败，还要核对接口协议、字段和支持尺寸。不要在错误不明时连续重试。

## 页面空白或加载缓慢

先硬刷新：Windows 使用 \`Ctrl + Shift + R\`，Mac 使用 \`Cmd + Shift + R\`。再检查浏览器版本、扩展、网络和存储空间。清除缓存前导出项目、素材和知识库备份；清缓存可能解决加载问题，但不应成为没有备份的第一步。

## 素材不显示或数据丢失

确认是否换了浏览器、进入了隐私模式或清理了网站数据。检查素材库筛选条件、磁盘空间和项目文件。优先从最近备份恢复，并验证恢复后的随机文件。

如果只是画布视野问题，先使用自适应视图；如果对象确实被删除，尝试撤销或从项目文件恢复。

## 视频任务长时间等待

在[任务队列](/docs/user-manual/advanced-task-queue/)确认状态和任务 ID。不同模型的等待时间和后台执行语义不同；超过模型说明中的合理范围后，查看错误日志，再按服务端返回决定重试或联系支持。

## 联系 GPT88 支持

无法解决时，携带脱敏后的错误码、任务 ID、请求时间、复现步骤、浏览器版本和截图，前往 [gpt88.cc](https://gpt88.cc/) 或 [OpenTu 工作台](https://agent.gpt88.cc/opentu) 的当前支持入口。不要提交完整 API Key、Cookie、原始请求头或包含密钥的日志。
`,T=`## 完成一次文生图

先完成[GPT88 API 配置](/docs/user-manual/api-configuration/)，或直接打开 [GPT88 OpenTu 工作台](https://agent.gpt88.cc/opentu)使用图片工作台。下面的画布操作来自原教程，具体菜单以你正在使用的应用为准。

1. 在底部输入框写出主体、场景与风格，例如“绿色玻璃杯放在白色桌面，窗边柔光，写实产品照片”。
2. 用模型选择按钮（原界面为 \`#\`）选择支持图片生成的模型。
3. 按使用场景设置比例：方形适合头像，横图适合封面，竖图适合海报。
4. 点击发送或按 \`Enter\`，在任务列表查看状态。
5. 结果返回后预览画面，确认是否插入画布或进入素材库，再下载保存。

原教程以 \`nano-banana\` 和 \`nano-banana-pro\` 演示普通与高清创作。GPT88 的模型 ID、支持分辨率、计费和权限请以[模型广场](https://agent.gpt88.cc/model-square)及[图片 API 文档](/docs/api/images/)为准；显示名称与可调用 ID 可能不同。

## 写出可控的提示词

提示词可以依次描述“主体 → 场景 → 构图 → 光线 → 风格”。例如，将“产品图片”改为“透明玻璃杯居中，纯白背景，侧面柔光，保留玻璃透亮质感，无文字”。

先改变一个变量比较效果：构图可以用特写、俯视或全景，风格可以用水彩、油画、写实或 3D 渲染。不要同时塞入互相冲突的要求。

## 参考图与批量创作

点击图片入口，从本地或素材库选择参考图，并说明希望保留和改变的内容。参考图应清晰且与目标有关。

需要多个版本时，在支持批量生成的工具中按行填写提示词，统一模型和尺寸，再提交。先跑少量样本确认效果与用量，再扩大批次。GPT88 的对应操作见[图片工作台指南](/docs/guides/agent-image-studio/)。

## Agent 和 Skill

原画布可在生成类型中选择 Agent，并使用 Skill 下拉菜单。其内置示例包括灵感图、宫格图、流程图、思维导图、SVG、PPT 和需求文档；自动模式会尝试按指令选择能力。

自定义 Skill 的原流程是从下拉菜单进入“添加 Skill”，在知识库的 Skill 目录建立笔记，写明角色、输入和输出格式后保存。详见[知识库](/docs/user-manual/advanced-knowledge-base/)。这些入口属于原画布示例，GPT88 当前可用功能请在实际工作台确认。

## 检查结果和失败任务

生成时长受模型、尺寸、排队和服务状态影响。到[任务队列](/docs/user-manual/advanced-task-queue/)检查失败原因，先排查网络、API 配置、权限与余额，再考虑重试。

结果不理想时，补充具体描述或换一个已开放模型；任务没有明确结束前避免重复提交。历史素材可在[素材库](/docs/user-manual/advanced-media-library/)复用。
`,E=`## 准备适合拆分的整图

宫格图先以一张完整图片构图，再切成多个小块。选择能跨格连续的主体，如全景、全身人物或居中的艺术画面；避免关键信息正好落在切割线。

![原画布中的宫格拆图演示](/user-manual/image-split.gif)

可以在新画布的灵感板选择拆图模板，也可以自己描述场景。提示词先写完整画面，再说明构图；方形原图通常更便于做九宫格。

## 执行拆分

生成后，若当前工具出现拆分选项，点击并选择网格。已有图片则先选中，在右键菜单寻找“拆分图片”。

| 网格 | 输出数量 | 典型用途 |
| --- | --- | --- |
| 2 × 2 | 4 | 简单拼图 |
| 3 × 3 | 9 | 九宫格组合 |
| 2 × 3 | 6 | 特定版式 |

确认后检查每块的边缘是否连续。若主体被切断，可先重新裁剪或调整构图，再拆分。

## 保存和发布顺序

框选拆分结果检查整体布局。导出整组可以保存组合预览；要分别发布九张图时，需要逐张保存，而不是把整组导出的一张图当作九个文件。

按从左到右、从上到下的顺序命名并选择：

\`\`\`text
01 02 03
04 05 06
07 08 09
\`\`\`

发布前用本地预览重新排列一次，确认方向、顺序和数量。

## 提高拆图效果

保证原图分辨率足够；拆分后单张尺寸会减小。核心内容尽量放在中心区域，四周留出场景延伸。过小主体、跨格文字或细节过度集中，都可能影响单块可读性。

GPT88 可用于[生成整图](/docs/user-manual/ai-generation-image-generation/)；实际拆分需要当前画布或编辑器提供相应工具。不要把“生成九宫格效果图”与“输出九个独立文件”混为一项任务。
`,D=`## 从模板开始

原画布为空时，会在 AI 输入区上方展示灵感模板。模板为常见用途预填提示词，让你先得到一份可修改的创作草稿。

1. 建立一个新画布，保留已有项目。
2. 浏览模板并选择符合用途的一项。
3. 检查自动填入的提示词，修改主体、场景和输出要求。
4. 选择模型与比例，再提交生成。
5. 预览结果，确认构图和内容，再保存或继续调整。

若模板区没有显示，先检查画布是否已有内容。需要重新浏览时使用新项目；不要为了看模板而直接清空尚未保存的作品。

## 按场景选择模板

| 类型 | 使用方式 |
| --- | --- |
| 宫格拆图 | 先生成完整场景，再拆分为拼图或系列素材 |
| 艺术创作 | 从预设风格开始，逐步调整笔触、光线和画面元素 |
| 实用设计 | 按封面、头像、商品展示或社交配图修改尺寸与主体 |

模板内容会随应用更新，名称和位置以当前界面为准。生成请求仍需有效 API 配置、模型权限和可用余额。

## 把灵感变为可复用流程

保存效果好的提示词，同时记录模型、比例、参考图与用途。下次复用时先修改产品或主题，再做少量测试，避免把旧素材条件误带入新项目。

还可以从素材库、历史提示词或自己有权使用的作品中提取构图思路，用自己的描述重新组织。

GPT88 用户可从 [OpenTu 图片工作台](https://agent.gpt88.cc/opentu)开始，并参考[图片工作台教程](/docs/guides/agent-image-studio/)准备商品图、海报或场景图。拆图操作见[智能拆分图片](/docs/user-manual/ai-generation-image-split/)。
`,O=`## 先确认模型能力

原画布教程使用 Veo3、Veo3.1、Sora-2 及部分 Pro 版本作示例。它们的权限、时长、参考图与首尾帧能力并不相同，GPT88 当前可用项请查[模型广场](https://agent.gpt88.cc/model-square)和对应 API 文档。

GPT88 视频接入说明可从[Grok 视频 API](/docs/api/grok-video/)开始。选择其他模型时应查对应协议，不能直接复用 Grok 的请求字段。服务端点参考[统一服务端点](/docs/quickstart/#endpoints)。

## 文字生成视频

1. 在生成类型或模型选择器切换到视频。
2. 描述主体、动作、环境和镜头，例如“海边礁石，浪花轻拍，镜头缓慢拉远，日落暖光”。
3. 选择账号可用的视频模型，按其支持范围设置时长或比例。
4. 提交后记录任务，在任务队列等待状态更新。
5. 完成后预览运动与画面，下载并检查文件能正常播放。

## 图片生成视频与首尾帧

图生视频时，先从本地或素材库选择清晰的参考图，再说明运动：主体如何动、背景是否变化、镜头推进还是保持固定。

如果所选模型明确支持首尾帧，上传起始画面，按需要添加结束画面，再描述两者之间的过渡。原教程以 Veo3.1 系列演示；其他模型是否支持必须单独确认。

先用图片生成确认构图，满意后再制作视频，可减少无效迭代。多参考图、音频和时长要求都应落在模型实际能力内。

## 跟踪任务与保存结果

生成耗时会受模型、负载和素材影响。等待期间可以继续其他创作，但不要把“标签页关闭后继续”当成所有客户端都保证的行为；任务是否由服务端继续执行，应通过任务 ID 和当前状态确认。

完成结果可进入素材库、插入画布或下载。长时间没有变化时先查看状态和错误，再决定是否重试；盲目重复提交可能产生多份任务与用量。

## 调整提示词与处理失败

用明确动作和节奏描述运动，避免一条短视频同时要求过多场景切换。时长要求应使用模型支持的参数，单写“3 秒”未必改变实际输出时长。

失败时检查网络、Key、权限、余额和参考素材格式，简化描述后再提交。声音支持与输出时长以模型说明为准。具体诊断见[问题排查](/docs/user-manual/advanced-troubleshooting/)。
`,k=`## 先选择你的使用方式

这篇教程对应 [GPT88 OpenTu 工作台](https://agent.gpt88.cc/opentu)。先准备 GPT88 API Key，再在 OpenTu 的“供应商”设置中添加服务、加载模型，最后回到画布完成一次生成。

如果供应商和模型已经配置好，可直接从[AI 生成图片](/docs/user-manual/ai-generation-image-generation/)开始。GPT88 另有[图片工作台指南](/docs/guides/agent-image-studio/)，适合了解模板化的图片生产流程。

## 创建并保管 API Key

1. 登录 [GPT88 控制台](https://gpt88.cc/)，进入 API Key 管理页面。
2. 创建一个便于识别用途的 Key；若界面提供分组选择，确认该分组开放了你需要的模型。
3. 复制 Key 到工具的凭证输入框，检查首尾是否粘贴了空格。
4. 在[大模型广场](https://agent.gpt88.cc/model-square)或控制台确认当前模型权限、计费单位与可用性。

Key 是账户凭证。不要放进公开截图、分享项目、笔记、群聊或代码。怀疑泄露时，在控制台停用该 Key 后重新创建。

## 在 OpenTu 设置中新增供应商

打开 [GPT88 OpenTu 工作台](https://agent.gpt88.cc/opentu)，从左上角菜单进入“设置”，切换到“供应商”标签，点击“新增供应商”。当前页面会依次显示基础配置、图片接口格式、API 地址、API Key 和模型列表等字段：

| 字段 | 填写方式 |
| --- | --- |
| 名称 | \`GPT88\`，或能区分用途的自定义名称 |
| API Key | 刚创建的 GPT88 Key |
| 接口类型 | OpenAI 兼容；只有使用 Gemini 原生请求或自定义协议时才选择其他类型 |
| 图片接口格式 | 使用 OpenAI 图片格式时选“OpenAI GPT Image”；无法确认时先用“自动” |
| API 地址 | OpenTu 图片模型使用 \`https://img.gpt88.cc\`；接入标准文本 API 时使用 \`https://api.gpt88.cc/v1\` |
| 模型价格 URL | 可留空；不要把旧供应商的价格地址带入 GPT88 配置 |
| 模型 | 当前账号已开放、且客户端支持的模型 ID |

保存前确认供应商分组已选中、启用状态打开，并检查图片接口格式和 API 地址是一套协议。OpenTu 的图片供应商可先用“OpenAI GPT Image”格式与 \`https://img.gpt88.cc\`，再从账号可用模型里选择 \`gpt-image-2\` 等图片模型；不要把旧供应商的默认地址、价格 URL 或模型名复制到 GPT88 配置。详见[统一服务端点](/docs/quickstart/#endpoints)、[图片 API](/docs/api/images/)与[视频 API](/docs/api/grok-video/)。

## 加载和添加模型

1. 保存供应商配置；若有启用开关，确认已开启。
2. 在供应商详情中点击“获取模型”，等待模型列表返回。
3. 搜索目标模型，先勾选少量实际需要的模型，再确认添加。
4. 返回生成界面，重新选择供应商、分组和模型。

列表为空时，依次确认地址、Key 是否有效、模型权限与网络状态。能够加载模型只说明发现接口可用，还需要一次实际生成验证客户端是否支持该模型协议。

## 完成第一次生成

输入简单提示词，例如“白色背景上的绿色玻璃杯，柔和侧光，产品摄影”，先选择普通尺寸并提交一次任务。查看任务状态，等待结果后预览并下载图片。

完成标准：模型能被选择、任务有明确状态、结果能够正常打开。成功后再增加参考图、高清尺寸或批量任务，便于定位配置问题。

## 排查配置问题

| 现象 | 下一步 |
| --- | --- |
| 401 / 403 | 检查 Key 是否停用、权限或分组是否匹配；不要反复混用新旧凭证 |
| 模型可见但生成失败 | 对照模型的接口协议、请求字段和支持尺寸，检查余额与错误信息 |
| 生成界面找不到模型 | 确认执行了添加操作，供应商已启用，再刷新模型选择器 |
| 长时间没有结果 | 查看[任务队列](/docs/user-manual/advanced-task-queue/)，记录任务 ID，再按[排障指南](/docs/user-manual/advanced-troubleshooting/)处理 |

如果模型发现成功而 OpenTu 生成失败，可按[快速开始](/docs/quickstart/)单独验证 API，再核对 OpenTu 的接口类型、图片接口格式和当前模型是否匹配。
`,A="## 移动与缩放\n\n无限画布可以容纳多个内容区域。先区分手形工具和选择工具：前者移动视野，后者操作元素。\n\n- 按 `H` 切换手形工具，然后拖动画布。\n- 临时移动视野可以按住空格再拖动，也可以按住鼠标中键拖动。\n- 滚轮用于缩放；使用右下角的加减按钮也能调整视野。\n- 点击缩放百分比选择预设比例；想找回全部内容时使用“自适应”。\n\n原手册对 `Ctrl/Cmd + 0` 同时描述了重置比例和自适应视图。实际行为请以当前版本为准；需要完整显示内容时，优先使用明确标注的“自适应”按钮。\n\n## 选择与删除元素\n\n按 `V` 回到选择工具。点击元素进行单选，拖出框选区域进行多选，也可按住 `Ctrl/Cmd` 逐项追加。`Ctrl/Cmd + A` 选择全部；空白处点击或 `Esc` 取消选择。\n\n删除前确认选框范围，然后使用 `Delete` 或 `Backspace`。误操作时立即撤销；大量修改前建议[导出项目备份](/docs/user-manual/advanced-export-import/)。\n\n## 复制、撤销与重做\n\n选中对象后可复制粘贴，也可以原地复制。按住 `Alt` 拖动会产生副本，适合重复排列元素。\n\n| 操作 | 快捷键 |\n| --- | --- |\n| 手形 / 选择工具 | `H` / `V` |\n| 撤销 / 重做 | `Ctrl/Cmd + Z` / `Ctrl/Cmd + Shift + Z` |\n| 复制 / 粘贴 | `Ctrl/Cmd + C` / `Ctrl/Cmd + V` |\n| 原地复制 | `Ctrl/Cmd + D` |\n| 放大 / 缩小 | `Ctrl/Cmd + +`（或 `=`）/ `Ctrl/Cmd + -` |\n| 全选 / 退出选择 | `Ctrl/Cmd + A` / `Esc` |\n\n验证一次完整操作：插入一张图片，移动视野、缩放、复制图片，再撤销复制。若按键无效，先让焦点离开输入框，或直接使用工具栏。\n",j=`## 添加图片

本地图片可以用以下方式进入画布：按 \`Ctrl/Cmd + U\` 选择文件、点击图片按钮、直接拖入文件，或复制图片后按 \`Ctrl/Cmd + V\`。原画布支持 PNG、JPG、GIF、WebP 与 SVG；SVG 的后续编辑能力与位图不同。

打开素材库，选择已有素材也能插入。生成结果通常会进入素材库；若没有自动出现在画布上，到已完成任务中执行“插入到画布”。

## 添加文字与形状

按 \`T\` 后点击画布建立文本框，或者直接粘贴已复制的文字。形状内的说明可通过双击形状编辑。

从形状菜单选择类型，再点击建立默认形状或拖动指定尺寸。常用快捷键为 \`R\` 矩形、\`O\` 椭圆、\`A\` 箭头。详细样式见[形状工具](/docs/user-manual/drawing-shapes/)与[文本工具](/docs/user-manual/drawing-text/)。

## 添加图解内容

- 思维导图：按 \`M\` 手动建立，或使用主题描述、Markdown 大纲转换。
- 流程图：使用文字描述、Mermaid 转换，或用形状和箭头连接。
- AI 内容：生成后检查画布、任务队列和素材库三个位置，避免重复提交同一任务。

不同版本的工具入口可能位于更多工具或工具箱中，详见[思维导图](/docs/user-manual/drawing-mindmap/)与[流程图](/docs/user-manual/drawing-flowchart/)。

## 安排位置与布局

插入位置会受当前选择和已有内容影响：可能靠近选中对象、位于视野中心，或接在既有内容之后。想控制位置，可先选择目标区域附近的对象，插入后再调整。

选择元素后拖动移动，用方向键微调；边缘与角点用于改变尺寸，旋转手柄用于调整角度。多选后可以一起移动或对齐。

检查新内容是否完整、大小是否合适、有没有与旧内容重叠。看不到时先使用自适应视图；删除前确认选中对象。
`,M=`## 选择创建方式

自然语言适合先生成草稿，Mermaid 适合明确规定节点和连线，手动绘制适合微调布局。描述流程时写清起点、操作、判断与结束状态，例如“提交订单后校验库存；有货进入支付，无货返回修改”。

![原画布中的流程图演示](/user-manual/flowchart.gif)

## 使用 Mermaid

在工具箱中选择 Mermaid 转流程图，输入代码并转换。下面的例子包含两个判断出口：

\`\`\`mermaid
graph TD
  Start[提交申请] --> Check{材料齐全?}
  Check -->|是| Review[进入审核]
  Check -->|否| Fix[补充材料]
  Fix --> Check
  Review --> End[记录结果]
\`\`\`

检查箭头方向和判断标签，再按实际业务修改。这里展示的是可供工具转换的代码，不会在文档内自动执行。

## 手动绘制流程

1. 从形状工具建立节点：矩形表示操作，菱形表示判断，椭圆或圆角矩形表示起止，平行四边形表示输入输出。
2. 双击节点填写说明，保持短句和一致的命名方式。
3. 按 \`A\` 使用箭头，从起始节点拖到目标节点；需要拐弯时选择折线箭头。
4. 双击连线写“是”“否”等分支标签。拖动端点可改变连接位置。
5. 调整节点布局，确认连线仍然附着在节点上。

## 整理布局与验收

多选节点后使用左右、上下或居中对齐，再等距分布。重复结构可整体复制；把大流程拆为子流程往往更便于阅读。

| 快捷操作 | 按键 |
| --- | --- |
| 矩形 / 椭圆 / 箭头 | \`R\` / \`O\` / \`A\` |
| 回到选择工具 | \`V\` |
| 编辑节点文字 | 双击 |
| 删除对象 | \`Delete\` |

从入口沿每条分支走到出口，检查遗漏路径、死循环和无标签的判断。最后导出 PNG，查看文字和箭头是否清晰。
`,N=`## 建立导图

可以从一个主题开始，让 AI 拓展结构，再检查和修改节点；也可以完全手动建立。原画布的手动入口在“更多工具 → 思维导图”，快捷键为 \`M\`。点击画布建立根节点，填写中心主题。

![原画布中的思维导图演示](/user-manual/mindmap.gif)

若使用 AI，先写明主题、层级和用途，例如“为新员工整理产品入门路线，分为账号、创作、备份三个分支”。生成后核对每个分支是否符合实际，不要直接把生成结果当成已验证事实。

## 管理节点与分支

选择节点后，\`Tab\` 添加子节点，\`Enter\` 添加同级节点。双击修改文字，拖动改变位置；连接线会随布局调整。

节点旁的加减按钮可以折叠和展开分支。拖到另一节点上可调整父子关系，拖到空白处可形成独立根节点。复制节点会连同子分支复制；删除父节点也会删除下级内容，操作前确认范围。

| 动作 | 快捷键 |
| --- | --- |
| 新建导图工具 | \`M\` |
| 子节点 / 同级节点 | \`Tab\` / \`Enter\` |
| 编辑 / 删除 | 双击 / \`Delete\` |
| 复制 / 粘贴分支 | \`Ctrl/Cmd + C\` / \`Ctrl/Cmd + V\` |

## 从 Markdown 转换

在工具箱中寻找 Markdown 转思维导图，粘贴已有大纲后执行转换。标题和列表结构决定节点层级，可先使用简短大纲验证：

\`\`\`markdown
# 产品入门
## 账号
- 创建账号
- 检查权限
## 创作
- 准备参考素材
- 预览生成结果
\`\`\`

## 调整样式与导出

用节点色、文字色和边框区分分支，重点信息可单独着色。完成后折叠再展开，检查层级、文字与连接关系；使用 \`Ctrl/Cmd + Shift + E\` 导出 PNG 或 JPG。

GPT88 创作入口可参考[图片工作台](/docs/guides/agent-image-studio/)。本页的导图菜单来自原画布教程；使用其他工作台时，先确认有对应工具。
`,P="## 从一条线开始\n\n点击画笔图标或按 `P`。在画布上按住鼠标左键，拖出笔迹后松开；再次按下即可画下一条。\n\n## 选择笔触与样式\n\n展开画笔旁的小箭头，按用途选择：毛笔适合有粗细变化的笔迹，钢笔适合均匀轮廓，马克笔适合半透明标注。选定工具后，在工具栏调节颜色与粗细。\n\n先在空白区域画一条测试线，检查颜色、线宽和透明度，再绘制主体。设备是否支持压感取决于硬件与浏览器；按住 `Shift` 可尝试约束为直线。\n\n## 修正与复用\n\n使用橡皮擦图标或 `E` 擦除笔迹。若想移动整条线，按 `V` 选中，再拖动或用方向键调整。已画出的线条作为元素处理，可以复制、删除和撤销。\n\n| 操作 | 快捷键 |\n| --- | --- |\n| 画笔 / 钢笔 | `P` / `Shift + P` |\n| 橡皮擦 | `E` |\n| 选择 / 移动视野 | `V` / `H` |\n| 复制 / 粘贴 | `Ctrl/Cmd + C` / `Ctrl/Cmd + V` |\n| 删除选中线条 | `Delete` 或 `Backspace` |\n\n放大检查线条边缘，确认绘制结果，再按[导出指南](/docs/user-manual/advanced-export-import/)保存。需要反复使用的标注可先复制，保留一份原始版本。\n",F=`## 创建形状

在形状菜单选好类型后，点击画布生成默认大小，或拖动确定宽高。拖动时按住 \`Shift\` 可创建正方形或正圆。

基础类型包括矩形、椭圆、三角形和菱形；连接关系可用直线、双向或折线箭头。快捷键 \`R\`、\`O\`、\`A\` 分别对应矩形、椭圆与箭头。

## 修改尺寸和样式

选中形状后，拖动角点同时改变宽高，拖动边点改变单个方向；等比例缩放可尝试按住 \`Shift\`。拖动主体调整位置，方向键用于细调，上方手柄用于旋转。

在工具栏设置填充色、边框色与线宽。双击形状填写文字，文字通常在内部居中显示；复杂排版可另加文本框。

## 连接与组合

从起点形状向目标形状拖出箭头，使端点吸附在形状上。随后移动节点，检查连线是否跟随，避免看似连接但实际只是放在附近。

框选或按 \`Ctrl/Cmd\` 追加多个对象后，可组合为整体。对齐功能用来统一左边缘、中心或右边缘，等距分布用于保持间隔。

| 操作 | 快捷键 |
| --- | --- |
| 组合 / 取消组合 | \`Ctrl/Cmd + G\` / \`Ctrl/Cmd + Shift + G\` |
| 复制一份 | \`Ctrl/Cmd + D\` |
| 拖动复制 | 按住 \`Alt\` 再拖动 |

完成后移动一个连接节点、检查箭头和文字，再撤销测试操作。绘制业务流程时可继续阅读[流程图教程](/docs/user-manual/drawing-flowchart/)。
`,I="## 添加与编辑文字\n\n点击文本图标或按 `T`，在画布上点击建立文本框并输入。点击空白处或按 `Esc` 结束；再次双击文本框，或选中后按 `Enter`，进入编辑状态。\n\n复制其他应用的文字后，在画布按 `Ctrl/Cmd + V` 可以创建文本框。也可双击形状直接填写节点说明，用于图解或流程图。\n\n## 字体与排版\n\n选择文字后设置粗体、斜体、字体、字号、文字颜色和背景高亮。字体列表包含系统字体、艺术字体和等宽字体；可用项以当前环境为准。\n\n对齐方式包括左对齐、居中和右对齐。通过调整文本框宽度控制自动换行，使用 `Enter` 主动分段。不要用增加空格代替布局对齐。\n\n原手册特别说明：`Ctrl/Cmd + U` 用于插入图片，并非下划线快捷键。格式修改优先使用工具栏中明确显示的按钮。\n\n## 操作文本框\n\n先退出文字编辑，再拖动文本框整体移动；方向键可微调位置。边缘控制点改变框尺寸，上方手柄用于旋转。选中框后按 `Delete` 或 `Backspace` 删除。\n\n| 场景 | 快捷键 |\n| --- | --- |\n| 切换文本工具 | `T` |\n| 开始编辑 / 换行 | `Enter` |\n| 结束编辑 | `Esc` |\n| 编辑状态下全选文字 | `Ctrl/Cmd + A` |\n| 复制 / 粘贴 | `Ctrl/Cmd + C` / `Ctrl/Cmd + V` |\n\n检查长标题是否越出文本框、换行是否合理、图形内文字是否被遮挡。导出后再预览一次，确认字体与字号满足阅读需求。\n";function L(){return h}function R(e){return h.find(t=>t.slug===e)}var z=u(),B=Object.assign({"../../data/user-manual/advanced-command-palette.md":g,"../../data/user-manual/advanced-export-import.md":_,"../../data/user-manual/advanced-image-preview-edit.md":v,"../../data/user-manual/advanced-knowledge-base.md":y,"../../data/user-manual/advanced-media-library.md":b,"../../data/user-manual/advanced-settings.md":x,"../../data/user-manual/advanced-task-queue.md":S,"../../data/user-manual/advanced-toolbox.md":C,"../../data/user-manual/advanced-troubleshooting.md":w,"../../data/user-manual/ai-generation-image-generation.md":T,"../../data/user-manual/ai-generation-image-split.md":E,"../../data/user-manual/ai-generation-inspiration-board.md":D,"../../data/user-manual/ai-generation-video-generation.md":O,"../../data/user-manual/api-configuration.md":k,"../../data/user-manual/basics-canvas-navigation.md":A,"../../data/user-manual/basics-insert-content.md":j,"../../data/user-manual/drawing-flowchart.md":M,"../../data/user-manual/drawing-mindmap.md":N,"../../data/user-manual/drawing-pencil-tool.md":P,"../../data/user-manual/drawing-shapes.md":F,"../../data/user-manual/drawing-text.md":I});function V(e){return e.slug===`api-configuration`?B[`../../data/user-manual/api-configuration.md`]??``:B[`../../data/user-manual/${e.sourcePage.replace(/\.html$/,`.md`)}`]??``}function H(e){return e.toLowerCase().trim().replace(/[`*_~]/g,``).replace(/[^\p{L}\p{N}]+/gu,`-`).replace(/^-+|-+$/g,``)||`section`}function U(e){return typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(U).join(``):e&&typeof e==`object`&&`props`in e?U(e.props?.children):``}function W(e){let t=new Map,n=[],r=!1;for(let i of e.split(/\r?\n/)){if(/^\s*(```|~~~)/.test(i)){r=!r;continue}if(r)continue;let e=i.match(/^(#{2,3})\s+(.+)$/);if(!e)continue;let a=e[2].replace(/[`*_~]/g,``).replace(/!\[([^\]]*)\]\([^)]*\)/g,`$1`).replace(/\[([^\]]+)\]\([^)]*\)/g,`$1`).trim(),o=H(a),s=t.get(o)??0;t.set(o,s+1),n.push({id:s===0?o:`${o}-${s+1}`,text:a,level:e[1].length})}return n}function G({markdown:e}){let t=new Map,n=e=>{let n=H(U(e)),r=t.get(n)??0;return t.set(n,r+1),r===0?n:`${n}-${r+1}`};return(0,z.jsx)(`div`,{className:`prose prose-invert min-w-0 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-base prose-h3:mt-8 prose-p:text-ink-200 prose-p:leading-7 prose-a:text-violet-300 hover:prose-a:text-violet-200 prose-strong:text-ink-50 prose-code:text-violet-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-li:text-ink-200 prose-table:text-[13px] prose-th:bg-white/[0.03] prose-th:font-medium`,children:(0,z.jsx)(c,{remarkPlugins:[s],rehypePlugins:[l],components:{h2:({children:e})=>(0,z.jsx)(`h2`,{id:n(e),children:e}),h3:({children:e})=>(0,z.jsx)(`h3`,{id:n(e),children:e}),a:({href:e=``,children:t})=>e.startsWith(`/`)?(0,z.jsx)(d,{to:e,children:t}):(0,z.jsx)(`a`,{href:e,target:`_blank`,rel:`noopener noreferrer`,children:t}),img:({alt:e=``,src:t=``,title:n})=>(0,z.jsx)(`img`,{src:t,alt:e,title:n,loading:`lazy`,decoding:`async`,className:`my-6 h-auto max-w-full rounded-xl border border-white/10`})},children:e})})}var K={接入与画布入门:n,绘图与图解:e,"AI 创作":i,进阶与管理:o};function q(){let e=L(),o=[...new Set(e.map(e=>e.group))];return(0,z.jsxs)(m,{path:`/docs/user-manual/`,title:`OpenTu 用户手册`,description:`GPT88 OpenTu 工作台的 21 篇操作教程：API 配置、画布、绘图、AI 创作与进阶管理。`,headings:o.map(e=>({id:H(e),text:e,level:2})),children:[(0,z.jsx)(`div`,{className:`not-prose mb-8 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] p-5 sm:p-6`,children:(0,z.jsxs)(`div`,{className:`flex flex-wrap items-start justify-between gap-4`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300`,children:[(0,z.jsx)(t,{className:`h-4 w-4`}),`重点入口 · 21 篇教程`]}),(0,z.jsx)(`h2`,{className:`mt-3 text-2xl font-semibold text-ink-50`,children:`在 GPT88 OpenTu 工作台完成创作`}),(0,z.jsx)(`p`,{className:`mt-2 max-w-2xl text-sm leading-6 text-ink-300`,children:`从 API 配置、画布操作到图片、视频和知识库管理，按任务选择教程。产品入口与教程对应的是 GPT88 的 OpenTu 工作台。`})]}),(0,z.jsxs)(`a`,{href:`https://agent.gpt88.cc/opentu`,target:`_blank`,rel:`noreferrer`,className:`inline-flex shrink-0 items-center gap-2 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-cyan-200`,children:[`打开 OpenTu `,(0,z.jsx)(a,{className:`h-4 w-4`})]})]})}),(0,z.jsxs)(`div`,{className:`not-prose mb-10 grid gap-3 sm:grid-cols-3`,children:[(0,z.jsxs)(d,{to:`/docs/user-manual/api-configuration/`,className:`rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50`,children:[(0,z.jsx)(n,{className:`h-5 w-5 text-violet-300`}),(0,z.jsx)(`div`,{className:`mt-2 font-semibold text-ink-50`,children:`先配置 API`}),(0,z.jsx)(`p`,{className:`mt-1 text-sm text-ink-300`,children:`创建 Key、加载模型、完成首次生成`})]}),(0,z.jsxs)(d,{to:`/docs/user-manual/ai-generation-image-generation/`,className:`rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50`,children:[(0,z.jsx)(i,{className:`h-5 w-5 text-violet-300`}),(0,z.jsx)(`div`,{className:`mt-2 font-semibold text-ink-50`,children:`开始 AI 创作`}),(0,z.jsx)(`p`,{className:`mt-1 text-sm text-ink-300`,children:`提示词、参考图、批量与 Agent`})]}),(0,z.jsxs)(d,{to:`/docs/guides/agent-image-studio/`,className:`rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-4 hover:border-violet-400/50`,children:[(0,z.jsx)(r,{className:`h-5 w-5 text-violet-300`}),(0,z.jsx)(`div`,{className:`mt-2 font-semibold text-ink-50`,children:`看 GPT88 工作台指南`}),(0,z.jsx)(`p`,{className:`mt-1 text-sm text-ink-300`,children:`了解 agent.gpt88.cc 的图片工作流`})]})]}),o.map(n=>{let i=K[n]??t;return(0,z.jsxs)(`section`,{className:`not-prose mb-10`,children:[(0,z.jsxs)(`h2`,{id:H(n),className:`mb-3 flex items-center gap-2 text-sm font-semibold text-ink-100`,children:[(0,z.jsx)(i,{className:`h-4 w-4 text-cyan-300`}),n]}),(0,z.jsx)(`div`,{className:`grid gap-3 md:grid-cols-2`,children:e.filter(e=>e.group===n).map(e=>(0,z.jsxs)(d,{to:`/docs/user-manual/${e.slug}/`,className:`group rounded-lg border border-white/5 bg-white/[0.02] p-4 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]`,children:[(0,z.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,z.jsx)(`h3`,{className:`font-medium text-ink-50 group-hover:text-cyan-200`,children:e.title}),(0,z.jsx)(r,{className:`mt-0.5 h-4 w-4 shrink-0 text-ink-500 group-hover:text-cyan-300`})]}),(0,z.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-ink-300`,children:e.description})]},e.slug))})]},n)}),(0,z.jsxs)(`div`,{className:`not-prose mt-12 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm leading-6 text-ink-400`,children:[`本手册根据 OpenTu 用户手册整理。原画布界面的截图和菜单名称可能随版本变化；GPT88 的接入地址、模型权限、计费和当前工作台功能，以 `,(0,z.jsx)(`a`,{href:`https://agent.gpt88.cc/opentu`,target:`_blank`,rel:`noreferrer`,className:`text-cyan-300 hover:text-cyan-200`,children:`OpenTu 工作台`}),`与对应 API 文档为准。`]})]})}function J(){let{slug:e}=f();if(!e)return(0,z.jsx)(q,{});let t=R(e);if(!t)return(0,z.jsx)(p,{});let n=V(t);return(0,z.jsxs)(m,{path:`/docs/user-manual/${t.slug}/`,title:t.title,description:t.description,headings:W(n),children:[(0,z.jsxs)(`div`,{className:`not-prose mb-7 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3 text-sm`,children:[(0,z.jsx)(`span`,{className:`text-ink-200`,children:`按本页步骤操作时，可直接在 GPT88 OpenTu 工作台完成创作。`}),(0,z.jsxs)(`a`,{href:`https://agent.gpt88.cc/opentu`,target:`_blank`,rel:`noreferrer`,className:`inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200`,children:[`打开 OpenTu `,(0,z.jsx)(a,{className:`h-3.5 w-3.5`})]})]}),(0,z.jsx)(G,{markdown:n})]})}export{J as default};