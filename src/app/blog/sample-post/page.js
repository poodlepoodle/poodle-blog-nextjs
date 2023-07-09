'use client';

import styles from './styles.module.css';

import { useState, useEffect } from 'react';

import Like from '@/app/components/common/Like';
import Image from 'next/image';

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Root font size
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const scrollThreshold = rootFontSize * 18.875;

    const onScroll = () => {
      const scrolled =
        window.scrollY > scrollThreshold &&
        document.documentElement.scrollHeight -
          window.innerHeight -
          window.scrollY >=
          scrollThreshold;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className={isScrolled ? styles.layout__focused : styles.layout}>
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
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

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
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>

          <div className={styles.content__type__paragraph}>
            <span>
              오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은
              정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리
              범위 지정, @property, font-size-adjust, 선언적 쉐도우 DOM 등 135개
              이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit
              기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다.
              한편, 새로운 기능 및 수정 사항의 종합적인 목록은 사파리 16.4 베타
              1 릴리즈 노트에서 확인할 수 있습니다. 사파리는 잠시 제쳐두고 iOS
              및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.
            </span>
          </div>
        </main>

        <footer className={styles.content__footer}>
          <Like likeCount={123} />
        </footer>
      </div>
    </section>
  );
}
