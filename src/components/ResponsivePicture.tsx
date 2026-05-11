import { type CSSProperties } from 'react';

type Source = {
    /** e.g. /tractors/12 (no extension). The .avif and .webp variants per width must exist next to it. */
    base: string;
    /** Original fallback path (with extension) */
    fallback: string;
    /** Widths in pixels you generated. */
    widths: number[];
    /** Sizes attribute for the browser's responsive resolver. */
    sizes?: string;
};

type Props = Source & {
    alt: string;
    className?: string;
    imgClassName?: string;
    style?: CSSProperties;
    width?: number;
    height?: number;
    loading?: 'eager' | 'lazy';
    decoding?: 'async' | 'sync' | 'auto';
    fetchPriority?: 'high' | 'low' | 'auto';
};

const buildSrcSet = (base: string, widths: number[], format: 'avif' | 'webp') =>
    widths.map((w) => `${base}-${w}.${format} ${w}w`).join(', ');

const ResponsivePicture = ({
    base,
    fallback,
    widths,
    sizes,
    alt,
    className,
    imgClassName,
    style,
    width,
    height,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority,
}: Props) => {
    const sortedWidths = [...widths].sort((a, b) => a - b);
    const fallbackWidth = sortedWidths[Math.floor(sortedWidths.length / 2)] ?? sortedWidths[0];

    return (
        <picture className={className} style={style}>
            <source type="image/avif" srcSet={buildSrcSet(base, sortedWidths, 'avif')} sizes={sizes} />
            <source type="image/webp" srcSet={buildSrcSet(base, sortedWidths, 'webp')} sizes={sizes} />
            <img
                src={fallback}
                srcSet={`${base}-${fallbackWidth}.webp ${fallbackWidth}w`}
                sizes={sizes}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                className={imgClassName}
            />
        </picture>
    );
};

export default ResponsivePicture;
