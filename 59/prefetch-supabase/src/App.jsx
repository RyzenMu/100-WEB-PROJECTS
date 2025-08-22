import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styled from "styled-components";
import supabase from "./supabase.js";
import { useEffect } from "react";

// Function to fetch data from Supabase
async function getData() {
  let { data: Toronto_Crimes, error } = await supabase
    .from("Toronto_Crimes")
    .select("*");

  if (error) throw new Error(error.message);
  return Toronto_Crimes;
}

const queryClient = new QueryClient();

// Create styled components for better UI presentation
const CrimeList = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CrimeItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 3px;
`;

async function getPreFetchedData() {
  const assault = await queryClient.fetchQuery({
    queryKey: ["assault"],
    queryFn: getAssault,
  });
  const bae = await queryClient.fetchQuery({
    queryKey: ["bae"],
    queryFn: getBae,
  });
  const theft = await queryClient.fetchQuery({
    queryKey: ["theft"],
    queryFn: getTheft,
  });
  console.log({ assault, bae, theft });
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Toronto Crimes</h1>
        <Display />
      </div>
    </QueryClientProvider>
  );
}

function Display() {
  useEffect(() => {
    getPreFetchedData();
  }, []);
  const {
    isLoading,
    error,
    data: Toronto_Crimes,
  } = useQuery({
    queryKey: ["crimes"],
    queryFn: getData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <CrimeList>
      {Toronto_Crimes.map((crime) => (
        <CrimeItem key={crime._id}>
          <p>Category: {crime.OFFENCE}</p>
          <p>Date: {crime.REPORT_DATE}</p>
          <p>Location: {crime.NEIGHBOURHOOD_158}</p>
        </CrimeItem>
      ))}
    </CrimeList>
  );
}

async function getAssault() {
  const { data, error } = await supabase
    .from("Toronto_Crimes")
    .select("*")
    .eq("OFFENCE", "Assault")
  if (error) throw new Error(error.message);
  return data;
}
async function getBae() {
  const { data, error } = await supabase
    .from("Toronto_Crimes")
    .select("*")
    .eq("OFFENCE", "B&E")
  if (error) throw new Error(error.message);
  return data;
}
async function getTheft() {
  const { data, error } = await supabase
    .from("Toronto_Crimes")
    .select("*")
    .eq("OFFENCE", "Theft Of Motor Vehicle")
  if (error) throw new Error(error.message);
  return data;
}
