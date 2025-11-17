import Image from 'next/image';

type ResponsiveImageProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
};

export const ResponsiveImage = ({ src, alt, style }: ResponsiveImageProps) => {
  return (
    <Image src={src} alt={alt} fill className="object-cover" style={style} />
  );
};
