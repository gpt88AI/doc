#!/usr/bin/env python3
"""Fetch and migrate the remaining YingTu Chinese blog posts into GPT88 docs.

This is intentionally kept as a reproducible migration utility. It skips posts
that already exist, converts the source article HTML with pandoc, and applies
the GPT88 rebranding rules from src/data/blog/REBRANDING.md.
"""

from __future__ import annotations

import html
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "src/data/blog/posts"
SITEMAP = Path("/tmp/yingtu-sitemap.xml")
SOURCE_ROOT = "https://yingtu.ai/zh/blog/"
OFFICIAL_DOMAINS = (
    "openai.com",
    "ai.google.dev",
    "aistudio.google.com",
    "cloud.google.com",
    "docs.cloud.google.com",
    "support.google.com",
    "firebase.google.com",
    "anthropic.com",
    "docs.anthropic.com",
    "midjourney.com",
    "huggingface.co",
    "github.com",
)


def fetch(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "GPT88-docs-blog-migration/1.0",
            "Accept-Language": "zh-CN,zh;q=0.9",
        },
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read().decode("utf-8", "replace")


def meta_content(soup: BeautifulSoup, name: str) -> str:
    tag = soup.find("meta", attrs={"name": name})
    return (tag.get("content") or "").strip() if tag else ""


def property_content(soup: BeautifulSoup, name: str) -> str:
    tag = soup.find("meta", attrs={"property": name})
    return (tag.get("content") or "").strip() if tag else ""


def article_tag_values(soup: BeautifulSoup) -> list[str]:
    return [
        tag.get("content", "").strip()
        for tag in soup.find_all("meta", attrs={"property": "article:tag"})
        if tag.get("content")
    ]


def classify(source_category: str, slug: str, text: str) -> str:
    value = f"{source_category} {slug} {text}".lower()
    if any(word in value for word in ("gemini", "nano-banana", "google ai", "imagen")):
        return "Gemini专题"
    if any(word in value for word in ("api", "sdk", "rate-limit", "quota", "comfyui", "dify", "cursor", "cline", "openclaw")):
        return "API开发"
    if any(word in value for word in ("compare", "vs-", "comparison", "cheapest", "price", "pricing", "cost", "alternative")):
        return "模型对比"
    if any(word in value for word in ("guide", "tutorial", "how", "fix", "not-working", "prompt", "generator")):
        return "技术教程"
    if "tool" in value or "studio" in value:
        return "AI工具指南"
    return "图像生成"


def replace_brands(value: str) -> str:
    replacements = (
        (r"YINGTU TECHNOLOGY PTE\. LTD\.?", ""),
        (r"YingTu AI 编辑部", "GPT88 AI 编辑部"),
        (r"YingTu", "GPT88"),
        (r"yingtu\.ai", "gpt88.cc"),
        (r"yingtu", "gpt88"),
        (r"LaoZhang", "GPT88"),
        (r"Lao Zhang", "GPT88"),
        (r"laozhang\.ai", "gpt88.cc"),
        (r"laozhang", "gpt88"),
        (r"YINGTU", "GPT88"),
    )
    for pattern, replacement in replacements:
        value = re.sub(pattern, replacement, value, flags=re.IGNORECASE)
    return value


def replace_links(soup: BeautifulSoup) -> None:
    for link in soup.find_all("a", href=True):
        href = html.unescape(link["href"]).strip()
        if href.startswith("/"):
            if href.startswith("/zh/blog/"):
                link["href"] = "/docs/blog/" + href.rsplit("/", 1)[-1]
            continue
        if not re.match(r"https?://", href):
            continue
        host = re.sub(r"^www\.", "", href.split("/", 3)[2].lower())
        if host.endswith("yingtu.ai") or host.endswith("laozhang.ai"):
            link["href"] = "https://gpt88.cc"
        elif not any(host == domain or host.endswith("." + domain) for domain in OFFICIAL_DOMAINS):
            link.unwrap()


def clean_content(soup: BeautifulSoup) -> BeautifulSoup:
    content = soup.select_one(".blog-article-content")
    if content is None:
        raise ValueError("source article content was not found")
    # The source includes promotional/footer sections after the article body.
    for heading in content.find_all(["h2", "h3"]):
        heading_text = heading.get_text(" ", strip=True)
        if heading_text in {"文章标签", "分享这篇文章", "相关文章"}:
            for node in list(heading.find_all_next()):
                node.decompose()
            heading.decompose()
            break
    replace_links(content)
    for node in content.find_all(string=True):
        node.replace_with(replace_brands(str(node)))
    return content


def to_markdown(content: BeautifulSoup) -> str:
    # Pandoc preserves layout-only wrappers as raw HTML. They are useful in
    # the source site, but the docs renderer already owns article layout.
    for wrapper in content.find_all("div", class_=["blog-article-content", "blog-table-wrap"]):
        wrapper.unwrap()
    raw = str(content)
    result = subprocess.run(
        ["pandoc", "-f", "html", "-t", "gfm", "--wrap=none"],
        input=raw,
        text=True,
        capture_output=True,
        check=True,
    )
    body = result.stdout.strip()
    body = re.sub(r"\n{3,}", "\n\n", body)
    body = re.sub(r"^\s*文章目录\s*$", "", body, flags=re.MULTILINE)
    body = re.sub(r"^\s*这篇文章暂无目录结构\s*$", "", body, flags=re.MULTILINE)
    return body.strip()


