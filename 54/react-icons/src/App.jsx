import { BiSolidPencil } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  `;
  // supabase connection

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//react query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Pics</h1>
        <p>Copy, Upload and Delete [pics] </p>
        <ImageCard />
        <ImageCard />
      </div>
    </QueryClientProvider>
  );
}

function ImageCard() {
  return (
    <StyledCard>
      <div>
        <img src="https://picsum.photos/200/300" alt="Random" />
      </div>
      <div>
        <BiSolidPencil size={32} />
        <IoCopy size={32} />
        <MdDelete size={32} />
      </div>
    </StyledCard>
  );
}
