import {Link} from 'react-router-dom';

export default function Query(){
    return <div>
        <Link to ='/queryPage?name=JohnDoe&age=30'>Go to Query Page</Link>
    </div>
}