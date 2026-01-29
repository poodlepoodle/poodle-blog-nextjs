import styles from './image-marquee.module.css';
import Image from 'next/image';
import { cn } from '@/utils/cn';

const images = [
  { src: '/playground/image-marquee/puppy/1.jpg', alt: 'image 1' },
  { src: '/playground/image-marquee/puppy/2.jpg', alt: 'image 2' },
  { src: '/playground/image-marquee/puppy/3.jpg', alt: 'image 3' },
  { src: '/playground/image-marquee/puppy/4.jpg', alt: 'image 4' },
  { src: '/playground/image-marquee/puppy/5.jpg', alt: 'image 5' },
  { src: '/playground/image-marquee/puppy/6.jpg', alt: 'image 6' },
  { src: '/playground/image-marquee/puppy/7.jpg', alt: 'image 7' },
  { src: '/playground/image-marquee/puppy/8.jpg', alt: 'image 8' },
  { src: '/playground/image-marquee/puppy/9.jpg', alt: 'image 9' },
  { src: '/playground/image-marquee/puppy/10.jpg', alt: 'image 10' },
];

const logoImages = [
  { src: '/playground/image-marquee/football/1.png', alt: 'image 1' },
  { src: '/playground/image-marquee/football/2.png', alt: 'image 2' },
  { src: '/playground/image-marquee/football/3.png', alt: 'image 3' },
  { src: '/playground/image-marquee/football/4.png', alt: 'image 4' },
  { src: '/playground/image-marquee/football/5.png', alt: 'image 5' },
  { src: '/playground/image-marquee/football/6.png', alt: 'image 6' },
];

export const ImageMarquee = () => {
  const repeatedImages = [...images, ...images];
  return (
    <div className="relative max-w-[100rem] overflow-hidden">
      <div className={cn(styles.animate_scroll, 'flex w-max')}>
        {repeatedImages.map((image, idx) => (
          <div
            key={idx}
            className="relative ml-[1rem] h-[16rem] w-[16rem] flex-shrink-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const LogoMarquee = () => {
  const repeatedImages = [...logoImages, ...logoImages];

  return (
    <div className="relative max-w-[100rem] overflow-hidden">
      <div className={cn(styles.animate_scroll, 'flex w-max')}>
        {repeatedImages.map((image, idx) => (
          <div
            key={idx}
            className="relative ml-[6rem] h-[4rem] w-[4rem] flex-shrink-0 grayscale"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
