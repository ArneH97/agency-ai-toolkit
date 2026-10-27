#!/usr/bin/env node
/**
 * Agency AI Toolkit — MCP server
 * Geeft Claude twee tools:
 *   - website_check:  SEO-basics en technische kwaliteit van een pagina
 *   - marketing_scan: welke marketing- en techstack een (potentiële) klant gebruikt
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { normalizeUrl, fetchPage, exists, friendlyError } from "./shared.js";
import { websiteCheck } from "./websiteCheck.js";
import { marketingScan } from "./marketingScan.js";

const server = new McpServer({ name: "agency-ai-toolkit", version: "1.1.0" });
const urlInput = { url: z.string().min(3).describe("De URL van de website, bv. https://www.voorbeeld.be") };

const fail = (err: unknown) => ({
  content: [{ type: "text" as const, text: `Check mislukt: ${friendlyError(err)}` }],
  isError: true,
});

server.registerTool(
  "website_check",
  {
    title: "Website check",
    description:
      "Controleert een publieke webpagina op SEO-basics en kwaliteit: title, meta description, H1, alt-teksten, " +
      "canonical, Open Graph, taal, viewport, laadtijd en grootte. Geeft per punt OK of verbeterpunt en een score.",
    inputSchema: urlInput,
  },
  async ({ url }) => {
    try {
      const { res, html, ms, bytes } = await fetchPage(normalizeUrl(url));
      if (!res.ok) return fail(new Error(`De pagina gaf status ${res.status} terug.`));
      return { content: [{ type: "text", text: websiteCheck(html, ms, bytes, res.url) }] };
    } catch (err) {
      return fail(err);
    }
  },
);

server.registerTool(
  "marketing_scan",
  {
    title: "Marketing- en techscan",
    description:
      "Brengt de digitale marketing- en techstack van een bedrijf in kaart op basis van de publieke homepage: " +
      "CMS, tracking en advertentiepixels, cookiebanner, chat, formulieren, webshop, social media, blog, " +
      "structured data, robots.txt, sitemap en llms.txt. Gebruik dit om kansen en lead-potentieel te beoordelen.",
    inputSchema: urlInput,
  },
  async ({ url }) => {
    try {
      const target = normalizeUrl(url);
      const { res, html } = await fetchPage(target);
      if (!res.ok) return fail(new Error(`De pagina gaf status ${res.status} terug.`));
      const base = new URL(res.url);
      const [robots, sitemap, llms] = await Promise.all([
        exists(base, "/robots.txt"),
        exists(base, "/sitemap.xml"),
        exists(base, "/llms.txt"),
      ]);
      return { content: [{ type: "text", text: marketingScan(html, res.url, { robots, sitemap, llms }) }] };
    } catch (err) {
      return fail(err);
    }
  },
);

await server.connect(new StdioServerTransport());
