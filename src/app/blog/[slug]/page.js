import styles from './styles.module.css';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPost, getPosts } from '@lib/get-posts';
import Like from '@components/like';
import { PostBody } from '@/mdx/post-body';
import Tag from '@components/tag';

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export default async function Page({ params }) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) return notFound();

  // console.log(post);

  //  title: 'The First Sample Post',
  // description: "It shouldn't take this much work to publish a small library",
  // slug: 'sample-post-one',
  // tags: [ 'Next.js', 'SSR', '최적화' ],
  // thumbnail: '/blog/1.png',
  // date: 2023-09-01T17:53:59.000Z,
  // body: '\n' +

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <header className={styles.content__header}>
          <span className={styles.title}>{post.title}</span>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </span>
        </header>

        <main className={styles.content__container}>
          <div className={styles.content__type__image}>
            <div>
              <Image
                src="/blog/sample.png"
                alt="sample image"
                width={960}
                height={540}
              />
            </div>
            <span>
              https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
            </span>
          </div>
        </main>

        <PostBody>{post.body}</PostBody>

        <footer className={styles.content__footer}>
          <Like likeCount={123} />
        </footer>
      </div>
    </section>
  );
}
