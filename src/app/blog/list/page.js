import { getPosts } from '@/lib/get-posts';
import SearchPage from '@/app/components/search/page';
import { Suspense } from 'react';

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Suspense>
      <SearchPage posts={sortedPosts} />;
    </Suspense>
  );
}
