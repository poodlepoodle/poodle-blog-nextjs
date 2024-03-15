import styles from './styles.module.css';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import Like from '@components/like';
import ArticleBackground from '@components/article-background';
import Tag from '@components/tag';
import { getPost, getPosts } from '@lib/get-posts';
import { PostBody } from '@/mdx/post-body';

export async function generateMetadata({ params }, parent) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) return notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${post.title} ••• poodlepoodle`,
    description:
      '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
    openGraph: {
      images: [...previousImages],
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
    <ArticleBackground>
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

          <div className={styles.profile__container}>
            <div className={styles.content__footer__profile}>
              <span>published by</span>
              <h6>Eojin Choi</h6>
            </div>
            <div className={styles.content__footer__image}>
              <Image
                src={`/blog/article-profile.png`}
                alt="article profile"
                fill
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          </div>
        </footer>
      </div>
    </ArticleBackground>
  );
}
