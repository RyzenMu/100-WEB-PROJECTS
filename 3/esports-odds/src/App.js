import "./App.css";

function App() {
  return (
    <div className="total">
      <div className="table">
        <div>Player info</div>
        <div>Team</div>
        <div>Stat type</div>
        <div>points</div>
        <div>multi</div>
        <div>percentage</div>
        <div>difference</div>
        <div>price pick link</div>
      </div>
      <div className="table">
        <div>p1</div>
        <div>A</div>
        <div>PUBG</div>
        <div className="points">100</div>
        <div>2.5x</div>
        <div>47</div>
        <div>300</div>
        <div>
          <input type="check" />
        </div>
      </div>
      <div className="table">
        <div>p2</div>
        <div>B</div>
        <div>Galaxy</div>
        <div className="points">200</div>
        <div>3.5x</div>
        <div>85</div>
        <div>100</div>
        <div>
          <input type="check" />
        </div>
      </div>
      <div className="table">
        <div>p3</div>
        <div>C</div>
        <div>ion</div>
        <div className="points">450</div>
        <div>0.5x</div>
        <div>44</div>
        <div>600</div>
        <div>
          <input type="check" />
        </div>
      </div>
    </div>
  );
}

export default App;
