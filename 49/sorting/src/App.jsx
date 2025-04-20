import styled from "styled-components";
import { useState } from "react";

const H1 = styled.h1`
  color: #333;
  font-size: 2em;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1.2em;
  font-family: Arial, sans-serif;
  text-align: left;
  border: 1px solid #ddd;

  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  th:last-child,
  td:last-child {
    border-right: none; /* remove right border on last column */
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

const originalData = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 20 },
  { id: 4, name: 'Alice', age: 28 },
  { id: 5, name: 'Charlie', age: 35 },
  { id: 6, name: 'David', age: 22 },
  { id: 7, name: 'Eve', age: 27 },
  { id: 8, name: 'Frank', age: 29 },
  { id: 9, name: 'Grace', age: 24 },
  { id: 10, name: 'Hank', age: 31 },
  { id: 11, name: 'Ivy', age: 26 },
  { id: 12, name: 'Jack', age: 32 },
  { id: 13, name: 'Kate', age: 23 },
  { id: 14, name: 'Leo', age: 34 },
  { id: 15, name: 'Mia', age: 21 },
  { id: 16, name: 'Nina', age: 33 },
  { id: 17, name: 'Oscar', age: 19 },
  { id: 18, name: 'Paul', age: 36 },
  { id: 19, name: 'Quinn', age: 18 },
  { id: 20, name: 'Ray', age: 37 }
];

export default function App() {
  const [idDesc, setIdDesc] = useState(false);
  const [nameAsc, setNameAsc] = useState(false);
  const [ageAsc, setAgeAsc] = useState(false);
  const [sortedData, setSortedData] = useState(originalData);

  function sortById(){
  const newOrder = !idDesc;
  setIdDesc(newOrder);
  const sorted = [...sortedData].sort((a,b ) => newOrder ? b.id - a.id : a.id - b.id);
  setSortedData(sorted);
  }

  function sortByName(){
    const newOrder = !nameAsc;
    setNameAsc(newOrder);
    const sorted = [...sortedData].sort((a,b) => newOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    setSortedData(sorted);
  }

  function sortByAge(){
    const newOrder = !ageAsc;
    setAgeAsc(newOrder);
    const sorted = [...sortedData].sort((a,b) => newOrder ? a.age - b.age : b.age - a.age);
    setSortedData(sorted);
  }

  return (
    <div>
      <H1>Sorting</H1>
      <Table>
        <thead>
          <tr>
            <th onClick={sortById}>ID</th>
            <th onClick={sortByName}>Name</th>
            <th onClick={sortByAge}>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


