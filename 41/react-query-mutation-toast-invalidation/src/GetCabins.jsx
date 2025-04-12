import { useQuery } from "@tanstack/react-query";
import { getCabins } from "./apiCabins";

export default function GetCabins(){
    const { data, error, isLoading } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
        staleTime: 0, // 0 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchInterval: 1000 * 60 * 0.5, // 0.5 minutes
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <ul>
        {data.map(cabin => (
            <li key={cabin.id}>{cabin.name}</li>
        ))}
        </ul>
    );
}
