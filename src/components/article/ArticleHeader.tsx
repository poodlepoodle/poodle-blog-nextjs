import { Chip } from '@components/common/chip';
import { ResponsiveImage } from '@components/common/responsive-image';

type ArticleHeaderProps = {
  observerRef: React.RefObject<HTMLDivElement>;
  title: string;
  description?: string;
  slug: string;
  tags?: string[];
  publishedAt: string;
};

export const ArticleHeader = ({
  observerRef,
  title,
  description,
  slug,
  tags,
  publishedAt,
}: ArticleHeaderProps) => {
  const isBlogPost = !!description;
  const postPath = isBlogPost ? 'posts' : 'playground';

  return (
    <div
      className="flex w-full flex-col items-center gap-[4rem]"
      ref={observerRef}
    >
      <section className="flex w-full flex-col items-center px-[2.5rem] desktop:px-[4rem]">
        <span className="text-center text-lg font-semibold break-keep text-black tablet:text-xl">
          {title}
        </span>
        <span className="mt-[1rem] text-xs font-normal text-black">
          {publishedAt}
        </span>
        {description && (
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

      <section className="relative h-full min-h-[16rem] w-full overflow-hidden rounded-2xl shadow-natural tablet:min-h-[24rem]">
        <ResponsiveImage
          src={`/${postPath}/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
        />
      </section>
    </div>
  );
};
