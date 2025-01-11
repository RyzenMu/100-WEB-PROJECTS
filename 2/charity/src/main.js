import Card from "./section-2.cards";
import icon1 from "./img/section-2-icon-1.svg";
import icon2 from "./img/section-2-icon-2.svg";
import icon3 from "./img/section-2-icon-3.svg";

function Main() {
  return (
    <div>
      <section className="section-1">
        <p className="section-1-text">Our Helping to the World &emsp;</p>
        <button
          style={{
            border: "none",
            backgroundColor: "rgba(0,255,0, 0.345)",
            marginRight: "10%",
          }}
        >
          Donate
        </button>
      </section>
      <section className="section-2">
        <div className="section-2-title">
          <p>What we are Doing</p>
          <h3>We are in a mission to help helpless</h3>
        </div>

        <div className="section-2-cards">
          <Card>
            <img src={icon1} alt="icon1" />
          </Card>

          <Card>
            <img src={icon2} alt="icon2" />
          </Card>

          <Card>
            {" "}
            <img src={icon3} alt="icon3" />
          </Card>
        </div>
      </section>
      <section className="section-3">Section 3</section>
      <section className="section-4">Section 4</section>
      <section className="section-5">Section 5</section>
      <section className="section-6">Section 6</section>
      <section className="section-7">Section 7</section>
    </div>
  );
}

export default Main;
