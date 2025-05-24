import { useParams } from "react-router-dom"
export default function ProjectWithNumber(){
    const {projectID} = useParams();
    return <div>
        This is Project Page Number {projectID}
    </div>
}