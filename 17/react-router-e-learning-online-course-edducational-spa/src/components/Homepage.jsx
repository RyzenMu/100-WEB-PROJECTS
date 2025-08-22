import styles from "./Homepage.module.css";

function FeatureCard({ i }) {
  return (
    <div className={styles.featureCard}>
      <h1>{i + 1}</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, dolor.
      </p>
    </div>
  );
}

function Homepage() {
  return (
    <div>
      <h1 className={styles.mainHeading}>UNLOCK your potential</h1>
      <div className={styles.features}>
        <h2>features</h2>
        {Array.from({ length: 10 }, (_, i) => (
          <FeatureCard i={i} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
