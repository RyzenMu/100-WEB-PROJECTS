import { useState, useEffect } from "react";
import supabase from "./supabase"; // fixed typo
import styled from "styled-components";

const LI = styled.li`
  list-style: none;
  padding: 10px;
  background-color: #666;
  color: white;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;`   

export default function App() {
  const [trains, setTrains] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTrains, setFilteredTrains] = useState();

  useEffect(() => {
    async function fetchTrains() {
      try {
        const trains = await getTrains();
        setTrains(trains);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTrains();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  console.log("Trains fetched successfully", trains);

  function filterByName() {
    const input = document.querySelector("input[type='text']");
    const value = input.value.toLowerCase();
    const filtered = trains.filter((train) =>
      train.name.toLowerCase().includes(value)
    );
    setFilteredTrains(filtered);
  }

  function filterByDay() {
    const filtered = trains.filter((train) => train.dn === "day");
    setFilteredTrains(filtered);
  }
  function filterByNight() {
    const filtered = trains.filter((train) => train.dn === "night");
    setFilteredTrains(filtered);
  }
  return (
    <div className="App">
      <h1>Trains</h1>
      <p>This is a simple React application.</p>
      <ul>
        {trains.map((train) => (
          <LI key={train.id}>
           {<span>{train.id}</span>}  name: {train.name}<br/> - boardingTime: {train.boardingTime}<br/> -arrivalTime: {train.arrivalTime} 
          </LI> 
        ))}
      </ul>
      <div>
        <button onClick={filterByName}>name</button>
        <button onClick={filterByDay}>day</button>
        <button onClick={filterByNight}>night</button>
        <input type="text" placeholder="Search by name" onChange={filterByName} />
      </div>
      {
        filteredTrains && (
          <div>
            <h2>Filtered Trains</h2>
            <ul>
              {filteredTrains.map((train) => (
                <LI key={train.id}>
                  {<span>{train.id}</span>} name: {train.name}<br/> - boardingTime: {train.boardingTime}<br/> -arrivalTime: {train.arrivalTime} 
                </LI>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
}

async function getTrains() {
  let { data, error } = await supabase.from("trains").select("*");
  if (error) throw error;
  return data;
}


