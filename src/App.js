import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [ListOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    axios.post("http://localhost:3001/addfriend", { 
      name: name, 
      age: age 
    }).then((response)=>{
      setListOfFriends([...ListOfFriends,{_id : response.data._id,name:name,age:age}])
    })
  };

  const updateFriend = (id) => {
    const newAge = prompt("enter new age: ")

    axios.put('http://localhost:3001/update',{ newAge:newAge,id:id}).then(()=>{
      setListOfFriends(ListOfFriends.map((val)=>{
        return val._id === id ? {_id:id, name:val.name,age:newAge} : val;
      }))
    })
  }

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      setListOfFriends(ListOfFriends.filter((val)=>{
        return val._id !== id
      }))
    })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);
  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Friend age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="ListOfFriends">
        {ListOfFriends.map((val) => {
          return (
            <div className="friendContainer">
            <div className="friend">
              <h3>Name: {val.name}</h3>
              <h3> Age: {val.age}</h3>
            </div>
            <button onClick={()=>{updateFriend(val._id)}}>update</button>
            <button id="removeBtn" onClick={()=>{deleteFriend(val._id)}}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
