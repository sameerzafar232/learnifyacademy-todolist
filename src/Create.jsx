import React, { useState , useEffect } from "react"
import axios from 'axios';
import './App.css'


function Create(params) {


const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [editData, setEditData] = useState("");
  const [editTask, seteditTask] = useState("");



//Post Data 
    const handleADD = ()=>{
axios.post('http://localhost:4000/add',{task:task})
.then(result => {console.log("POST",result)
getData();}
  
)
  
.catch(err => console.log(err)) 
    }

    //Get Data 

  const getData = () => {
    axios.get('http://localhost:4000/add')
      .then((response) => {
        console.log("GET", response.data);
        setTasks(response.data); 
        setDataNotFound(response.data.length === 0); 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Data = () => {
    getData();
  };

  useEffect(() => {
    
    getData();
  }, []); 

//delete data 

  const deleteitem = (item) => {
    console.log(item);
   
    axios.delete(`http://localhost:4000/delete/${item}`)
      .then(() => {
    alert("Delete Sucessfully")
    getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);



  //Delete All Data 

  const DeleteAll = () => {
    axios.delete(`http://localhost:4000/deleteAll`)
      .then(() => {
    alert("DeleteAll Sucessfully")
    getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);


//Update Data 


const Updateitem = (item) => {
  console.log(item);

  axios.put(`http://localhost:4000/update/${item}`, {

  task: editTask
  })
    .then(() => {
  alert("Update Sucessfully")
  setEditData("");
  getData();
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  getData();
}, []);




    
    return (
<>

<div className="Containor">



<div>
<div className="input-process">
  
<div className="add-now">
    <input
            type="text"
            placeholder="Enter ToDo....!"
            onChange={(e) => setTask(e.target.value)}
          />
    </div>
    <div className="add-btn">
      <button onClick={handleADD}>
        ADD
      </button>
    </div>
</div>
   


{!tasks.length ? (
        <p className="err">Data Not Found</p>
      ) : (
        tasks.map((task) => (
          <>
<div className="container">
<div className="input-data">


<input type="text" value={task._id==editData?editTask:task.task} disabled={task._id==editData?false:true}  onChange={(e) => seteditTask(e.target.value)}/>

<div className="del-btn" key={task.id}>
            <div className="delete">
            <i onClick={()=> deleteitem(task._id)} className="material-symbols-outlined">delete</i>
            </div>
             
 {task._id!=editData? <div className="edit-btn"> <i  onClick={()=> setEditData(task._id)} className="material-symbols-outlined">edit</i></div>:
           <div className="save">
  <i className="material-symbols-outlined" onClick={()=>Updateitem(task._id) }>save</i>
           </div>
         }
            </div>

</div>  

          
</div>

          

            </> ))
      )}
        </div>
       
         {/* Remove All */}

         <div onClick={DeleteAll}className='showitems-for-remove'>
                    <button >REMOVE ALL</button>
                </div>
                </div>
</>

      )};
    
export default Create;