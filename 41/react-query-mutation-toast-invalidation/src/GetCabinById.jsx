import { useQuery } from "@tanstack/react-query";
import { getCabinById } from "./apiCabins";

export default function GetCabinById({ id }) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['cabins', id],
        queryFn: () => getCabinById(id),        
        staleTime: 0, // 0 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchInterval: 1000 * 60 * 0.5, // 0.5 minutes
    }); 

    if (isLoading) return <div style={{ color: 'blue', fontWeight: 'bold' }}>Loading...</div>;
    if (error) return <div style={{ color: 'red', fontWeight: 'bold' }}>Error: {error.message}</div>;
    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '400px', margin: '16px auto', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '8px' }}>Cabin ID: {data.id}</h2>
          <p style={{ color: '#555', marginBottom: '4px' }}>Max Capacity: {data.maxCapacity}</p>
          <p style={{ color: '#555', marginBottom: '4px' }}>Price: ${data.regularPrice}</p>
        </div>
    );
}