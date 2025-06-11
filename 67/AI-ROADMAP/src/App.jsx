import { useState } from "react";
import supabase from "./supabase";
import { insertData, getData } from "./supabase";
const supabaseConcepts = await getData();
const data = [
  { id: 1, title: "python basics", completed: true },
  { id: 2, title: "statistics concepts", completed: false },
  { id: 3, title: "scikit", completed: false },
  { id: 5, title: "python dsa", completed: false },
  { id: 6, title: "python dsa", completed: false },
  { id: 7, title: "SQL", completed: false },
  { id: 8, title: "math concepts", completed: false },
  { id: 9, title: "linear algebra", completed: false },
  { id: 10, title: "calculus", completed: false },
  { id: 11, title: "probability and statistics", completed: false },
  { id: 12, title: "machine learning tools", completed: false },
  { id: 13, title: "Machine Learning fundamental concepts", completed: false },
  { id: 14, title: "Data handling", completed: false },
  { id: 15, title: "pandas", completed: false },
  { id: 16, title: "Numpy", completed: false },
  { id: 17, title: "supervised learning", completed: false },
  { id: 18, title: "un supervised learning", completed: false },
  { id: 19, title: "machine learning Algorithms", completed: false },
  { id: 20, title: "Tensor flow", completed: false },
  { id: 21, title: "pytorch", completed: false },
  { id: 22, title: "deep learning", completed: false },
  { id: 23, title: "Computer Vision", completed: false },
  { id: 24, title: "Natural Language Processing", completed: false },
  { id: 25, title: "Natural Language Processing", completed: false },
  { id: 26, title: "Natural Language Processing", completed: false },
];

export default function App() {
  console.log(supabaseConcepts)
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}

function Header() {
  const [count, setCount] = useState(79)
    const [newData, setNewData] = useState({
    id: 0,
    title: "",
    completed: false,
  });
  function addButtonClick() { 
    insertData(newData);
    console.log(newData) 
    setCount(count=> count+1)
    setNewData({
      id:count,
      title:'', 
      completed: false
    })
  }
  function inputValue(e){
    setNewData({
      id:count,
      title:e.target.value,
      completed: false
    });
  }
  function handleKeyDown(e){
    if (e.key==='Enter') addButtonClick()
  }
  return (
    <div className="border bg-gradient-to-r from-blue-500 to-red-500 text-white">
      <h1 className="text-center text-5xl">AI ROADMAP AND CONCEPTS</h1>
      <label className="px-4">Add a concept</label>
      <input
        type="text"
        className="border rounded-full px-4 mb-4"
        placeholder="enter concept"
        onChange={(e)=>inputValue(e)}
        value={newData.title}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="bg-red-400 px-6 mx-7 rounded-full hover:bg-red-800"
        onClick={addButtonClick}
      >
        Add
      </button>
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-slate-400 text-white flex justify-center">
      <Concept />
    </div>
  );
}

function Concept() {
  return (
    <div className="flex w-[100vw] flex-wrap gap-2 justify-center">
      {data.map((concept) => {
        return (
          <div
            key={concept.id}
            className="flex my-2 text-2xl bg-slate-700 my-7 p-3 rounded-full w-fit"
          >
            <p className="mx-3">{concept.id}</p>
            <h1 className="mx-3">{concept.title}</h1>
            {concept.completed ? (
              <span className="mx-6 ml-auto">✅</span>
            ) : (
              <button className="mx-7 text-sm bg-red-500 p-2 rounded-full ml-auto cursor-pointer">
                mark completed
              </button>
            )}
          </div>
        );
      })}
      <p>new</p>
       {supabaseConcepts.map((concept) => {
        return (
          <div
            key={concept.id}
            className="flex my-2 text-2xl bg-slate-700 my-7 p-3 rounded-full w-fit"
          >
            <p className="mx-3">{concept.id}</p>
            <h1 className="mx-3">{concept.title}</h1>
            {concept.completed ? (
              <span className="mx-6 ml-auto">✅</span>
            ) : (
              <button className="mx-7 text-sm bg-red-500 p-2 rounded-full ml-auto cursor-pointer">
                mark completed
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
