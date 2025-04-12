import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GetCabins from "./GetCabins";
import GetCabinById from "./GetCabinById";
import DeleteCabinById from "./DeleteCabinById"

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Toaster position="top-center" reverseOrder={false} />
      <h1 style={{ textAlign: "center", margin: "20px" }}>Cabin Management</h1>
      <GetCabins />
      <GetCabinById id={1} />
      <DeleteCabinById id={11} />
    </QueryClientProvider>
  );
}
import { Toaster } from "react-hot-toast";

export default App;
