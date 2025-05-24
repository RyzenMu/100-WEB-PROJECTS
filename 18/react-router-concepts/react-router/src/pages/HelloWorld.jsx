import {Link, Outlet} from 'react-router-dom';

export default function HelloWorld(){
    return <h1>Hello World .... <Link to='/about'>About</Link><Outlet/></h1>
}