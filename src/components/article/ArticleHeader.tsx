import { type Post } from '@/types';

import { Chip } from '@components/common/chip';
import { ImageWithSkeleton } from '@components/image-with-skeleton';

const postPathMap: Record<'blog' | 'playground', string> = {
  blog: 'posts',
  playground: 'playground',
};

type ArticleHeaderProps = {
  observerRef: React.RefObject<HTMLDivElement>;
  postType: Post['type'];
  title: string;
  description?: string;
  slug: string;
  tags?: string[];
  publishedAt: string;
};

export const ArticleHeader = ({
  observerRef,
  postType,
  title,
  description,
  slug,
  tags,
  publishedAt,
}: ArticleHeaderProps) => {
  const isLogPost = postType === 'log';
  const postPath = !isLogPost ? postPathMap[postType] : undefined;

  return (
    <div
      className="flex w-full flex-col items-center gap-[4rem]"
      ref={observerRef}
    >
      <section className="flex w-full flex-col items-center px-[2.5rem] desktop:px-[4rem]">
        <span className="text-center text-lg font-bold break-keep text-black tablet:text-xl">
          {title}
        </span>
        <span className="mt-[1rem] text-xs font-medium text-black">
          {publishedAt}
        </span>
        {!isLogPost && description && (
          <span className="mt-[0.75rem] text-center text-sm font-normal break-keep text-gray-3">
            {description}
          </span>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-[2rem] flex w-full max-w-[45rem] shrink-0 flex-wrap items-center justify-center gap-[0.75rem] px-[2rem]">
            {tags.map(tag => (
              <Chip key={tag} name={tag} url={`/posts?tags=${tag}`} />
            ))}
          </div>
        )}
      </section>

      {postPath && (
        <section className="relative h-[16rem] w-full overflow-hidden rounded-2xl tablet:h-[24rem]">
          <ImageWithSkeleton
            src={`/${postPath}/${slug}/thumbnail-large.webp`}
            alt="post thumbnail"
            className="border-none"
          />
        </section>
      )}
    </div>
  );
};
