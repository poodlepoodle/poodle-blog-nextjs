import styles from './styles.module.css';

export default function Page() {
  return (
    <>
      <section className={styles.layout}>
        <div className={styles.container}>공사 중...</div>
      </section>

      <div className={styles.video__container}>
        <video
          src={`/blog/video_3.mp4`}
          autoPlay
          muted
          loop
          className={styles.video__background}
        >
          비디오 재생 불가...
        </video>
      </div>
    </>
  );
}
