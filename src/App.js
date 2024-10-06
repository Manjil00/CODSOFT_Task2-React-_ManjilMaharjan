import React, { useState } from "react";

// ICONS
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { SiTicktick } from "react-icons/si";

function App() {
  const [inputdata, setInputdata] = useState('');
  const [todoarr, setTodoarr] = useState([]);

  // Editing
  const [toggle, setToggle] = useState(false);
  const [curIndex, setCurIndex] = useState(null);

  const handleAdd = () => {
    if (inputdata.trim()) {
      setInputdata('');
      setTodoarr([...todoarr, { text: inputdata, isGreen: false }]);
    }
  };

  const handleDelete = (id) => {
    const updateditems = todoarr.filter((_, index) => index !== id);
    setTodoarr(updateditems);
  };

  const handleEdit = (index) => {
    setInputdata(todoarr[index].text);
    setToggle(true);
    setCurIndex(index);
  };

  const handleSaveEdit = () => {
    if (toggle) {
      const editedItems = todoarr.map((item, index) =>
        index === curIndex ? { ...item, text: inputdata } : item
      );
      setTodoarr(editedItems);
      setToggle(false);
      setInputdata('');
      setCurIndex(null);
    }
  };

  const handleCheck = (index) => {
    const updatedItems = todoarr.map((item, i) =>
      i === index ? { ...item, isGreen: !item.isGreen } : item
    );
    setTodoarr(updatedItems);
  };

  return (
    <div className="AppMaincontainer w-full h-[100vh] flex justify-center items-start bg-bgcolor">
      <div className="TodoContainer w-[50%] h-auto bg-white rounded-xl p-4 mt-10">
        <div className="inputs flex flex-col justify-start items-center gap-5">
          <input 
            onChange={(e) => setInputdata(e.target.value)}
            value={inputdata}
            type="text" 
            className="border-2 border-black w-full p-2 rounded-lg" 
            placeholder="Add Todo List" 
          />
          {
            toggle ? (
              <button 
                onClick={handleSaveEdit}
                className={`h-[40px] w-[80px] bg-blue-500 text-white font-bold text-center rounded-lg`}>
                Save Edit
              </button>
            ) : (
              <button 
                onClick={handleAdd}
                className={`h-[40px] w-[80px] bg-blue-500 text-white font-bold text-center rounded-lg`}>
                Add
              </button>
            )
          }
        </div>

        <div className="List w-[600px] h-auto rounded-lg flex flex-col justify-start items-center gap-5 mt-8">
          {todoarr.map((item, index) => (
            <div 
              key={index}
              className={`list1 flex justify-between items-center gap-5 h-[50px] w-full rounded-lg shadow-xl shadow-black ${item.isGreen ? "bg-green-400" : "bg-slate-300"}`}
            >
              <button 
                onClick={() => handleCheck(index)}
                className="text-green-600 h-[40px] w-[40px] ml-2">
                <SiTicktick />
              </button>

              <h1 className="font-sans text-xs md:text-lg break-words text-white h-auto">{item.text}</h1>
              
              <div className="btn flex justify-end items-center gap-3 h-auto w-auto">
                <button 
                  onClick={() => handleEdit(index)}
                  disabled={item.isGreen} // Disable when isGreen is true
                  className={`edit h-[30px] w-[30px] ${item.isGreen ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <CiEdit />
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  disabled={item.isGreen} // Disable when isGreen is true
                  className={`delete h-[30px] w-[30px] ${item.isGreen ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <AiTwotoneDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
