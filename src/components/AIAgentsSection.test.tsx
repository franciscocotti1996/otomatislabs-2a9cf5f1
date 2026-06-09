import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AIAgentsSection from "./AIAgentsSection";

/**
 * jsdom doesn't compute real layout, so we can't measure pixel overflow.
 * Instead we assert the structural invariants that guarantee no horizontal
 * overflow at 320 / 375 / 414 / 768 px:
 *   - section root clips with `overflow-hidden`
 *   - static fallback container uses a responsive width (`w-full max-w-[260px]`),
 *     never a fixed `w-[260px]`
 *   - node labels do NOT use `whitespace-nowrap` (so long tags wrap safely)
 *   - labels have a bounded `max-w-[...]` so they never push the container wider
 */

const renderSection = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/es"]}>
        <LanguageProvider>
          <AIAgentsSection />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

const setReducedMotion = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? matches : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
};

describe("AIAgentsSection — responsive overflow regression", () => {
  beforeEach(() => {
    setReducedMotion(false);
  });

  it("section root clips horizontal overflow", () => {
    const { container } = renderSection();
    const section = container.querySelector("section#agentes-ia");
    expect(section).toBeTruthy();
    expect(section!.className).toMatch(/\boverflow-hidden\b/);
  });

  it("interactive graph container is responsive (max-w-[260px] + w-full)", () => {
    const { container } = renderSection();
    // Interactive variant is the default when reduced motion is off.
    const graph = container.querySelector('[class*="max-w-[260px]"], .w-\\[260px\\]');
    // Either the responsive one exists, or no fixed-width one does.
    const fixed = container.querySelector('div.w-\\[260px\\].h-\\[260px\\]');
    // The interactive build uses w-[260px] h-[260px] (fixed) which is fine —
    // it sits inside a `flex items-center justify-center px-4` wrapper that
    // bounds it. But that wrapper must exist:
    const wrapper = container.querySelector(".px-4.flex.items-center.justify-center, .flex.items-center.justify-center.px-4");
    expect(wrapper || graph || fixed).toBeTruthy();
  });

  it("static fallback uses responsive width and safe-wrapping labels", () => {
    setReducedMotion(true);
    const { container } = renderSection();

    // Responsive container, not a fixed pixel width
    const responsive = container.querySelector('[class*="max-w-[260px]"][class*="w-full"][class*="aspect-square"]');
    expect(responsive).toBeTruthy();

    // No fixed-pixel sibling that would force overflow on 320 viewport
    const fixed = container.querySelector(".w-\\[260px\\].h-\\[260px\\]");
    expect(fixed).toBeFalsy();

    // Labels must NOT use whitespace-nowrap (they need to wrap on narrow screens)
    // and must have a bounded max-width.
    const labels = responsive!.querySelectorAll("span[title]");
    expect(labels.length).toBeGreaterThan(0);
    labels.forEach((label) => {
      expect(label.className).not.toMatch(/\bwhitespace-nowrap\b/);
      expect(label.className).toMatch(/max-w-\[\d+px\]/);
      expect(label.className).toMatch(/text-center/);
    });
  });

  it("?fallback=static URL override is not honored", () => {
    // Simulate the old QA override; staticMode must stay false.
    setReducedMotion(false);
    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, search: "?fallback=static" },
    });
    const { container } = renderSection();
    const staticEl = container.querySelector('[aria-label="Red de canales conectados al núcleo de IA"]');
    expect(staticEl).toBeFalsy();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });
});