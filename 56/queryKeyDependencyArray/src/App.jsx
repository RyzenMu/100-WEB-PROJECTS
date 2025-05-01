import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// supabase connection
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabasekey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabasekey);

const queryClient = new QueryClient();

export default function App() {
  const [sortedData, setSortedData] = useState();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          Mens Wear
        </h1>
        <FilterAndSort onSetSortedData={setSortedData} />
        <DisplayClothes sortedData={sortedData} />
        <InsertClothes />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function FilterAndSort({ onSetSortedData }) {
  const {
    data: rawData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["clothes", "sort A-Z"],
    queryFn: getAllClothes,
  });

  function selectAZ(e) {
    const selected = e.target.value;
    let sortedData;
    if (selected.includes("A-Z")) {
      sortedData = [...rawData].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedData = [...rawData].sort((a, b) => b.name.localeCompare(a.name));
    }
    onSetSortedData(sortedData);
    console.log(sortedData);
  }
  return (
    <div className="flex justify-between">
      <select onChange={selectAZ}>
        <option>Sort A-Z</option>
        <option>Sort Z-A</option>
      </select>
      <select>
        <option>Filter - White</option>
        <option>Filter - Black</option>
        <option>Filter - Red</option>
        <option>Filter - Blue</option>
        <option>Filter - Grey</option>
        <option>Filter - Brown</option>
      </select>
      <select>
        <option>Filter - Small</option>
        <option>Filter - Medium</option>
        <option>Filter - Large</option>
      </select>
      <select>
        <option>Sort - Cheapest</option>
        <option>Sort - Expensive</option>
      </select>
    </div>
  );
}

function DisplayClothes({ sortedData }) {
  const {
    data: sortedData1,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["clothes"],
    queryFn: getAllClothes,
  });
  if (!sortedData) {
    if (error) return <p className="text-red-500">Error: {error.message}</p>;
    if (isLoading) return <p>Loading ...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(sortedData || sortedData1)?.map((cloth) => (
        <div key={cloth.id} className="bg-white p-4 shadow rounded">
          <p>
            <b>Name:</b> {cloth.name}
          </p>
          <p>
            <b>Type:</b> {cloth.type}
          </p>
          <p>
            <b>Size:</b> {cloth.size}
          </p>
          <p>
            <b>Color:</b> {cloth.color}
          </p>
          <p>
            <b>Price:</b> ${cloth.price}
          </p>
        </div>
      ))}
    </div>
  );
}

// read all rows
async function getAllClothes() {
  let { data: clothes, error } = await supabase.from("clothes").select("*");
  if (error) throw new Error(error.message);
  return clothes;
}

async function insertClothes(clothes) {
  const { data, error } = await supabase
    .from("clothes")
    .insert([
      {
        id: Number(clothes.id),
        name: clothes.name,
        type: clothes.type,
        size: clothes.size,
        color: clothes.color,
        price: parseFloat(clothes.price),
      },
    ])
    .select();
  if (error) throw new Error(error.message);
  console.log(clothes);
}

async function insertClothesMen() {
  const { data, error } = await supabase
    .from("clothes")
    .insert(clothesMen.clothes)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// update matching rows
async function updateClothes({ id, field, value }) {
  const { data, error } = await supabase
    .from("clothes")
    .update({ [field]: value })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// delete matching rows
async function deleteClothes({ id }) {
  const { error } = await supabase.from("clothes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// INSERT UI
const StyledInput = styled.input`
  width: 50%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

function InsertClothes() {
  const [clothes, setClothes] = useState({
    id: "",
    name: "",
    type: "",
    size: "",
    color: "",
    price: "",
  });

  async function handleInsert() {
    try {
      await insertClothes(clothes);
      alert("Inserted successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleInsertAll() {
    try {
      await insertClothesMen();
      alert("All clothes inserted");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate() {
    try {
      await updateClothes({
        id: 1,
        field: "price",
        value: 99.99,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      await deleteClothes({ id: 1 });
      alert("deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
        Insert Clothes
      </h2>

      {/* Reusable Field */}
      {["Id", "Name", "Type", "Size", "Color", "Price"].map((field) => (
        <div key={field} className="flex items-center mb-4">
          <label className="w-24 text-gray-600 font-medium">{field}:</label>
          <StyledInput
            type="text"
            placeholder={field}
            value={clothes[field.toLowerCase()]}
            onChange={(e) =>
              setClothes({ ...clothes, [field.toLowerCase()]: e.target.value })
            }
          />
        </div>
      ))}

      <div className="flex items-center justify-center bg-gray-100 p-4 gap-4 mt-6 rounded">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={() => insertClothes(clothes)}
        >
          Insert
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={handleInsertAll}
        >
          Insert All
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
