import { Outlet, useParams } from "react-router-dom";

export default function AboutWithNumber(){
    const {id} = useParams();
    return <div>This is about page number {id} <Outlet/></div>
}