import styles from './styles.module.css';

export default function Page() {
  return (
    <>
      <section className={styles.layout}>
        <div className={styles.container}>
          <h1>
            새로운 기술이 파도처럼 몰려와도
            <br />
            지워지지 않을 <strong>개발자국</strong>을 남깁니다.
          </h1>
        </div>
      </section>

      <div className={styles.video__container}>
        <video
          src={`/blog/video_1.mp4`}
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
