import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSubject } from "./features/subjectSlice";
import { addHtmlCss, addJavascript, addReact } from "./features/listSlice";
import store from "./store";

export default function App() {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subject.selectedSubject);
  const htmlCssArray = useSelector((state) => state.list.htmlCss);
  const javascriptArray = useSelector((state) => state.list.javascript);
  const reactArray = useSelector((state) => state.list.react);
  const currentState = store.getState();
  console.log(currentState);

  function handleSubject(e) {
    const selectedSubject = e.currentTarget.getAttribute("data-value");
    dispatch(selectSubject(selectedSubject));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const parentDiv = e.target.closest(`.${styles.card}`);
      const sub = parentDiv.getAttribute("data-value");

      if (sub === "html+css") {
        dispatch(addHtmlCss(e.target.value));
        console.log(htmlCssArray);
      } else if (sub === "javascript") {
        dispatch(addJavascript(e.target.value));
        console.log(javascriptArray);
      } else if (sub === "react") {
        dispatch(addReact(e.target.value));
        console.log(reactArray);
      }

      e.target.value = "";
    }
  }

  function saveTextFile(content, fileName) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={styles.body}>
      <div className={styles.mainContainer}>
        <div
          className={styles.card}
          onClick={(e) => handleSubject(e)}
          data-value="html+css"
        >
          <div className={styles.subject}>
            <input
              type="radio"
              name="subject"
              checked={subject === "html+css"}
              readOnly
            ></input>
            <label htmlFor="Html+css"> HTML + CSS</label>
            <span>+</span>
          </div>
          <div className={styles.list}>
            <ul className={subject === "html+css" ? styles.show : styles.hide}>
              {currentState.list.htmlCss.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>
                <input type="text" onKeyDown={handleKeyDown} />
              </li>
            </ul>
          </div>
        </div>
        <div
          className={styles.card}
          onClick={(e) => handleSubject(e)}
          data-value="javascript"
        >
          <div className={styles.subject}>
            <input
              type="radio"
              name="subject"
              checked={subject === "javascript"}
              readOnly
            ></input>
            <label htmlFor="javascript"> Javascript</label>
            <span>+</span>
          </div>
          <div className={styles.list}>
            <ul
              className={subject === "javascript" ? styles.show : styles.hide}
            >
              {currentState.list.javascript.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>
                <input type="text" onKeyDown={handleKeyDown} />
              </li>
            </ul>
          </div>
        </div>
        <div
          className={styles.card}
          onClick={(e) => handleSubject(e)}
          data-value="react"
        >
          <div className={styles.subject}>
            <input
              type="radio"
              name="subject"
              checked={subject === "react"}
              readOnly
            ></input>
            <label htmlFor="react"> React</label>
            <span>+</span>
          </div>
          <div className={styles.list}>
            <ul className={subject === "react" ? styles.show : styles.hide}>
              {currentState.list.react.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              <li>
                <input type="text" onKeyDown={handleKeyDown} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          saveTextFile(JSON.stringify(store.getState()), "sample2.txt")
        }
      >
        Save Text File
      </button>
    </div>
  );
}
