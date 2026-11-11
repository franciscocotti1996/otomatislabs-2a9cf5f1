import brand160webp from "@/assets/optimized/brand-160.webp.asset.json";
import brand320webp from "@/assets/optimized/brand-320.webp.asset.json";
import brand160png from "@/assets/optimized/brand-160.png.asset.json";
import brand320png from "@/assets/optimized/brand-320.png.asset.json";
import bullMarket180webp from "@/assets/optimized/bullMarket-180.webp.asset.json";
import bullMarket360webp from "@/assets/optimized/bullMarket-360.webp.asset.json";
import bullMarket180png from "@/assets/optimized/bullMarket-180.png.asset.json";
import bullMarket360png from "@/assets/optimized/bullMarket-360.png.asset.json";
import capitalMarkets80webp from "@/assets/optimized/capitalMarkets-80.webp.asset.json";
import capitalMarkets160webp from "@/assets/optimized/capitalMarkets-160.webp.asset.json";
import capitalMarkets80png from "@/assets/optimized/capitalMarkets-80.png.asset.json";
import capitalMarkets160png from "@/assets/optimized/capitalMarkets-160.png.asset.json";
import inviu100webp from "@/assets/optimized/inviu-100.webp.asset.json";
import inviu200webp from "@/assets/optimized/inviu-200.webp.asset.json";
import inviu100png from "@/assets/optimized/inviu-100.png.asset.json";
import inviu200png from "@/assets/optimized/inviu-200.png.asset.json";
import keko180webp from "@/assets/optimized/keko-180.webp.asset.json";
import keko360webp from "@/assets/optimized/keko-360.webp.asset.json";
import keko180png from "@/assets/optimized/keko-180.png.asset.json";
import keko360png from "@/assets/optimized/keko-360.png.asset.json";
import legion180webp from "@/assets/optimized/legion-180.webp.asset.json";
import legion360webp from "@/assets/optimized/legion-360.webp.asset.json";
import legion180png from "@/assets/optimized/legion-180.png.asset.json";
import legion360png from "@/assets/optimized/legion-360.png.asset.json";
import nocnoc180webp from "@/assets/optimized/nocnoc-180.webp.asset.json";
import nocnoc360webp from "@/assets/optimized/nocnoc-360.webp.asset.json";
import nocnoc180png from "@/assets/optimized/nocnoc-180.png.asset.json";
import nocnoc360png from "@/assets/optimized/nocnoc-360.png.asset.json";
import meta200webp from "@/assets/optimized/meta-200.webp.asset.json";
import meta400webp from "@/assets/optimized/meta-400.webp.asset.json";
import meta200png from "@/assets/optimized/meta-200.png.asset.json";
import meta400png from "@/assets/optimized/meta-400.png.asset.json";
import botmaker160webp from "@/assets/optimized/botmaker-160.webp.asset.json";
import botmaker320webp from "@/assets/optimized/botmaker-320.webp.asset.json";
import botmaker160png from "@/assets/optimized/botmaker-160.png.asset.json";
import botmaker320png from "@/assets/optimized/botmaker-320.png.asset.json";
import team480avif from "@/assets/optimized/team-480.avif.asset.json";
import team960avif from "@/assets/optimized/team-960.avif.asset.json";
import team1280avif from "@/assets/optimized/team-1280.avif.asset.json";
import team480webp from "@/assets/optimized/team-480.webp.asset.json";
import team960webp from "@/assets/optimized/team-960.webp.asset.json";
import team1280webp from "@/assets/optimized/team-1280.webp.asset.json";
import team480jpg from "@/assets/optimized/team-480.jpg.asset.json";
import team960jpg from "@/assets/optimized/team-960.jpg.asset.json";
import team1280jpg from "@/assets/optimized/team-1280.jpg.asset.json";
import testimonial148avif from "@/assets/optimized/testimonial1-48.avif.asset.json";
import testimonial196avif from "@/assets/optimized/testimonial1-96.avif.asset.json";
import testimonial1144avif from "@/assets/optimized/testimonial1-144.avif.asset.json";
import testimonial148webp from "@/assets/optimized/testimonial1-48.webp.asset.json";
import testimonial196webp from "@/assets/optimized/testimonial1-96.webp.asset.json";
import testimonial1144webp from "@/assets/optimized/testimonial1-144.webp.asset.json";
import testimonial148jpg from "@/assets/optimized/testimonial1-48.jpg.asset.json";
import testimonial196jpg from "@/assets/optimized/testimonial1-96.jpg.asset.json";
import testimonial1144jpg from "@/assets/optimized/testimonial1-144.jpg.asset.json";
import testimonial248avif from "@/assets/optimized/testimonial2-48.avif.asset.json";
import testimonial296avif from "@/assets/optimized/testimonial2-96.avif.asset.json";
import testimonial2144avif from "@/assets/optimized/testimonial2-144.avif.asset.json";
import testimonial248webp from "@/assets/optimized/testimonial2-48.webp.asset.json";
import testimonial296webp from "@/assets/optimized/testimonial2-96.webp.asset.json";
import testimonial2144webp from "@/assets/optimized/testimonial2-144.webp.asset.json";
import testimonial248jpg from "@/assets/optimized/testimonial2-48.jpg.asset.json";
import testimonial296jpg from "@/assets/optimized/testimonial2-96.jpg.asset.json";
import testimonial2144jpg from "@/assets/optimized/testimonial2-144.jpg.asset.json";
import testimonial348avif from "@/assets/optimized/testimonial3-48.avif.asset.json";
import testimonial396avif from "@/assets/optimized/testimonial3-96.avif.asset.json";
import testimonial3144avif from "@/assets/optimized/testimonial3-144.avif.asset.json";
import testimonial348webp from "@/assets/optimized/testimonial3-48.webp.asset.json";
import testimonial396webp from "@/assets/optimized/testimonial3-96.webp.asset.json";
import testimonial3144webp from "@/assets/optimized/testimonial3-144.webp.asset.json";
import testimonial348jpg from "@/assets/optimized/testimonial3-48.jpg.asset.json";
import testimonial396jpg from "@/assets/optimized/testimonial3-96.jpg.asset.json";
import testimonial3144jpg from "@/assets/optimized/testimonial3-144.jpg.asset.json";

