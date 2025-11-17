import { Post } from '@/types';

import { PostGridItem } from './PostGridItem';

export const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-x-[1.5rem] gap-y-items px-[2.5rem] tablet:grid-cols-2 desktop:grid-cols-3 desktop:px-0">
      {posts.map((post, index) => (
        <PostGridItem
          key={post.slug}
          post={post}
          className={index === 0 ? 'desktop:col-span-2' : ''}
        />
      ))}
    </div>
  );
};
