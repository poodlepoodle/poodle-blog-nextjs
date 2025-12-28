import { type Post } from '@/types';

import { PlaygroundGridItem } from './PlaygroundGridItem';

export const PlaygroundGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-[1.5rem] px-[2.5rem] tablet:grid-cols-2 tablet:gap-[0.5rem] desktop:grid-cols-3 desktop:px-0">
      {posts.map(post => (
        <PlaygroundGridItem key={post.slug} post={post} />
      ))}
    </div>
  );
};
