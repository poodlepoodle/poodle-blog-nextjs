import styles from './styles.module.css';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import Giscus from '@components/giscus';
import Spotlight from '@components/spotlight';
import Tag from '@components/tag';
import { getPost, getPosts } from '@lib/get-posts';
import { PostBody } from '@/mdx/post-body';

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
    <div className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.content__header}>
          <span className={styles.title}>{post.title}</span>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </span>
        </section>

        <section className={styles.content__container}>
          <div className={styles.content__type__image}>
            <Image
              src={`/blog/posts/${slug}/thumbnail-large.jpg`}
              alt="post thumbnail"
              fill
              style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
            />
          </div>
        </section>

        <PostBody>{post.body}</PostBody>

        <section className={styles.content__footer}>
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

          <Giscus />
        </section>
      </div>

      <Spotlight />
    </div>
  );
}
