import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// supabase

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fpfkqstfkcewfgluidkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZmtxc3Rma2Nld2ZnbHVpZGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODk4ODcsImV4cCI6MjA1OTI2NTg4N30.1pl6ZqjUxBHGVxIgRDX_OC8dvm3rs1htIW1jC0YQPHw";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("supabase fetching error");
  return cabins;
}

function Cabins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error:{error.messaage}</p>;
  console.log(data);
  return (
    <div>
      {data.map(cabin => <CabinCard cabin={cabin} key={cabin.id}/>)}
    </div>
  );
}

function CabinCard({ cabin }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "16px",
      maxWidth: "400px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "sans-serif"
    }}>
      <img
        src={cabin.image}
        alt={cabin.name}
        style={{
          width: "100%",
          borderRadius: "8px",
          objectFit: "cover",
          marginBottom: "12px"
        }}
      />
      <h2>Cabin {cabin.name}</h2>
      <p><strong>Description:</strong> {cabin.describtion}</p>
      <p><strong>Max Capacity:</strong> {cabin.maxCapacity} guests</p>
      <p><strong>Regular Price:</strong> ${cabin.regularPrice}</p>
      <p><strong>Discount:</strong> {cabin.discount}% off</p>
      <p style={{ fontSize: "0.9em", color: "gray" }}>
        <strong>Created:</strong> {new Date(cabin.created_at).toLocaleString()}
      </p>
    </div>
  );
}


export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <h1>tanstack query</h1>
      <Cabins />
    </QueryClientProvider>
  );
}
