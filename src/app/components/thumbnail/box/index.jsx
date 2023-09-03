import styles from './box.module.css';

import ThumbnailRow from '@components/thumbnail/row';

export default function Box({ posts }) {
  // title: 'The First Sample Post',
  //   description: "It shouldn't take this much work to publish a small library",
  //   slug: 'sample-post-one',
  //   tags: [ 'Next.js', 'SSR', '최적화' ],
  //   thumbnail: '',
  //   date: 2023-09-01T17:53:59.000Z,
  //   body

  return (
    <div className={styles.layout}>
      {posts.map(({ title, slug, tags, thumbnail, date }) => {
        return (
          <ThumbnailRow
            key={slug}
            title={title}
            slug={slug}
            tags={tags}
            thumbnail={thumbnail}
            date={date}
          />
        );
      })}
    </div>
  );
}
