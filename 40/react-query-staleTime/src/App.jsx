import supabase from "./supabase";
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
    return (
    <QueryClientProvider client={queryClient}>
      hello stale time
      <GetCabins />
    </QueryClientProvider>
  );
}

async function getCabins() {  
let { data: cabins, error } = await supabase
.from('cabins')
.select('*');
console.log('refetching ....')
if(error) throw new Error(error);
return cabins;
}

function GetCabins(){
  const {data, isLoading, error} = useQuery({
    queryKey: ['cabins-data'],
    queryFn: getCabins,
    staleTime: 1000*60*1.5,
    refetchInterval: 1000*60*1.5,
  })
  if(error) throw new Error(error);
  if(isLoading) return <p> Loading ...</p>
  return <div>{
    data.map(cabin => <p key={cabin.id}>{JSON.stringify(cabin)}</p>)
    }</div>
}
