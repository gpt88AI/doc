---
title: AI پروڈکٹ تصاویر میں ایک ہی پروڈکٹ کو مستقل رکھنے کا عملی QC طریقہ
description: پہلے اصل SKU کو lock کریں، پھر صرف منظر تبدیل کریں۔ reference package، lock/allow-change matrix، six-frame stress test اور per-image QC سے شکل، رنگ، متن اور variants کی غلطیاں کم کریں۔
date: 2026-07-28
category: امیج جنریشن
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

متعدد AI product photos میں ایک ہی پروڈکٹ برقرار رکھنے کا پہلا قدم prompt کو بار بار بدلنا نہیں، بلکہ اصل SKU کا reference package بنانا ہے۔ دو فہرستیں لکھیں: “کبھی نہ بدلے” اور “بدل سکتا ہے”۔ ہر تصویر کو اصل تصویر کے ساتھ ملائیں۔ شکل، parts، packaging text، Logo، رنگ یا specification کی غلطی aesthetic مسئلہ نہیں بلکہ product-fact مسئلہ ہے۔

عملی ترتیب یہ ہے: موجودہ اور مجاز تصاویر سے ground truth بنائیں، product identity lock کریں، صرف scene، props، lighting اور crop کھولیں، پہلے چھ فریم کا stress test کریں، پھر ہر تصویر پر ایک ہی QC table لگائیں۔ Reference images مدد دیتی ہیں مگر auto-replication کی ضمانت نہیں۔ fixed prompt یا seed بھی SKU کی درستگی ثابت نہیں کرتے۔

## Product identity اور visual style الگ رکھیں

| پہلو | جسے lock کرنا ہے | جو بدل سکتا ہے | عام خرابی |
| --- | --- | --- | --- |
| Product identity | silhouette، parts، label، color، material، variant | وہ angle جسے حقیقی data support کرے | cap/port بدلنا، غلط رنگ یا capacity |
| Visual style | campaign کا مجموعی انداز | background، props، light، composition | مختلف shadows یا product scale |

ایک set style میں یکساں ہو کر بھی غلط پروڈکٹ دکھا سکتا ہے۔ پہلے product facts درست رکھیں، پھر خوبصورتی اور campaign cohesion دیکھیں۔

## حقیقی reference package بنائیں

ہر SKU کے لیے صاف hero image، side/back/top/bottom angles، Logo اور labels کے close-ups، SKU fact card اور channel delivery table رکھیں۔ ایک front photo صرف front ثابت کرتی ہے؛ back یا open state کا data نہ ہو تو AI اندازہ لگائے گا۔ پرانی packaging، مختلف colors/capacities، bundles اور single items الگ کریں۔ نامعلوم ماخذ یا غیر مجاز assets ہٹا دیں۔

## Lock / Allow-change matrix لکھیں

مثلاً frosted-white 50 mL serum bottle میں silhouette، silver pump، clear cap، label، color، material اور 50 mL specification lock ہوں۔ background، props، lighting اور frame crop بدل سکتے ہیں۔ Acceptance method بھی لکھیں: same-angle photo سے silhouette overlay، parts گننا، label کو حرف بہ حرف پڑھنا اور material reflections کا موازنہ کرنا۔

## ایک universal prompt کے بجائے modular prompt

Prompt کو product lock، allowed changes، scene task، camera/lighting، forbidden changes اور acceptance conditions میں تقسیم کریں۔ اصل reference کے مطابق silhouette، pump، cap، label، material اور 50 mL برقرار رکھیں؛ صرف background، surface، props، light اور crop بدلیں؛ نیا part، text، color، material یا غیر دکھایا گیا back structure نہ بنائیں۔ یہ guarantee نہیں، مگر failure کو debug کرنے کے قابل بناتا ہے۔

## GPT88 میں پہلے چھوٹا controlled test

ایک current SKU، ضروری angles اور modular prompt سے چند candidates بنائیں۔ اصل تصویر کے ساتھ side-by-side دیکھ کر pass، hard error، local fix اور uncertain items لکھیں۔ hard product errors موجود ہوں تو پوری batch شروع نہ کریں۔ اگر صرف background بدلنا ہو اور real product pixels محفوظ رہ سکتے ہوں تو full regeneration کے بجائے local editing route لیں۔

## چھ فریم کا stress test

Clean hero، same-angle scene، label close crop، high-contrast scene، mobile tight crop اور ad whitespace version بنائیں۔ اس سے silhouette، parts، text، material، crop safety اور decoration drift سامنے آتے ہیں۔ جس angle کی حقیقی reference نہ ہو اسے AI سے نہ گھڑوائیں؛ reshoot یا trusted 3D asset استعمال کریں۔

## Per-image QC: پہلے hard errors

| جانچ | Pass condition |
| --- | --- |
| Geometry | silhouette اور proportions reference سے ملیں |
| Parts | count، position اور connections درست ہوں |
| Text/Logo | ہر حرف اور unit پڑھنے کے قابل ہو |
| Variant | color، capacity اور bundle درست SKU کے ہوں |
| Material | metal، glass، frost اور transparency حقیقی لگیں |
| Context | props/ہاتھ/جگہ کے ساتھ scale معقول ہو |
| Export | channel ratio، crop اور mobile clarity درست ہو |

مخلوط زبان کی packaging میں numbers، units، `0/O`، `1/I` اور regulatory text انسان سے پڑھوائیں۔ OCR صرف مشتبہ جگہیں دکھا سکتا ہے؛ human review کا بدل نہیں۔

## فیصلہ Pass / Fix / Change Route میں لکھیں

**Pass** تب جب product facts اصل reference سے ملیں اور channel export درست ہو۔ **Fix** صرف crop، background، shadow یا whitespace جیسے مقامی اور قابلِ تصدیق مسئلے پر کریں؛ product identity دوبارہ نہ بنائیں۔ **Change Route** تب لیں جب angle data غائب ہو، text بار بار خراب ہو یا geometry drift کرے؛ real pixels، compositing، 3D یا professional retouching زیادہ قابلِ اعتماد ہو سکتے ہیں۔

## FAQ

### کیا ایک ہی prompt اور seed product کو مستقل رکھیں گے؟

نہیں۔ یہ generation conditions دہرا سکتے ہیں، مگر shape، label، material یا parts کی درستگی ثابت نہیں کرتے۔

### کیا ایک front photo سے back اور sides بن سکتے ہیں؟

قابلِ اعتماد product evidence کے طور پر نہیں۔ missing angle کو reshoot یا trusted 3D سے دیں۔

### کیا style consistency، product consistency کے برابر ہے؟

نہیں۔ ایک جیسے background کے باوجود SKU غلط ہو سکتا ہے۔

### Packaging text خراب ہو تو بار بار regenerate کریں؟

نہیں۔ readable text کے لیے real label pixels، compositing یا retouching route استعمال کریں۔

### چھ فریم pass ہوں تو batch شروع کر دیں؟

یہ diagnostic gate ہے، guarantee نہیں۔ channel rules اور per-image QC جاری رکھیں۔
