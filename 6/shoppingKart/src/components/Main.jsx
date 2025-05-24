import styles from "./Main.module.css";
import cheerGirl from "../assets/images/cheer-girl.jpg";

function Main() {
  return (
    <div className={styles.body}>
      <section className="section1">
        <div className={styles.heroContainer}>
          <div className={styles.hero}>
            <h2>DON'T LET THEM GIVE YOU A BONUS FOR HARE!!</h2>
            <h3>
              ALL YOUR DTF TEXTILE METERS FOR €7.30/m. For orders over 10m.
            </h3>
            <p>
              At DTF X METROS we offer the most complete DTF service and the
              best price on the market guaranteed. Place your minimum order of
              10m and get this promotion.
            </p>
            <p className={styles.features}>
              <span>✔️feature1</span>
              <span>✔️feature2</span>
              <span>✔️feature2</span>
            </p>
            <div className={styles.buttons}>
              <button className={styles.startOrder}>start order</button>
              <button className={styles.contactUs}>Contact us here</button>
            </div>
          </div>
          <div className={styles.pic}>
            <img src={cheerGirl} alt="cheer-girl" />
          </div>
        </div>
      </section>
      <section className="section2">
        <h1 className={styles.ms2h1}>
          The best option (literally) for DTF printing to grow your business
        </h1>
        <h2 className={styles.ms2h2}>High quality full color prints</h2>
        <div className={styles.ms2grid}>
          <div className={styles.ms2grid1}>
            <icon>icon</icon>
            <h1>Heading</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              quae enim at culpa corrupti quia.
            </p>
          </div>
          <div className={styles.ms2grid2}>
            <icon>icon</icon>
            <h1>Heading</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              quae enim at culpa corrupti quia.
            </p>
          </div>
          <div className={styles.ms2grid3}>
            <icon>icon</icon>
            <h1>Heading</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              quae enim at culpa corrupti quia.
            </p>
          </div>
          <div className={styles.ms2grid4}>
            <icon>icon</icon>
            <h1>Heading</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              quae enim at culpa corrupti quia.
            </p>
          </div>
        </div>
        <div className={styles.ms2info}>
          <h1>Information Note</h1>
          <p>User registration and sign-up is done at the end of the order.</p>
        </div>
      </section>
    </div>
  );
}

export default Main;
