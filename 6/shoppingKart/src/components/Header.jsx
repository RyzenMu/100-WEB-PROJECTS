import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <h1 className={styles.body}>Leading Shopping site for Electronics</h1>
      <div className={styles.mainHeader}>
        <div className="logo">Logo</div>
        <div className={styles.products}>
          <div className="product">product1</div>
          <div className="product">product2</div>
          <div className="product">product3</div>
          <div className="product">product4</div>
        </div>
        <div className={styles.icons}>
          <div className="login">login</div>
          <div className="kart">Register</div>
          <div className="kart">kart</div>
        </div>
      </div>
    </>
  );
}

export default Header;
