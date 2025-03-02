import styles from "./App.module.css";
import Homepage from "./components/Homepage";
// import Header from "./components/Header";

function App() {
  return (
    <>
      <div className={styles.container}>
        {/* <Header /> */}
        <Homepage />
      </div>
    </>
  );
}

export default App;
