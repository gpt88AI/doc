---
title: GPT Image 2 හට CSV/Excel සෘජුව ගත නොහැක: නිවැරදි Spreadsheet-to-Image Workflow
description: CSV සහ Excel මුලින් parse සහ validate කර visual brief හෝ structured payload එකක් ලෙස GPT Image 2 වෙත යවන ආකාරය.
date: 2026-05-12
category: තාක්ෂණික නිබන්ධනය
tags: [GPT Image 2, CSV, Excel, OpenAI API, AI Image Workflow]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

GPT Image 2 Image API වෙත `.csv` හෝ `.xlsx` සෘජු image-generation input එකක් ලෙස යවන්න එපා. Spreadsheet එක මුලින් data-processing ගැටලුවකි: fields කියවන්න, semantics තහවුරු කරන්න, rows/columns filter කරන්න, metrics ගණනය කරන්න සහ image එකෙන් පෙන්විය යුතු conclusion එක තීරණය කරන්න. ඉන්පසු prompt, visual brief, chart screenshot හෝ structured payload එක image generation වෙත යවන්න.

## Spreadsheet එකේ භූමිකාව තීරණය කරන්න

CSV/Excel එක data source එකක්, existing chart එකක source එකක් හෝ final deliverable එකේ කොටසක් විය හැක. Calculation, filtering, grouping, deduplication, unit conversion හෝ business interpretation ඉතිරිව තිබේ නම් file එක image stage එකේ නැත. Manual route සඳහා ChatGPT data analysis භාවිත කරන්න; production route එකේ code මඟින් fields, dates, currency, nulls සහ privacy columns validate කරන්න.

## Manual සහ Developer Workflow

පළමුව file analysis මඟින් trends, භාවිත කළ rows/columns, calculation method සහ image constraints සොයන්න. පසුව title, exact numbers, chart type, layout සහ “invent නොකළ යුතු දේ” ඇතුළත් visual brief එකක් සාදන්න. Developer route එකේ spreadsheet parse, required field/type/unit/date/row validation, කෙටි visual payload, brief සහ අවසානයේ GPT Image 2 call තබන්න. සම්පූර්ණ table එක prompt එකට paste නොකරන්න.

Payload එකේ `visual_type`, `must_show`, `layout` සහ `do_not_invent` වැනි පැහැදිලි fields තබන්න. සෑම output එකක්ම source file, processing version, prompt version, response ID සහ review result සමඟ trace කරන්න. Batch එකේ සෑම image එකකටම වෙනම payload භාවිත කරන්න.

## Screenshot, Privacy සහ Failures

Chart එකක් පමණක් redesign කිරීමට නම් clean PNG/JPG export කරන්න; sheet tabs, menus, row numbers, scrollbars සහ අනවශ්‍ය කොටස් crop කරන්න. Labels, numbers, units, order සහ missing/extra rows source එකට සසඳා review කරන්න. Customer names, sales amounts හෝ private medical/legal fields මුලින් ඉවත් හෝ aggregate කරන්න.

සාමාන්‍ය වැරදි වන්නේ workbook `file_id` එක image reference ලෙස සැලකීම, raw rows දිග prompt එකකට දැමීම, GPT Image 2 වෙතින් PPTX/PDF/XLSX output බලාපොරොත්තු වීම, numeric review අතහැරීම සහ සම්පූර්ණ Excel screenshot එකෙන් සෑම cell එකක්ම කියවනු ඇතැයි සිතීමයි. නිවැරදි අනුපිළිවෙළ: **parse → validate → filter/aggregate → visual payload → generation → review → assembly**.

## FAQ

### CSV සෘජුව ගත හැකිද?

නැත. මුලින් parse හෝ review කර conclusion සහ exact numbers prompt හෝ brief එකට දෙන්න.

### Responses API එකට file සහ image generation එකම flow එකක තැබිය හැකිද?

ඔව්, application flow එකක; නමුත් file තේරුම් ගැනීම surrounding logic එකේ කාර්යය වන අතර final image step එකට prompt හෝ visual instructions අවශ්‍යය.

### GPT Image 2 PPTX/PDF/XLSX නිර්මාණය කරයිද?

නැත, image data ලබා දෙයි. Office output සඳහා පසුව document හෝ slide layer භාවිත කරන්න.

## Further Reading

- [Google Image Generation API](/docs/api/images/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