export type ResponsiveImageAsset = {
  src: string;
  width: number;
  height: number;
  srcSet: string;
  webp: string;
  avif?: string;
};

export const responsiveImages = {
  brand: { src: brand320png.url, width: 1080, height: 660, srcSet: `${brand160png.url} 160w, ${brand320png.url} 320w`, webp: `${brand160webp.url} 160w, ${brand320webp.url} 320w`, },
  bullMarket: { src: bullMarket360png.url, width: 1920, height: 687, srcSet: `${bullMarket180png.url} 180w, ${bullMarket360png.url} 360w`, webp: `${bullMarket180webp.url} 180w, ${bullMarket360webp.url} 360w`, },
  capitalMarkets: { src: capitalMarkets160png.url, width: 800, height: 802, srcSet: `${capitalMarkets80png.url} 80w, ${capitalMarkets160png.url} 160w`, webp: `${capitalMarkets80webp.url} 80w, ${capitalMarkets160webp.url} 160w`, },
  inviu: { src: inviu200png.url, width: 590, height: 414, srcSet: `${inviu100png.url} 100w, ${inviu200png.url} 200w`, webp: `${inviu100webp.url} 100w, ${inviu200webp.url} 200w`, },
  keko: { src: keko360png.url, width: 620, height: 244, srcSet: `${keko180png.url} 180w, ${keko360png.url} 360w`, webp: `${keko180webp.url} 180w, ${keko360webp.url} 360w`, },
  legion: { src: legion360png.url, width: 1708, height: 418, srcSet: `${legion180png.url} 180w, ${legion360png.url} 360w`, webp: `${legion180webp.url} 180w, ${legion360webp.url} 360w`, },
  nocnoc: { src: nocnoc360png.url, width: 1600, height: 400, srcSet: `${nocnoc180png.url} 180w, ${nocnoc360png.url} 360w`, webp: `${nocnoc180webp.url} 180w, ${nocnoc360webp.url} 360w`, },
  meta: { src: meta400png.url, width: 1920, height: 1080, srcSet: `${meta200png.url} 200w, ${meta400png.url} 400w`, webp: `${meta200webp.url} 200w, ${meta400webp.url} 400w`, },
  botmaker: { src: botmaker320png.url, width: 970, height: 293, srcSet: `${botmaker160png.url} 160w, ${botmaker320png.url} 320w`, webp: `${botmaker160webp.url} 160w, ${botmaker320webp.url} 320w`, },
  team: { src: team1280jpg.url, width: 1280, height: 720, srcSet: `${team480jpg.url} 480w, ${team960jpg.url} 960w, ${team1280jpg.url} 1280w`, webp: `${team480webp.url} 480w, ${team960webp.url} 960w, ${team1280webp.url} 1280w`, avif: `${team480avif.url} 480w, ${team960avif.url} 960w, ${team1280avif.url} 1280w`, },
  testimonial1: { src: testimonial1144jpg.url, width: 512, height: 512, srcSet: `${testimonial148jpg.url} 48w, ${testimonial196jpg.url} 96w, ${testimonial1144jpg.url} 144w`, webp: `${testimonial148webp.url} 48w, ${testimonial196webp.url} 96w, ${testimonial1144webp.url} 144w`, avif: `${testimonial148avif.url} 48w, ${testimonial196avif.url} 96w, ${testimonial1144avif.url} 144w`, },
  testimonial2: { src: testimonial2144jpg.url, width: 512, height: 512, srcSet: `${testimonial248jpg.url} 48w, ${testimonial296jpg.url} 96w, ${testimonial2144jpg.url} 144w`, webp: `${testimonial248webp.url} 48w, ${testimonial296webp.url} 96w, ${testimonial2144webp.url} 144w`, avif: `${testimonial248avif.url} 48w, ${testimonial296avif.url} 96w, ${testimonial2144avif.url} 144w`, },
  testimonial3: { src: testimonial3144jpg.url, width: 512, height: 512, srcSet: `${testimonial348jpg.url} 48w, ${testimonial396jpg.url} 96w, ${testimonial3144jpg.url} 144w`, webp: `${testimonial348webp.url} 48w, ${testimonial396webp.url} 96w, ${testimonial3144webp.url} 144w`, avif: `${testimonial348avif.url} 48w, ${testimonial396avif.url} 96w, ${testimonial3144avif.url} 144w`, },
} satisfies Record<string, ResponsiveImageAsset>;
