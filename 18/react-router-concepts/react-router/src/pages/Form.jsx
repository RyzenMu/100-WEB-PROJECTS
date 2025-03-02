import { useNavigate} from "react-router-dom"

export default function Form(){
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        navigate('/submitted');
    }
    return <form onSubmit={handleSubmit}>
        <input type="text"></input>
        <button type="submit">Submit</button>
    </form>
}