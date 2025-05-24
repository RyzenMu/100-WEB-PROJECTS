import { useLoaderData } from "react-router-dom";


const url = "https://v2.jokeapi.dev/joke/Any?type=single";

export async function jokeLoader(){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;    
    } catch (error)     {
        console.log(error);
        return { joke: "Failed to load joke." }; // Handle error case
    }
    
}

export default function Joke(){
    const data=useLoaderData();
    return  (
        <div>
            <h1>Joke</h1>
            {data.type === "single" ? (
                <p>{data.joke}</p> // Display the joke text if it's of type 'single'
            ) : (
                <p>{`${data.setup} - ${data.delivery}`}</p> // Display setup and delivery if it's a two-part joke
            )}
        </div>
    );
}