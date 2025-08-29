import type { Metadata } from 'next';

import styles from './styles.module.css';
import PostGrid from '@components/post-grid';
import { getPlaygroundPosts } from '@utils/get-posts';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '플레이그라운드 ••• 푸들 블로그',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    ...METADATA_OG_WEBSITE_PRESET,
    url: '/playground',
  },
};

export default async function Page() {
  const posts = await getPlaygroundPosts();

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
