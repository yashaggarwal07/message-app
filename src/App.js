import React , { useEffect , useState } from 'react';
import './App.css';
import SideBar from "./SideBar";
import Chat from "./Chat";
import Pusher from 'pusher-js';
import axios from './aosis';

function App() {
const [messages,SetMessages] = useState([]);

  useEffect(()=>{
    axios.get('./messages/sync')
    .then(response => {
      //console.log(response.data);
      SetMessages(response.data);
    })
  })


useEffect(()=>{
  var pusher = new Pusher('e517e476f956ce009d72', {
    cluster: 'eu'
  });
  var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage)=> {
      //alert(JSON.stringify(newMessage));
      SetMessages(...messages,newMessage);
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
},[messages])

  return (
    <div className="App">
      <div className="app_body">
     <SideBar />
     <Chat messages = {messages}/>
    </div>
    </div>  
  );
}

export default App;
