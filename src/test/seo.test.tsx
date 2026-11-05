import { readFileSync } from "node:fs";
import path from "node:path";
import { render, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "@/pages/Index";

const SITE = "https://otomatislabs.com";
const html = readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");

const attrs = (tag: string, attr: string) =>
  [...html.matchAll(new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*>`, "g"))].map((m) => m[1]);

const metaContent = (key: "name" | "property", value: string) => {
  const m = html.match(new RegExp(`<meta[^>]*${key}="${value}"[^>]*content="([^"]*)"`, "i"));
  return m?.[1] ?? null;
};

const dupes = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i);

describe("index.html static head", () => {
  it("has a valid, non-default title", () => {
    const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => m[1].trim());
    expect(titles).toHaveLength(1);
    expect(titles[0]).not.toMatch(/Lovable App/i);
    expect(titles[0].length).toBeGreaterThan(10);
    expect(titles[0].length).toBeLessThanOrEqual(70);
  });

  it("has a valid, non-default meta description", () => {
    const desc = metaContent("name", "description");
    expect(desc).toBeTruthy();
    expect(desc).not.toMatch(/Lovable Generated Project/i);
    if (!desc) throw new Error("Missing description");
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThanOrEqual(170);
  });

  it("has required Open Graph and Twitter tags", () => {
    for (const p of ["og:type", "og:title", "og:description", "og:url", "og:image", "og:image:alt"]) {
      expect(metaContent("property", p), `missing ${p}`).toBeTruthy();
    }
    for (const n of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
      expect(metaContent("name", n), `missing ${n}`).toBeTruthy();
    }
    expect(metaContent("property", "og:image")).toMatch(/^https:\/\//);
    expect(metaContent("name", "twitter:card")).toBe("summary_large_image");
  });

  it("has no duplicated meta tags in the head", () => {
    expect(dupes(attrs("meta", "name"))).toEqual([]);
    expect(dupes(attrs("meta", "property"))).toEqual([]);
  });

  it("hosts both social image tags on the primary domain", () => {
    expect(metaContent("property", "og:image")).toBe(`${SITE}/og-image.jpg`);
    expect(metaContent("name", "twitter:image")).toBe(`${SITE}/og-image.jpg`);
  });

  it("declares one Organization with a same-domain logo", () => {
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]));
    const organizations = schemas.filter((schema) => schema["@type"] === "Organization");
    expect(organizations).toHaveLength(1);
    expect(organizations[0].logo).toBe(`${SITE}/logo.png`);
    expect(organizations[0]["@id"]).toBe(`${SITE}/#organization`);
  });

  it("uses Argentine Spanish as the static social locale", () => {
    expect(metaContent("property", "og:locale")).toBe("es_AR");
  });
});

const headTags = () => {
  const metas = [...document.head.querySelectorAll("meta")];
  const links = [...document.head.querySelectorAll("link")];
  return {
    titles: [...document.head.querySelectorAll("title")].map((t) => t.textContent?.trim() ?? ""),
    meta: (key: "name" | "property", value: string) =>
      metas.filter((m) => m.getAttribute(key) === value).map((m) => m.getAttribute("content") ?? ""),
    metaKeys: metas.map((m) => m.getAttribute("property") ?? (m.getAttribute("name") ? `name:${m.getAttribute("name")}` : null)).filter(Boolean) as string[],
    canonicals: links.filter((l) => l.rel === "canonical").map((l) => l.href),
    hreflangs: links.filter((l) => l.rel === "alternate").map((l) => `${l.hreflang}|${l.href}`),
  };
};

const renderRoute = async (route: string) => {
  document.head.innerHTML = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <LanguageProvider>
          <Index />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
  await waitFor(() => expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE}${route}`));
  return headTags();
};

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe.each([
  ["/es", "es", "en"],
  ["/en", "en", "es"],
])("route %s head metadata", (route, lang, alt) => {
  it("emits a unique, well-sized title and description", async () => {
    const head = await renderRoute(route);
    expect(head.titles).toHaveLength(1);
    expect(head.titles[0].length).toBeGreaterThan(10);
    expect(head.titles[0].length).toBeLessThanOrEqual(70);

    const desc = head.meta("name", "description");
    expect(desc).toHaveLength(1);
    expect(desc[0].length).toBeGreaterThan(50);
    expect(desc[0].length).toBeLessThanOrEqual(170);
  });

  it("emits a self-referencing canonical and both hreflang alternates", async () => {
    const head = await renderRoute(route);
    expect(head.canonicals).toEqual([`${SITE}${route}`]);
    expect(head.hreflangs).toEqual(
      expect.arrayContaining([
        `es|${SITE}/es`,
        `en|${SITE}/en`,
        `x-default|${SITE}/es`,
      ]),
    );
  });

  it("emits complete Open Graph / Twitter tags matching the locale", async () => {
    const head = await renderRoute(route);
    expect(head.meta("property", "og:url")).toEqual([`${SITE}${route}`]);
    expect(head.meta("property", "og:title")[0]).toBe(head.titles[0]);
    expect(head.meta("property", "og:type")).toEqual(["website"]);
    expect(head.meta("property", "og:image")).toEqual([`${SITE}/og-image.jpg`]);
    expect(head.meta("property", "og:image:alt")[0]).toBeTruthy();
    expect(head.meta("property", "og:locale")).toEqual([lang === "es" ? "es_AR" : "en_US"]);
    expect(head.meta("property", "og:locale:alternate")).toEqual([alt === "es" ? "es_AR" : "en_US"]);
    expect(head.meta("name", "twitter:card")).toEqual(["summary_large_image"]);
    expect(head.meta("name", "twitter:image")).toEqual([`${SITE}/og-image.jpg`]);
  });

  it("does not duplicate any head tag", async () => {
    const head = await renderRoute(route);
    expect(dupes(head.metaKeys)).toEqual([]);
    expect(head.canonicals).toHaveLength(1);
    const schemas = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent ?? "{}"));
    expect(schemas.filter((schema) => schema["@type"] === "Organization")).toHaveLength(1);
    expect(schemas.find((schema) => schema["@type"] === "WebSite")?.publisher).toEqual({
      "@id": `${SITE}/#organization`,
    });
  });
});
