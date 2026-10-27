/**
 * Tool 1: website_check — SEO-basics en technische kwaliteit van één pagina.
 */
import * as cheerio from "cheerio";

type Check = { label: string; ok: boolean; detail: string };

export function websiteCheck(html: string, ms: number, bytes: number, finalUrl: string): string {
  const $ = cheerio.load(html);
  const title = $("title").first().text().trim();
  const desc = $('meta[name="description"]').attr("content")?.trim() ?? "";
  const h1s = $("h1").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get();
  const imgs = $("img");
  const noAlt = imgs.filter((_, el) => !($(el).attr("alt") ?? "").trim()).length;
  const canonical = $('link[rel="canonical"]').attr("href");
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const lang = $("html").attr("lang");
  const viewport = $('meta[name="viewport"]').attr("content");

  const checks: Check[] = [
    { label: "Title", ok: title.length >= 30 && title.length <= 60,
      detail: title ? `"${title}" (${title.length} tekens, ideaal 30–60)` : "ontbreekt" },
    { label: "Meta description", ok: desc.length >= 70 && desc.length <= 160,
      detail: desc ? `${desc.length} tekens (ideaal 70–160)` : "ontbreekt" },
    { label: "H1", ok: h1s.length === 1,
      detail: h1s.length ? `${h1s.length}× — "${h1s[0].slice(0, 80)}"` : "geen H1 gevonden" },
    { label: "Alt-teksten", ok: noAlt === 0, detail: `${noAlt} van ${imgs.length} afbeeldingen zonder alt-tekst` },
    { label: "Canonical", ok: Boolean(canonical), detail: canonical ?? "ontbreekt" },
    { label: "Open Graph", ok: Boolean(ogTitle && ogImage),
      detail: `og:title ${ogTitle ? "✓" : "✗"} · og:image ${ogImage ? "✓" : "✗"}` },
    { label: "Taal (lang)", ok: Boolean(lang), detail: lang ?? "ontbreekt op <html>" },
    { label: "Mobiel (viewport)", ok: Boolean(viewport), detail: viewport ? "aanwezig" : "ontbreekt" },
    { label: "Laadtijd HTML", ok: ms < 1500, detail: `${ms} ms` },
    { label: "Grootte HTML", ok: bytes < 500_000, detail: `${Math.round(bytes / 1024)} KB` },
  ];

  const passed = checks.filter((c) => c.ok).length;
  const score = Math.round((passed / checks.length) * 100);
  return [
    `Website check voor ${finalUrl}`,
    `Score: ${score}/100 (${passed}/${checks.length} checks OK)`,
    "",
    ...checks.map((c) => `${c.ok ? "✅" : "⚠️"} ${c.label}: ${c.detail}`),
  ].join("\n");
}
