---
title: متعدد AI تصاویر میں ایک ہی کردار برقرار رکھنے کا چار شاٹ consistency طریقہ
description: پہلے چہرہ، hairstyle، جسم، لباس اور art style کو lock کریں، پھر neutral portrait، side/full-body، action اور controlled scene کے چار shots سے consistency جانچیں۔
date: 2026-07-28
category: امیج جنریشن
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

ایک ہی character کی کئی AI تصاویر بنانے کے لیے پہلے شاندار نتیجے کے پیچھے نہ بھاگیں۔ پہلے طے کریں کہ کن خصوصیات کے بدلنے سے ناظر اسے دوسرا شخص سمجھے گا، پھر بڑھتی مشکل کے چار shots آزمائیں: neutral portrait، side یا full-body، dynamic action اور controlled scene۔

## “وہی character” کس چیز کو کہتے ہیں

Face structure، hairstyle silhouette، body proportions، clothing/props اور visual language الگ الگ drift کر سکتے ہیں۔ صرف چہرہ ملنا کافی نہیں؛ side profile کا nose bridge، full-body کا head-to-body ratio یا signature coat کا رنگ بدل جائے تو character بدل گیا۔ پہلے “must not change” اور “may change” لکھیں۔

## Reference images کا کردار

ایک صاف، neutral اور evenly lit تصویر کو approved identity anchor بنائیں۔ اضافی references صرف missing angles بھریں: side view ناک اور سر کے پچھلے contour کے لیے، full-body تناسب اور لباس کے لیے، close-up چھوٹے prop یا text کے لیے۔ ہر image کا role مقرر کریں۔ متضاد references consistency بڑھانے کے بجائے face swap اور detail shuffle کر سکتی ہیں۔ حساس افراد، unpublished IP یا client drafts کے لیے visibility، retention، training اور commercial terms پہلے دیکھیں۔

## مختصر Character Lock Block

لمبی adjectives کے بجائے قابلِ مشاہدہ facts لکھیں: oval face، wide-set eyes، بائیں brow کے قریب mole، dark-brown chin-length bob، تقریباً 7.5 heads tall، dark-green cloak، brass buttons، brown mail bag اور soft picture-book style۔ الگ لکھیں کہ expression، pose، camera، background اور weather بدل سکتے ہیں۔ Reject conditions بھی درج کریں: mole غائب ہو، bob لمبا ہو، cloak نیلا ہو، buttons square ہوں، bag دوسری طرف چلا جائے یا output photoreal بن جائے۔

## چار shots سے consistency چیک کریں

1. **Neutral portrait:** simple background اور صاف روشنی میں face، hairline، color اور accessories دیکھیں۔ یہ fail ہو تو action پر نہ جائیں۔
2. **Side یا full-body:** project کی ضرورت کے مطابق چنیں۔ silhouette، shoulders، waist، hem اور prop position بھی چیک کریں۔
3. **Dynamic action:** running، bending، sword swing یا turning جیسی حقیقی action لیں۔ occlusion اور perspective اصل دباؤ ہیں۔
4. **Controlled scene/style pressure:** ایک وقت میں ایک بڑا variable بدلیں۔ text، logo، seal یا badge ہو تو final display size پر readability دیکھیں۔

## Four-Shot Acceptance Record

Anchor file، reference version، locked features، allowed changes، hardest shot اور unified check size لکھیں۔ ہر shot میں face، body، hairstyle، clothing/props اور visual language کو pass/fail اور symptom کے ساتھ درج کریں۔ Overall فیصلہ `pass / fix / switch route` رکھیں۔ failed images کو symptom سے نام دیں، مثلاً “side-profile nose bridge لمبا”۔

## Failure کے بعد صرف ایک minimal retry

ایک retry میں ایک بڑا variable بدلیں: side drift پر clearer side reference، body drift پر full-body reference، back-hair error پر صرف back contour reference۔ لباس کے text یا badge کے لیے پہلے text کے بغیر frame بنائیں اور deterministic typesetting post-production میں رکھیں۔ دو characters کے frame میں پہلے دونوں کو الگ الگ چار shots پاس کرائیں۔ ایک retry کے بعد بھی وہی dimension fail ہو تو blind reroll بند کریں اور dedicated character feature، filtered training، split post-production یا manual retouching چنیں۔

## References، character features اور training routes

Plain prompt + reference چھوٹے concept set کے لیے مناسب ہے، مگر ہر generation identity کو دوبارہ interpret کر سکتی ہے۔ Dedicated character feature زیادہ scenes اور poses میں مدد دے سکتی ہے، مگر feature کا نام result کی guarantee نہیں۔ Training route high-volume serials میں مفید ہو سکتا ہے، مگر data quality، cost، rights، privacy اور baked-in errors کا خطرہ رکھتا ہے۔ route کا فیصلہ سب سے مشکل required shot سے کریں، سب سے خوبصورت portrait سے نہیں۔

## FAQ

### کیا fixed seed ہمیشہ وہی character دے گا؟

نہیں۔ seed conditions دہرا سکتا ہے، مکمل identity نہیں۔

### کیا ایک character sheet کافی ہے؟

نہیں۔ side، full-body اور action shots الگ failure دکھا سکتے ہیں۔

### کیا LoRA ہمیشہ reference image سے زیادہ stable ہے؟

نہیں۔ training material اور configuration پر منحصر ہے۔

### دو characters میں face swap کیسے روکیں؟

دونوں کو الگ الگ چار shots میں پاس کرائیں، الگ lock blocks رکھیں، پھر two-person composition آزمائیں۔

### Stills پاس ہوں تو video بھی consistent ہوگا؟

ضروری نہیں۔ motion اور frame-to-frame identity کا الگ test چاہیے۔

آخری سوال: project کا سب سے مشکل shot پاس ہوا یا صرف frontal portrait خوبصورت دکھ رہا ہے؟
