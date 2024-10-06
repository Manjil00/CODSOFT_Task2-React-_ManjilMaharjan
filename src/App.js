import React, { useState } from "react";

//ICONS
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";


function App() {

const [inputdata,setInputdata]=useState('');
const [todoarr,setTodoarr]=useState([]);

// Editing
const [toggle,setToggle]=useState(false);
const [curIndex,setCurIndex]=useState(null);

//checkbox
const [checked,setChecked]=useState([]);


const handleAdd=()=>{
    if(inputdata.trim()){
      setTodoarr([...todoarr, inputdata]);
      setInputdata('');
    }
}
const handleDelete=(id)=>{
  const updateditems= todoarr.filter((item,index)=>{
    return index!== id;
  });
  setTodoarr(updateditems);
}

const handleEdit=(index)=>{
  setInputdata(todoarr[index]);
  setToggle(true);
  setCurIndex(index);
}
const handleSaveEdit = () => {
  if (toggle) {
    const editedItems = todoarr.map((item, index) =>
      index === curIndex ? inputdata : item
    );
    setTodoarr(editedItems);
    setToggle(false);
    setInputdata('');
    setCurIndex(null);
  }
};

const handleCheckbox = (index) => {
  setChecked((prevChecked) => {
    const updatedChecked = [...prevChecked];
    updatedChecked[index] = !updatedChecked[index]; // Toggle checked state
    return updatedChecked;
  });
};


  return (
    <div className="AppMaincontainer w-full h-[100vh] flex justify-center items-center bg-bgcolor">
        <div className="TodoContainer w-[50%] h-auto bg-white rounded-xl p-4">
          <div className="inputs flex flex-col justify-center items-center gap-5">
            <input onChange={(e)=>setInputdata(e.target.value)}
            value={inputdata}
            type="text" className="border-2 border-black w-full p-2 rounded-lg" placeholder="Add Todo List"/>
            {
              toggle ?<button onClick={handleSaveEdit}
              className="h-[40px] w-[80px] bg-blue-500 text-white font-bold text-center rounded-lg">Save Edit</button>
              : <button onClick={handleAdd}
              className="h-[40px] w-[80px] bg-blue-500 text-white font-bold text-center rounded-lg">Add</button>
            }
            
          </div>

          <div className="List w-[600px] h-auto rounded-lg flex flex-col justify-start   items-center gap-5 mt-8">
            {
              todoarr.map((item,index)=>{
                const ischecked=checked[index];
                return (
                  <div key={index}
                  className={`list1 flex justify-between items-center gap-5 h-[50px] w-full bg-slate-300 rounded-lg
                  ${ischecked ? "bg-green-400": "bg-slate-300"}`}>

                  <input  onChange={()=>handleCheckbox(index)}
                          checked={isChecked}

                  type="checkbox" className="h-[20px] w-[20px] ml-5" ></input>
                  <h1 className="font-sans text-xs md:text-lg break-words text-white h-auto">{item}</h1>
                  <div className="btn flex justify-end items-centergap-3 h-auto w-auto ">
                        <button key={item}
                        onClick={()=>handleEdit(index)}
                        className="edit h-[30px] w-[30px]"><CiEdit /></button>
                        <button key={index}
                        onClick={()=>handleDelete(index)}
                        className="edit h-[30px] w-[30px]"><AiTwotoneDelete /></button>
                  </div>
                </div>
                )
              })}
          </div>

          </div>
        </div>
  );
}

export default App;
