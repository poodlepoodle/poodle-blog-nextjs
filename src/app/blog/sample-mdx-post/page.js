// 'use client';

import styles from './styles.module.css';

// import { useState, useEffect } from 'react';

import Image from 'next/image';

import { getPosts } from '@lib/get-posts';
import Like from '@components/like';

export default async function Page() {
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   // Root font size
  //   const rootFontSize = parseFloat(
  //     getComputedStyle(document.documentElement).fontSize
  //   );
  //   const scrollThreshold = rootFontSize * 18.875;

  //   const onScroll = () => {
  //     const scrolled =
  //       window.scrollY > scrollThreshold &&
  //       document.documentElement.scrollHeight -
  //         window.innerHeight -
  //         window.scrollY >=
  //         scrollThreshold;
  //     setIsScrolled(scrolled);
  //   };

  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  const posts = await getPosts();
  // console.log(posts);

  // 사용 방법
  // const posts = await getPosts();
  // const post = await getPost('my-post');

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <header className={styles.content__header}>
          <span className={styles.title}>
            iOS 및 iPadOS에서의 웹 앱용 웹 푸시
          </span>
          <span className={styles.date}>2000.00.00</span>
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

          <div className={styles.content__type__paragraph}>
            <ul>
              {posts.map(({ title }) => {
                return <li>{title}</li>;
              })}
            </ul>
          </div>
        </main>

        <footer className={styles.content__footer}>
          <Like likeCount={123} />
        </footer>
      </div>
    </section>
  );
}
