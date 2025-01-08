import "./App.css";
import kanyakumariPic from "./img/kanyakumari.png";
import thirunelveliPic from "./img/tirunelveli.png";

function App() {
  function handleClick(e) {
    const modalEl = document.querySelector(".modal");
    modalEl.classList.toggle("show-modal");
    console.log(e.target.dataset.location);
    const clickedEl = e.target;
    console.log(clickedEl);
    // append-child
    const modalImg = document.querySelector(".modal-img");
    console.log(modalImg);
    modalImg.appendChild(clickedEl);
  }

  return (
    <div className="App">
      <div className="modal">
        <div className="modal-img"></div>
      </div>

      <img
        src={kanyakumariPic}
        alt="pic of kanyakumari"
        onClick={handleClick}
        data-location="kanyakumari"
      />

      <img
        src={thirunelveliPic}
        alt="pic of tirunelveli"
        onClick={handleClick}
        data-location="tirunelveli"
      />
    </div>
  );
}

export default App;
