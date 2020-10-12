import React , { useState } from 'react'
import './Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile,SearchOutlined,MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './aosis';

function Chat({messages}) {

    const [input,setInput] = useState("");
    const sendMessage = async (e)=>{
        e.preventDefault();

       await axios.post("/messages/new",{
            message: input,
            name:"Demo App",
            timeStamp:"just now!",
            recived:false,
        });
        setInput("");
    };
    return (
        <div className="chat">
          <div className="chat_Header">
              <Avatar />
              <div className="chat_headerInfo">
                  <h3>Room Name</h3>
                  <p>Last seen at...</p>
              </div>
              <div className="chat_headerRight">
                  <IconButton>
                      <SearchOutlined />
                  </IconButton>
                  <IconButton>
                      <AttachFile />
                  </IconButton>
                  <IconButton>
                      <MoreVert />
                  </IconButton>
              </div>
          </div>
          <div className="chat_body">
              {messages.map((message) =>(
              <p 
              className={`chat_message ${message.recived && "chat_reciever"}`}
              >
                  <span className="chat_name">{message.name}
                  </span>
                  {message.message} 
    <span className="chat_timestamp">{message.timeStamp}</span>
              </p>
    ))}
                 
          </div>
          <div className="chat_footer">
              <InsertEmoticonIcon />
              <form>
                  <input value={input} onChange={e=> setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text" />
                  <button onClick={sendMessage}  type="submit">Send a message</button>
              </form>
              <MicIcon/>
          </div>
                    </div>
    )
}

export default Chat;
