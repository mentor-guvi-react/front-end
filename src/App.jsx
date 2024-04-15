import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  console.log(formState, "formState");

  // console.log(import.meta.env.NODE_APP_ENV);

  const handleInputChange = (event) => {
    console.log(event, "event");

    if (event.target.name === "username") {
      setFormState({
        ...formState,
        username: event.target.value,
      });
    } else if (event.target.name === "password") {
      setFormState({
        ...formState,
        password: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    axios
      .get(
        `https://node-day04.onrender.com/createSign?username=${formState.username}&password=${formState.password}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleGetUser = () => {
    axios.get(
      `https://node-day04.onrender.com/getuser?username=${formState.username}`
    );
  };

  return (
    <>
      <div>
        <input name="username" onChange={handleInputChange} />
        <input name="password" onChange={handleInputChange} />
        <button onClick={handleCreate}>Create User</button>
      </div>
      <br />

      <div>
        <button onClick={handleGetUser}>Get User</button>
      </div>
    </>
  );
}

export default App;
