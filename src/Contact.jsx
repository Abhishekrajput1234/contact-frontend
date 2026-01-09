import { useEffect, useState } from "react"
import axios from "axios"
export default function Contact(){
     const[user,setUser]=useState({
        name:"",
        email:"",
        number:"",
        message:""
    })

      //inputhandler

    const InputHandler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})

    }

    const[view,setView]=useState([]);

    
    //on submit

    const submituser=(e)=>{
        e.preventDefault()
       // console.log(user)
      //  alert("data inserted")
  axios.post("https://contact-backend-8qza.onrender.com/data", user)
      .then((res)=>{
        console.log("success",res.data)
        alert("data inserted successfully")

        //form reset

        setUser({
          name:"",
          email:"",
          number:"",
          message:"",
        })

         fetchdata();


      })

     

      
         .catch((err) => {
      console.error("Error:", err);
      alert("Something went wrong!");
    
      })
    }

    //fetch data

    const fetchdata=()=>{
    fetch("https://contact-backend-8qza.onrender.com/getdata")
      .then((res)=>res.json())
      .then((data)=>setView(data))
      .catch((err)=>{
        console.log("error",err)
      })
    }
    //useEffect

    useEffect(()=>{

      fetchdata();

    }, [])

    //delete data 
const deleteUser = (id) => {
  
   axios.delete(`https://contact-backend-8qza.onrender.com/delete/${id}`)
    .then(() => {
      alert("User Deleted Successfully!");
      fetchdata(); // table refresh
    })
    .catch((err) => console.log(err));
};






    return(<>
     <div className="bg-gray-100 min-h-screen flex items-center p-6 justify-center">
    <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6  ">
    <div className="md:text-4xl text-3xl font-bold text-gray-700 capitalize mb-10 text-center mt-4 ">contact form</div>
    <form className="space-y-4" onSubmit={submituser}>

      <div>
    <label className="text-sm font-medium text-gray-500 capitalize mb-1 block ">full name</label>
    <input type="text" placeholder="enter name "
     className="border w-full px-4 py-2 rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    name="name" value={user.name} onChange={InputHandler}/>
    </div>

    <div>
    <label className="text-sm font-medium text-gray-500 capitalize mb-1 block "> enter email</label>
    <input type="text" placeholder="enter email "
     className="border w-full px-4 py-2 rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
     name="email" value={ user.email} onChange={InputHandler}/>
    </div>

      <div>
    <label className="text-sm font-medium text-gray-500 capitalize mb-1 block "> enter number</label>
    <input type="text" placeholder="enter number " className="border w-full px-4 py-2 rounded-lg border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    name="number" value={ user.number} onChange={InputHandler}/>
    </div>

      <div>
            <label className="block text-gray-600 font-medium mb-1  text-sm">Message</label>
            <textarea
              rows="3"
              className="w-full border border-gray-500  p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="message" value={ user.message} onChange={InputHandler}/>
          </div>

    <div className="text-center mt-2 ">
    <button className="bg-cyan-500 text-white capitalize font-bold px-4 py-2 rounded-lg">submit</button>
    </div>




    </form>

    </div>
     </div>


     <div className=" w-full p-6 md:p-10 ">
      <div className="text-gray-700 text-4xl font-semibold capitalize text-center mb-20 ">
        register users
      </div>

      <div className=" overflow-x-auto   rounded-lg shadow-xl">
      <table className="w-full text-left bg-white">
      <thead className="bg-gray-100 ">
      <tr className="border-b">
      <td className="p-3 font-medium capitalize border ">name</td>
      <td  className="p-3 font-medium capitalize border">email</td>
      <td  className="p-3 font-medium capitalize border">number</td>
      <td  className="p-3 font-medium capitalize border">message</td>
      <td  className="p-3 font-medium capitalize border">delete</td>
      </tr>
      </thead>

      <tbody>

      {
      view.length>0?(

        view.map((item)=>(
          <tr key={item._id} className="border-b">
          <td className="p-3 border">{item.name}</td>
          <td className="p-3 border">{item.email}</td>
          <td className="p-3 border">{item.number}</td>
          <td className="p-3 border">{item.message}</td>
          <td className="p-3 border">
          <button
            onClick={() => deleteUser(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </td>

          </tr>
        

        ))
      ) : (
        <tr className="row-span-3 p-3 ">
          <td className="text-2xl boder text-center p-3  ">no contact found</td>
        </tr>
      )
   
      }

      </tbody>

      



      </table>

      </div>
   
     </div>



    

    

    </>)

    }