def frontmatter(meta: dict[str, str | list[str]], body: str) -> str:
    title = str(meta["title"]).replace("\n", " ").strip()
    description = str(meta["description"]).replace("\n", " ").strip()
    tags = ", ".join(str(tag).replace(",", "，") for tag in meta["tags"])
    return (
        "---\n"
        f"title: {title}\n"
        f"description: {description}\n"
        f"date: {meta['date']}\n"
        f"category: {meta['category']}\n"
        f"tags: [{tags}]\n"
        f"readTime: {meta['read_time']}\n"
        "relatedPath: /docs/api/images/\n"
        "relatedTitle: GPT88 图片生成 API\n"
        "---\n\n"
        f"{body}\n"
    )


def migrate(slug: str) -> tuple[str, int]:
    target = POSTS / f"{slug}.md"
    if target.exists():
        return "skip", 0
    soup = BeautifulSoup(fetch(SOURCE_ROOT + slug), "html.parser")
    title = soup.find("h1")
    if title is None:
        raise ValueError("article title was not found")
    title_text = replace_brands(title.get_text(" ", strip=True))
    description = replace_brands(meta_content(soup, "description"))
    date = property_content(soup, "article:published_time") or "2026-01-01"
    category_node = soup.select_one("header span")
    source_category = category_node.get_text(" ", strip=True) if category_node else ""
    tags = [replace_brands(tag) for tag in article_tag_values(soup)]
    body_source = clean_content(soup)
    body = to_markdown(body_source)
    body = replace_brands(body)
    read_time_match = re.search(r"约\s*(\d+)\s*分钟", soup.get_text(" ", strip=True))
    read_time = read_time_match.group(1) if read_time_match else "8"
    meta = {
        "title": title_text,
        "description": description,
        "date": date,
        "category": classify(source_category, slug, title_text + " " + body[:500]),
        "tags": tags or [title_text.split("：", 1)[0][:20]],
        "read_time": read_time,
    }
    target.write_text(frontmatter(meta, body), encoding="utf-8")
    return "created", len(body)


def repair_existing() -> int:
    repaired = 0
    for target in POSTS.glob("*.md"):
        source = target.read_text(encoding="utf-8")
        fixed = source
        fixed = re.sub(r"<div class=\"blog-article-content[^\"]*\">\s*", "", fixed)
        fixed = re.sub(r"<div class=\"blog-table-wrap\">\s*", "", fixed)
        fixed = fixed.replace("</div>", "")
        fixed = re.sub(r"https?://api2\.(?:GPT88|gpt88|laozhang)\.ai(?:/v1(?:beta)?(?:/[^\s\"`)]*)?)?", "https://gpt88.cc/v1", fixed)
        fixed = re.sub(r"https?://(?:www\.)?(?:yingtu|laozhang)\.ai(?:/[^\s\"`)]*)?", "https://gpt88.cc", fixed, flags=re.IGNORECASE)
        fixed = fixed.replace("api2.GPT88.ai", "gpt88.cc")
        fixed = fixed.replace("api2.gpt88.ai", "gpt88.cc")
        fixed = re.sub(r"\n{3,}", "\n\n", fixed)
        if fixed != source:
            target.write_text(fixed, encoding="utf-8")
            repaired += 1
    return repaired


def repair_dates() -> int:
    updated = 0
    for target in POSTS.glob("*.md"):
        source = target.read_text(encoding="utf-8")
        if "\ndate: 2026-01-01\n" not in source:
            continue
        slug = target.stem
        page = BeautifulSoup(fetch(SOURCE_ROOT + slug), "html.parser")
        date = property_content(page, "article:published_time")
        if date:
            target.write_text(source.replace("\ndate: 2026-01-01\n", f"\ndate: {date}\n", 1), encoding="utf-8")
            updated += 1
    return updated


def slugs_from_sitemap() -> list[str]:
    if not SITEMAP.exists():
        raise SystemExit(
            f"{SITEMAP} is missing; download https://yingtu.ai/sitemap.xml first."
        )
    sitemap = SITEMAP.read_text(encoding="utf-8", errors="replace")
    return sorted(set(re.findall(r"https://yingtu\.ai/zh/blog/([a-z0-9-]+)", sitemap)))


def main() -> int:
    POSTS.mkdir(parents=True, exist_ok=True)
    if "--repair" in sys.argv:
        print(f"repaired: {repair_existing()}")
        return 0
    if "--repair-dates" in sys.argv:
        print(f"dates updated: {repair_dates()}")
        return 0
    created = skipped = 0
    for slug in slugs_from_sitemap():
        try:
            status, size = migrate(slug)
            if status == "created":
                created += 1
                print(f"created {slug} ({size} chars)")
            else:
                skipped += 1
                print(f"skip    {slug}")
        except Exception as exc:
            print(f"ERROR   {slug}: {exc}", file=sys.stderr)
    print(f"done: created={created}, skipped={skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
