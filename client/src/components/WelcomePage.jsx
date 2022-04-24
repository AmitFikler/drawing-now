import { useState } from "react";
import { io } from "socket.io-client";


function WelcomePage() {
    const socket = io("http://localhost:3003");
    const [name, setName] = useState("");
    
    socket.on("invalidName", ()=> {
        console.log("Invalid name");
    })

    const handleSubmit = () => {
        setName("");
        socket.emit("playerJoin", name);
    };

    socket.on("wait", () => {
        console.log("Waiting for other player");
    });

    socket.on("startGame",()=>{
        console.log("Game started");
    })

    return (
        <>
            <h1>Welcome to DRAWING_NOW</h1>
            <h4>Please Enter a username:</h4>
            <input type={"text"}  placeholder="username.." onChange={(e)=>setName(e.target.value)} value={name}/>
            <button onClick={handleSubmit}>Enter</button>
        </>
     );
}

export default WelcomePage;