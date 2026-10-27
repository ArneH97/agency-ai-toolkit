/**
 * Tool 2: marketing_scan — welke marketing- en techstack gebruikt een bedrijf?
 * Alles op basis van de publieke HTML: geen login, geen externe API's.
 * De output is bewust feitelijk; de interpretatie (kansen, score) doet de lead-scoring-skill.
 */
import * as cheerio from "cheerio";

type Signal = { name: string; pattern: RegExp };

const CMS: Signal[] = [
  { name: "WordPress", pattern: /wp-content|wp-includes/i },
  { name: "WooCommerce", pattern: /woocommerce/i },
  { name: "Shopify", pattern: /cdn\.shopify\.com|Shopify\.theme/i },
  { name: "Wix", pattern: /static\.wixstatic\.com|wix\.com/i },
  { name: "Squarespace", pattern: /squarespace/i },
  { name: "Webflow", pattern: /webflow/i },
  { name: "Odoo", pattern: /\/web\/assets\/|odoo/i },
  { name: "Laravel", pattern: /laravel_session|XSRF-TOKEN|livewire/i },
  { name: "Next.js", pattern: /\/_next\/static/i },
];

const TRACKING: Signal[] = [
  { name: "Google Analytics 4", pattern: /gtag\/js\?id=G-|G-[A-Z0-9]{6,}/ },
  { name: "Google Tag Manager", pattern: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/ },
  { name: "Meta Pixel", pattern: /connect\.facebook\.net\/.*fbevents|fbq\(/ },
  { name: "LinkedIn Insight Tag", pattern: /snap\.licdn\.com|_linkedin_partner_id/ },
  { name: "Google Ads", pattern: /googleads\.g\.doubleclick|AW-\d{6,}/ },
  { name: "TikTok Pixel", pattern: /analytics\.tiktok\.com/ },
  { name: "Hotjar / Clarity", pattern: /hotjar|clarity\.ms/ },
  { name: "Leadinfo", pattern: /leadinfo/i },
];

const TOOLS: Signal[] = [
  { name: "Cookiebanner", pattern: /cookiebot|onetrust|cookieyes|complianz|cookie-law-info|iubenda|axeptio/i },
  { name: "Chat-widget", pattern: /intercom|tidio|crisp\.chat|hs-scripts|livechatinc|tawk\.to|zendesk/i },
  { name: "HubSpot", pattern: /hs-scripts|hubspot/i },
  { name: "Nieuwsbrief-inschrijving", pattern: /mailchimp|list-manage\.com|klaviyo|brevo|sendinblue|mailerlite/i },
  { name: "Online boeken / afspraken", pattern: /calendly|simplybook|zenchef|resengo|bookingkit|setmore|acuityscheduling/i },
];

const SOCIALS: Record<string, RegExp> = {
  Facebook: /facebook\.com\/(?!sharer|tr\b)/i,
  Instagram: /instagram\.com\//i,
  LinkedIn: /linkedin\.com\/(company|in)\//i,
  TikTok: /tiktok\.com\/@/i,
  YouTube: /youtube\.com\/(@|channel|c\/|user)/i,
};

const found = (list: Signal[], html: string) => list.filter((s) => s.pattern.test(html)).map((s) => s.name);

export function marketingScan(
  html: string,
  finalUrl: string,
  extras: { robots: boolean; sitemap: boolean; llms: boolean },
): string {
  const $ = cheerio.load(html);
  const links = $("a[href]").map((_, el) => $(el).attr("href") ?? "").get();
  const linkText = $("a").map((_, el) => $(el).text().toLowerCase()).get().join(" ");
  const bodyText = $("body").text().replace(/\s+/g, " ");

  const generator = $('meta[name="generator"]').attr("content");
  const cms = found(CMS, html);
  const tracking = found(TRACKING, html);
  const tools = found(TOOLS, html);
  const socials = Object.entries(SOCIALS)
    .filter(([, re]) => links.some((l) => re.test(l)))
    .map(([name]) => name);

  const hasBlog = /blog|nieuws|news|kennisbank|artikel/.test(linkText);
  const hasShop = /add-to-cart|winkelmand|winkelwagen|in winkelmandje|\/cart|\/checkout/i.test(html);
  const forms = $("form").length;
  const hasPhone =
    links.some((l) => l.startsWith("tel:")) ||
    /(\+32|0032)\s?\(?0?\)?\s?\d{1,3}[\s/.]?\d{2,3}[\s.]?\d{2}[\s.]?\d{2}\b|\b0\d{1,3}[\s/.]\d{2,3}[\s.]\d{2}[\s.]\d{2}\b/.test(bodyText);
  const hasBooking = /afspraak maken|maak een afspraak|boek nu|reserveer|book now|book a demo|plan een gesprek/i.test(linkText);
  const hasEmail = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(bodyText) || links.some((l) => l.startsWith("mailto:"));
  const languages = $('link[rel="alternate"][hreflang]').map((_, el) => $(el).attr("hreflang")).get();
  const years = [...bodyText.matchAll(/(?:©|copyright)\s*(?:\d{4}\s*[-–]\s*)?(20\d{2})/gi)].map((m) => Number(m[1]));
  const copyrightYear = years.length ? Math.max(...years) : null;
  const jsonLd = $('script[type="application/ld+json"]').length;
  const https = finalUrl.startsWith("https://");

  const yn = (b: boolean) => (b ? "ja" : "nee");
  const list = (a: string[]) => (a.length ? a.join(", ") : "niets gedetecteerd");

  return [
    `Marketing- en techscan voor ${finalUrl}`,
    "",
    "PLATFORM",
    `- CMS / framework: ${list([...(generator ? [generator] : []), ...cms.filter((c) => !generator?.includes(c))])}`,
    `- HTTPS: ${yn(https)}`,
    `- Webshop-signalen: ${yn(hasShop)}`,
    `- Talen (hreflang): ${languages.length ? [...new Set(languages)].join(", ") : "geen meertaligheid gedetecteerd"}`,
    `- Copyright-jaar in footer: ${copyrightYear ?? "niet gevonden"}`,
    "",
    "MEETBAARHEID & ADVERTEREN",
    `- Tracking en pixels: ${list(tracking)}`,
    "",
    "LEADGENERATIE & CONVERSIE",
    `- Formulieren op de pagina: ${forms}`,
    `- Telefoonnummer zichtbaar: ${yn(hasPhone)} · e-mailadres zichtbaar: ${yn(hasEmail)}`,
    `- Tools: ${list(tools)}`,
    `- Knop om af te spreken / te boeken / te reserveren: ${yn(hasBooking)}`,
    "",
    "CONTENT & ZICHTBAARHEID",
    `- Blog / nieuws: ${yn(hasBlog)}`,
    `- Social media gelinkt: ${list(socials)}`,
    `- Structured data (JSON-LD): ${jsonLd ? `${jsonLd} blok(ken)` : "geen"}`,
    `- robots.txt: ${yn(extras.robots)} · sitemap.xml: ${yn(extras.sitemap)} · llms.txt (AI-zoekmachines): ${yn(extras.llms)}`,
    "",
    "Let op: dit is een scan van de publieke homepage. 'Niet gedetecteerd' betekent niet altijd 'niet aanwezig'.",
  ].join("\n");
}
