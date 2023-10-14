import React, { useState } from "react";
import Create from "./Create";


function Home(params) {

    const [todos,setTodos] = useState([])
    return(
        <>
      <h1>ToDo List</h1>
        <Create/>
        {/* {
            todos.length === 0
            ?
           
            :
            todos.map( Todo => (

                <p>{Todo.task}</p>

            ))


            
        } */}




        </>


    )
}
export default Home;