import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Spinner</h1>
      <Spinner />
    </div>
  );
}

function Spinner() {
  return <div className="spinner"></div>;
}