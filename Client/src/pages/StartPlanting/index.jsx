import { useParams } from "react-router-dom"
import "./style.css"

const index = () => {

    
  const { id } = useParams()

  return (
    <div className="planter-container">
        <h1 className="title">Plant Submission</h1>
        <div className="photo-submission-container">
            <div className=" photo before">
                <button className="photo-btn">BEFORE PHOTO</button>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/></svg>
                
            </div>
            <div className="photo after">
            <button className="photo-btn">AFTER PHOTO</button>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/></svg>
            </div>
        </div>
        <button className="submit" type="submit">SUBMIT</button>
    </div>
  )
}

export default index