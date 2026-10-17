---
title: "用自己的写作数据微调 Qwen2.5-1.5B：一份 LoRA 实验指南"
description: "整理雪瑜分享的 Qwen2.5-1.5B-Instruct 本地 LoRA 微调教程，覆盖数据清洗、MLX 环境、训练配置、评估、Adapter 融合和实验边界。"
date: 2026-10-16
category: "AI 实践"
tags:
  - "Qwen"
  - "LoRA"
  - "模型微调"
  - "本地模型"
  - "MLX"
readTime: 11
---

把一个通用模型调整成更像自己的写作风格，不一定要从头训练模型。一个更容易上手的实验路径是：选择已经完成指令微调的开源模型，准备自己的高质量文本，使用 LoRA 训练一个体积较小的 Adapter，再用固定测试题比较训练前后的输出。

本文整理自雪瑜（[@xueyu1125](https://x.com/xueyu1125)）于 2026 年 10 月 16 日发布的 [原始 X 帖子](https://x.com/xueyu1125/status/2111023511603188071) 及其关联文章《从1到2训练一个自己的大模型教程》。原文使用 Qwen2.5-1.5B-Instruct、Apple 芯片上的 MLX 和 LoRA，目标是让模型学习作者自己的表达习惯。下面保留其技术路线和关键参数，并补充数据治理、评估和发布边界。命令和版本是原文实验记录，不代表所有机器都能直接复现。

## 这类微调解决什么问题

通用模型知道很多知识，却不知道你的固定表达方式、常用开头、句子节奏和内容取舍。Skill 或检索可以补充外部知识，LoRA 微调更适合调整模型在既有能力上的表达倾向。

这里的目标不是让小模型重新学习语言，而是在基础模型上增加一个风格适配层。数据量不大时，结果更应该理解为一次个人实验：它可能让输出更接近训练样本，也可能把某些口头禅、格式或错误一起学进去。

## 实验组件

原文采用以下组合：

| 组件 | 作用 |
| --- | --- |
| Qwen2.5-1.5B-Instruct | 已完成指令微调的基础模型 |
| LoRA | 只训练一组低秩适配参数，减少显存和存储开销 |
| MLX / `mlx-lm` | 在 Apple 芯片上运行和训练模型 |
| `uv` | 创建隔离的 Python 环境并锁定依赖 |
| train / valid / test | 分别用于训练、调参观察和最终评估 |

## 1. 准备隔离环境

原文把项目放在独立目录中，用 `uv` 管理环境和依赖。一个最小的项目骨架可以是：

```bash
mkdir -p ~/Develop/AI/Qwen2.5-1.5B-X
cd ~/Develop/AI/Qwen2.5-1.5B-X
mkdir -p raw data configs adapters models outputs scripts
uv init
uv add "mlx-lm[train]>=0.32.0" "huggingface-hub>=2.2.0" "pyyaml>=6.0.3"
```

如果使用 Apple Silicon，可先确认 MLX 能识别 Metal：

```bash
python -c "import mlx.core as mx; print('Metal:', mx.metal.is_available())"
```

输出 `Metal: True` 只说明运行时识别到了 GPU，不等于训练一定会稳定或足够快。首次实验应先用很小的步数验证环境、路径和数据格式。

## 2. 下载基础模型并做冒烟测试

模型文件应从官方模型仓库或组织明确提供的镜像获取，并记录模型版本、文件校验和许可证。原文使用 Qwen2.5-1.5B-Instruct，并把基础权重放在 `models/` 下。

下载完成后，先用基础模型生成一条短文本，确认模型可以正常加载，再开始训练。这个步骤可以把“模型下载问题”和“训练配置问题”分开，减少排查范围。

不要把 Hugging Face 登录令牌、X 导出的原始文件或个人数据写进仓库、截图和公开文章。登录命令只应在本机终端执行，并使用环境变量或凭证管理工具保存令牌。

## 3. 整理自己的数据

原文的数据来源是 X 的历史发帖记录，先放在 `raw/`，再清洗成训练数据。建议把原始数据、清洗脚本和最终 JSONL 分开保存：

```text
raw/                 原始导出文件，只保留在受控本地目录
data/train.jsonl     训练集
data/valid.jsonl     验证集
data/test.jsonl      测试集
scripts/             清洗和转换脚本
```

每条样本至少应包含一个输入和一个目标回答。训练前要去掉私信、邮箱、电话号码、访问令牌、未公开项目内容和不希望模型复述的个人信息。还要删除重复转发、过短文本、明显错误和与目标风格无关的内容。

数据质量比数据数量更重要。原文的实验集规模约为数百条，并强调训练集、验证集和测试集要分开。测试集不能在训练过程中反复修改，否则最后的指标会失去参考意义。

## 4. 配置 LoRA

原文的核心配置如下，适合作为一个小规模实验的起点：

```yaml
model: "./models/Qwen2.5-1.5B-Instruct"
train: true
fine_tune_type: lora
optimizer: adamw
data: "./data"
seed: 42
num_layers: 16
batch_size: 1
grad_accumulation_steps: 4
iters: 600
val_batches: -1
learning_rate: 0.00002
steps_per_report: 10
steps_per_eval: 50
save_every: 100
max_seq_length: 2048
grad_checkpoint: false
mask_prompt: true
adapter_path: "./adapters/qwen25-x-writer-v1"

lora_parameters:
  keys: ["self_attn.q_proj", "self_attn.v_proj"]
  rank: 8
  scale: 16.0
  dropout: 0.05
```

几个配置值得特别注意：`num_layers: 16` 表示只在最后一部分层上加 LoRA；`rank: 8` 控制适配器容量；`mask_prompt: true` 让损失主要计算 assistant 回答；`max_seq_length: 2048` 会截断超长样本。`iters: 600` 是原文实验值，不是通用答案，数据量变化后应重新估算。

## 5. 先做 20 步，再跑正式训练

第一次不要直接运行完整训练。复制一份配置，把 `iters` 调到 20，并使用独立的 `adapter_path` 做冒烟测试：

```bash
mlx_lm.lora --config configs/qwen25-15b-lora-smoke.yaml
```

确认数据被读取、loss 能输出、checkpoint 能写入后，再运行正式配置：

```bash
mlx_lm.lora --config configs/qwen25-15b-lora.yaml
```

训练日志里的 `train_loss` 只能说明模型对训练目标的拟合程度。原文记录了验证 loss 在约 450 步后趋于稳定，并用未参与训练的测试集进一步确认结果。具体数值会随着数据清洗、硬件、版本和随机种子变化，不能直接当成其他项目的基准。

## 6. 用固定方法比较训练前后

训练结束后，应使用相同的 system prompt、相同的问题、相同的采样参数，分别加载基础模型和 Adapter，做成并排样本。重点看：

1. 语气是否更接近目标作者，而不是只重复训练集原句。
2. 事实、指令遵循和格式能力是否保持。
3. 未见过的题目上是否仍然稳定。
4. 是否出现口头禅过度重复、内容变短、模板化或事实错误。

loss 和 perplexity 是辅助信号，不等于文章质量。真正要发布的模型，至少要有一组固定回归题和人工抽检记录。若风格变强但基础能力明显下降，应减少训练步数、降低学习率、清理数据或缩小 LoRA 范围。

## 7. 先保留 Adapter，再决定是否融合

LoRA 训练得到的是 Adapter，不是一个全新的完整模型。原文建议先保留 Adapter，确认效果后再融合：

```bash
mlx_lm.fuse \
  --model ./models/Qwen2.5-1.5B-Instruct \
  --adapter-path ./adapters/qwen25-x-writer-v1 \
  --save-path ./models/Qwen2.5-1.5B-X-Writer-v1
```

实验归档至少应包含基础模型版本、Adapter、配置文件、数据版本、清洗脚本、依赖锁文件和评估样本。融合模型只是更方便加载的产物，不应覆盖或删除可回退的 Adapter。

## 适合把这套流程用在哪里

它适合做个人写作风格实验、内部草稿辅助、格式控制和本地模型学习。它不适合在没有数据授权的情况下收集他人内容，也不适合把含有客户机密、私信或凭证的原始导出直接送进训练。

如果目标是知识问答，优先考虑检索增强和结构化知识库；如果目标是稳定的业务输出，还需要独立的事实校验、内容审核、版本回滚和隐私处理。LoRA 只是调整模型的一种手段，不会自动解决数据治理和产品安全问题。

## 来源与边界

本文整理自 [雪瑜的原始 X 帖子](https://x.com/xueyu1125/status/2111023511603188071) 及关联文章《从1到2训练一个自己的大模型教程》，原帖发布于 2026-10-16。Qwen、MLX、`mlx-lm`、Hugging Face 和各模型仓库的版本、许可和命令可能变化，使用前请查阅当前官方文档与模型卡。本文中的参数、目录和命令用于解释原文实验路径，不构成对训练效果的保证，也不应替代对数据授权、隐私和发布风险的审查。
