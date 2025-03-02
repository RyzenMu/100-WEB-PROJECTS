import { useLocation } from "react-router-dom"

export default function QueryPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const age = queryParams.get('age');

    return <h1> use Search params your name is {name} your age is {age}</h1>
}