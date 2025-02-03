import styles from "./Carousel.module.css";

function Carousel() {
  let index = 0;
  function leftButton(step) {
    // const images = document.querySelectorAll(`.${styles.image}`);
    const total = 5;
    index = (index + step + total) % total;
    console.log(index);
    // images.forEach((item) => {
    //   item.classList.remove(styles.image);
    //   item.classList.add(styles.left);
    // });
  }
  return (
    <div className={styles.carousel}>
      <>
        <p>Carousel</p>
        <button onClick={leftButton(-1)}>left</button>
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
