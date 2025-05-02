import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import styled from 'styled-components'
// supabase

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk";
const supabase = createClient(supabaseUrl, supabaseKey);

//api to fetch data
async function fetchData() {
  const { data, error } = await supabase.from("clothes").select("*");
  if (error) throw new Error(error.message);
  return data;
}
const queryClient = new QueryClient();

export default function App() {
  const [pageNo, setPageNo] = useState(1);
  return (
    <QueryClientProvider client={queryClient}>
      <DisplayCards pageNo={pageNo}/>
      <Footer pageNo={pageNo} onSetPageNo={setPageNo}/>
    </QueryClientProvider>
  );
}

function DisplayCards({pageNo}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["clothes"],
    queryFn: fetchData,
  });
  if (error) throw new Error(error.message);
  if (isLoading) return <p>Loading</p>;

  return <DisplayCard data={data} pageNo={pageNo}/>;
}

function DisplayCard({ data, pageNo}) {
  const startPageNo = pageNo == 1 ? 1 : ((pageNo *10)+1);
  const endPageNo = pageNo ==1 ? 10 : ((pageNo+1)*10);
  console.log("start page number", startPageNo)
  console.log("end page number", endPageNo)
  return (
    <div>
      {data.map((cloth) => {
        if (cloth.id < startPageNo || cloth.id >endPageNo) return;
        return (
          <div className="border rounded p-5 flex flex-col items-center justify-center" key={cloth.id}>
            <div className="flex">
              <b>id : </b> <p>{cloth.id}</p>
            </div>
            <div className="flex">
              <b>name : </b> <p>{cloth.name}</p>
            </div>
            <div className="flex">
              <b>size : </b> <p>{cloth.size}</p>
            </div>
            <div className="flex">
              <b>price : </b> <p>{cloth.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Button = styled.button`
  border: 2px solid black;
  background-color: lightblue;
  color: #333;
  padding: 2%;
`

function Footer({pageNo, onSetPageNo}){
  function previous(){
    onSetPageNo(prev => prev-1)
  }
  function next(){
    onSetPageNo(prev => prev+1)
  }
  return (
    <div className="flex gap-2 justify-between mx-8">
      <Button onClick={previous} disabled={pageNo===1}>Prev</Button>
      <Button>{pageNo}</Button>
      <Button onClick={next} disabled={pageNo===9}>Next</Button>
    </div>
  )
}
