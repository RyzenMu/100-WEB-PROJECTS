import { useEffect, useState, React } from "react";
import { useQuery, QueryClient,QueryClientProvider } from "@tanstack/react-query";
import supabase from "./supabase";

const queryClient = new QueryClient();
export default function App() {
  const [pic, setPic] = useState([]);
  
  useEffect(function () {
    const picArr = [];
     function getPic() {
      for (let i = 1; i <= 5; i++) {
        if (i==2) continue
        const picUrl =  getPics(i);
        picArr.push(picUrl);
      }
      console.log(picArr);
      setPic(picArr);
    }
    getPic();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {pic.map((item, index) => {
        return (
          <>
              <img src={item} alt={`Image ${index + 1}`} width={100} />
              <p>Image {index + 1}</p>
              
          </>
        );
      })}
      <Trains/>
    </QueryClientProvider>
  );
}

function Trains(){
  const query = useQuery({
    queryKey: ['trains'],
    queryFn: getTrains,
  })
  return (
    <div>
      {query.isLoading ? (
        <p>Loading...</p>
      ) : query.isError ? (
        <p>Error: {query.error.message}</p>
      ) : (
        <ul>
          {query?.data?.map((train) => (
            <li key={train.id}>{train.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function getPics(num = 25) {
  const picUrl = `https://vxexigrndbgzgbnbvhtr.supabase.co/storage/v1/object/public/pexels-man//man${num}.jpg`;
  return picUrl;
}

async function getTrains(){
  
let { data: trains, error } = await supabase
.from('trains')
.select('*')
  if (error) {
    console.error('Error fetching trains:', error);
    return [];
  }
  return trains;

}
