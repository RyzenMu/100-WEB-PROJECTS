import styled from "styled-components";

const H1 = styled.h1`
  color: blue;
  text-align: center;
  background-color: #dc9797;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  width: fit-content;
  margin: 2% auto;
  padding: 2%;
  border-radius: 10px;
  margin-top: 2%;
`;

const StyledApp = styled.div`
  background-color: #999;
  margin-top: 2%;
  height: 100vh;
`;

const StyledContainer = styled.div`
  background-color: #fff;
  text-align: center;
  display: block;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 5%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 5%;
  button {
    background-color: #dc9797;
    color: #040404;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin: 5% 5%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    background-color: #dc9797;
    color: #040404;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 700;
  }
`;

const StyledTodoList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 1% 2%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #040404;

  li {
    background-color: #dc9797;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const MarkButton = styled.button`
  background-color: #fff;
  color: #171717;
  border: 2px solid #fff;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background-color: #c56565;
    color: white;
  }
`;

//Supabase connection

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// use react query to fetch data from supabase
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledApp>
        <H1>TODO App</H1>
        <Container />
        <AddTodo />
      </StyledApp>
    </QueryClientProvider>
  );
}

function Container() {
  return (
    <StyledContainer>
      <Buttons>
        <button>All</button>
        <button>Completed</button>
        <button>Pending</button>
      </Buttons>
      <TodoList />
    </StyledContainer>
  );
}

async function insertTodo(task) {
  const { data, error } = await supabase
    .from("todo")
    .insert([{ task, completed: false }])
    .select();
  if (error) {
    console.error("Error inserting todo:", error);
  }
  console.log("Inserted todo:", data);
}

function AddTodo() {
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const input = e.target.elements.todoInput;
    const task = input.value.trim();
    if (!task) return;
    await insertTodo(task);
    input.value = ""; 
  }
  return (
    <StyledForm
      onSubmit={handleSubmit}   >
      <input type="text" placeholder="Add a new todo" name="todoInput" />
      <button type="submit">Add</button>
    </StyledForm>
  );
}

async function fetchTodos() {
  let { data: todo, error } = await supabase.from("todo").select("*");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  return todo;
}

function TodoList() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <StyledTodoList>
      {query.isLoading && <li>Loading...</li>}
      {query.isError && <li>Error fetching todos</li>}
      {query.isSuccess &&
        query.data.map((todo) => (
          <li key={todo.id}>
            {todo.task}{" "}
            {todo.completed ? (
              ""
            ) : (
              <MarkButton onClick={() => console.log("Mark as completed")}>
                mark completed
              </MarkButton>
            )}{" "}
          </li>
        ))}
    </StyledTodoList>
  );
}
