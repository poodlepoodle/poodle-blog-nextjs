import Image from 'next/image';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
};

export default function ResponsiveImage({
  src,
  alt,
  style,
}: ResponsiveImageProps) {
  return (
    <Image src={src} alt={alt} fill style={{ objectFit: 'cover', ...style }} />
  );
}
