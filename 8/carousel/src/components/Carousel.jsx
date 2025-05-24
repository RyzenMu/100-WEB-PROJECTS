import styles from "./Carousel.module.css";

function Carousel() {
  function leftButton() {
    const image = document.querySelectorAll(`.${styles.image}`);
    image.forEach((img) => img.classList.remove(styles.image));
    image.forEach((img) => img.classList.add(styles.left));
  }
  return (
    <div className={styles.carousel}>
      <>
        <p>Carousel</p>
        <button onClick={leftButton}>left</button>
        <button>right</button>
      </>

      <div className={styles.carousel_container}>
        <div className={styles.image}>IMAGE1</div>
        <div className={styles.image}>IMAGE2</div>
        <div className={styles.image}>IMAGE3</div>
        <div className={styles.image}>IMAGE4</div>
        <div className={styles.image}>IMAGE5</div>
      </div>
    </div>
  );
}

export default Carousel;
