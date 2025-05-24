import {Link, Outlet} from 'react-router-dom';
export default function About(){
    return <h1>About... <Outlet/><Link to='/helloworld'> Helloworld</Link></h1>
}