import styles from './styles.module.css';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPost } from '@lib/get-posts';
import Like from '@components/like';

export default async function Page({ params }) {
  const slug = params.slug;
  const post = await getPost(slug);
  if (!post) return notFound();

  // console.log(post);

  const dateParam = new Date(post.date);
  const formattedDate =
    dateParam.getFullYear() +
    '-' +
    (dateParam.getMonth() < 9
      ? '0' + dateParam.getMonth()
      : dateParam.getMonth()) +
    '-' +
    (dateParam.getDate() < 9 ? '0' + dateParam.getDate() : dateParam.getDate());

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
          <span className={styles.date}>{formattedDate}</span>
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

          <div>
            <span>{post.body}</span>
          </div>
        </main>

        <footer className={styles.content__footer}>
          <Like likeCount={123} />
        </footer>
      </div>
    </section>
  );
}
