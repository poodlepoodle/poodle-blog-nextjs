import type { BlogPost } from '@/types';

import { Chip } from '@components/common/chip';
import Icon from '@components/icon';
import { ResponsiveImage } from '@components/common/responsive-image';
import Link from 'next/link';

const UpdatedIcon = () => {
  return (
    <Icon width={5} height={5} color="var(--color-skyblue)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" fill="none">
        <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
      </svg>
    </Icon>
  );
};

export const PostListItem = ({ post }: { post: BlogPost }) => {
  const { title, slug, tags, publishedAt, updated } = post;
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex w-full justify-between rounded-2xl bg-white"
    >
      <div className="flex h-full w-full flex-col justify-between gap-items p-[2rem]">
        <div className="flex flex-wrap justify-start gap-[0.75rem]">
          {tags.map(name => (
            <Chip key={name} name={name} />
          ))}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-normal text-black">{publishedAt}</span>
          <div className="mt-[0.5rem] flex items-center gap-[0.5rem]">
            {updated && <UpdatedIcon />}
            <span className="text-lg font-semibold break-keep text-black tablet:text-xl">
              {title}
            </span>
          </div>
        </div>
      </div>

      <div
        className="m-[1.5rem] hidden h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden shadow-tiny grayscale transition-all duration-600 group-hover:grayscale-0 tablet:block"
        style={{
          borderRadius: '35% 65% 69% 31% / 58% 49% 51% 42%',
        }}
      >
        <ResponsiveImage
          src={`/posts/${slug}/thumbnail.jpg`}
          alt="post thumbnail"
        />
      </div>
    </Link>
  );
};
