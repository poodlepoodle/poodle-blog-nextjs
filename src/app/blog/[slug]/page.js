import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@lib/get-posts';
import { PostBody } from '@/mdx/post-body';

import Article from '@components/article';

export async function generateMetadata({ params }, parent) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) return notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://poodlepoodle.me'),
    title: `${post.title} ••• poodlepoodle`,
    description:
      '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
    openGraph: {
      images: [`/blog/posts/${slug}/thumbnail-large.jpg`, ...previousImages],
    },
  };
}

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export default async function Page({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return (
    <Article slug={slug} post={post}>
      <PostBody>{post.body}</PostBody>
    </Article>
  );
}
