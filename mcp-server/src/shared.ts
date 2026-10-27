/**
 * Gedeelde helpers: veilige URL-validatie en het ophalen van pagina's.
 */
const TIMEOUT_MS = 10_000;
const MAX_BYTES = 5 * 1024 * 1024; // pagina's groter dan 5 MB niet analyseren

/** Enkel publieke http(s)-URL's; "voorbeeld.be" wordt "https://voorbeeld.be". */
export function normalizeUrl(input: string): URL {
  const trimmed = input.trim();
  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed);
  const url = new URL(hasScheme ? trimmed : `https://${trimmed}`);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Enkel http- en https-URL's zijn toegestaan.");
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) {
    throw new Error("Interne of lokale adressen worden niet gecontroleerd.");
  }
  return url;
}

export async function fetchPage(url: URL) {
  const started = performance.now();
  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "agency-ai-toolkit/1.0" },
  });
  const html = await res.text();
  const ms = Math.round(performance.now() - started);
  if (html.length > MAX_BYTES) throw new Error("Pagina is te groot om te analyseren (> 5 MB).");
  return { res, html, ms, bytes: Buffer.byteLength(html) };
}

/** Bestaat een bestand op de site (bv. /robots.txt)? Fouten tellen als "nee". */
export async function exists(base: URL, path: string): Promise<boolean> {
  try {
    const res = await fetch(new URL(path, base), {
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
      headers: { "User-Agent": "agency-ai-toolkit/1.0" },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Zet een fout om in een duidelijke melding voor de gebruiker. */
export function friendlyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/timeout|aborted/i.test(msg)) return "De pagina reageerde niet binnen 10 seconden.";
  if (msg === "fetch failed") return "De pagina kon niet bereikt worden. Klopt de URL?";
  return msg;
}
