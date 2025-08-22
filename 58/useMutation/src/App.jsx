import styled from "styled-components";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk";
const supabase = createClient(supabaseUrl, supabaseKey);

const StyledDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;
const StyledCard = styled.div`
  display: flex;
  background-color: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(20, 17, 17, 0.1);
  width: 100%;
  max-width: 400px;
  gap: 15px;

  b {
    font-weight: 600;
    margin-right: 8px;
  }

  p {
    margin: 0 0 8px;
  }

  button {
    margin-top: 12px;
    align-self: flex-start;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #388e3c;
    }
  }
`;

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DisplayClothes />
    </QueryClientProvider>
  );
}

function DisplayClothes() {
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient(); // ⬅️ get the shared instance

  const {
    data: clothes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clothes").select("*").order('id');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ name, id }) => update(name, id),
    onSuccess: () => {
      console.log("Mutation succeeded");
      setEditId(null);
      setNewName("");
      queryClient.invalidateQueries({queryKey:['clothes']});
    },
    onError: (err) => console.log(err),
  });

  async function update(name, id) {
    const { error } = await supabase
      .from("clothes")
      .update({ name })
      .eq("id", id);
    if (error) throw new Error(error.message);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StyledDisplay>
      {clothes.map((cloth) => (
        <StyledCard key={cloth.id}>
          <b>id</b>:<p>{cloth.id}</p>
          <b>name</b>:
          {editId === cloth.id ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={() => mutation.mutate({ name: newName, id: cloth.id })}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>{cloth.name}</p>
              <button
                onClick={() => {
                  setEditId(cloth.id);
                  setNewName(cloth.name);
                }}
              >
                Edit
              </button>
            </>
          )}
        </StyledCard>
      ))}
    </StyledDisplay>
  );
}
