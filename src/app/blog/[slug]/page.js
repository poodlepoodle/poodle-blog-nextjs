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

        <section className={styles.content__container}>
          <div className={styles.content__type__image}>
            <Image
              src={post.thumbnail}
              alt="post thumbnail"
              fill
              style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
            />
            {/* <span>
              이미지-출처
            </span> */}
          </div>
        </section>

        <PostBody>{post.body}</PostBody>

        <footer className={styles.content__footer}>
          {/* <Like likeCount={123} /> */}
        </footer>
      </div>
    </section>
  );
}
