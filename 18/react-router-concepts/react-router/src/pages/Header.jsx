import { NavLink } from "react-router-dom";

export default function Header({isActive, onSetIsActive}){
    
    return <div>
        <NavLink to='/helloworld' style={({isActive})=>isActive ? {color : 'red'} : {color:'blue'}} className={({isActive}) => isActive ?'active' : 'inactive' }
        ><button>Button 1</button></NavLink> 
        <NavLink to='/about'><button>Button 2</button></NavLink> 
    </div>
}