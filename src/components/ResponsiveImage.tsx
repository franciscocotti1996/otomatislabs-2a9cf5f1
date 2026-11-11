import type { ImgHTMLAttributes } from "react";
import type { ResponsiveImageAsset } from "@/lib/responsive-images";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> & {
  asset: ResponsiveImageAsset;
  sizes: string;
};

const ResponsiveImage = ({ asset, sizes, loading = "lazy", ...props }: Props) => (
  <picture className="contents">
    {asset.avif && <source type="image/avif" srcSet={asset.avif} sizes={sizes} />}
    <source type="image/webp" srcSet={asset.webp} sizes={sizes} />
    <img
      {...props}
      src={asset.src}
      srcSet={asset.srcSet}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      loading={loading}
      decoding="async"
    />
  </picture>
);

export default ResponsiveImage;