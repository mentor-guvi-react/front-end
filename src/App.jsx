import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import bcryptjs from "bcryptjs";

function App() {
  const apiUrl = import.meta.env.VITE_LOCAL_URL;

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });

  const [inputString, setInputString] = useState("");

  const [secret, setSecret] = useState("");
  // create another state for confirm password screen

  const handleChange = (event) => {
    // if(event.target.name === 'username'){
    //   setUsername(event.target.value)
    // }

    // if(event.target.name === 'password'){
    //   setPassword(event.target.value)
    // }
    // if(event.target.name === 'phoneNumber'){
    //   setphoneNumber(event.target.value)
    // }

    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myHashPassword = await bcryptjs.hash(formState.password, 0);

    // const isValid = await bcryptjs.compare(
    //   "somerandomstring123",
    //   myHashPassword
    // );
    // console.log(isValid, "isValid");

    if (formState.username && formState.password && formState.phoneNumber) {
      const response = await axios.post(
        apiUrl + "/createUser",
        {
          username: formState.username,
          password: myHashPassword,
          phoneNumber: formState.phoneNumber,
        },
        {
          headers: {
            auth: Math.random(),
          },
        }
      );
      if (response.data) {
        alert("user created success");
      }
    }
  };

  const handleUserCheck = async () => {
    event.preventDefault();
    if (formState.username) {
      const response = await axios.get(
        apiUrl + `/existUser?username=${formState.username}`,
        {
          headers: {
            auth: Math.random(),
          },
        }
      );
      console.log(response.data, "response.data ");

      if (response.data === "User Not Found") {
        alert("user doesnt exist");
      } else {
        setSecret(response.data);
        alert("user exists");
      }
    }
  };

  const handleSecretCheck = async (event) => {
    event.preventDefault();
    if (inputString && formState.username) {
      const response = await axios.get(
        apiUrl +
          `/validateSecret?username=${formState.username}&secret=${inputString}`
      );
      console.log(response, "response");
      // if response if success update the state and show confirm password screen
    }
  };

  const SignUpForm = () => {
    return (
      <Form>
        <h3>Sign Up</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            name="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            onChange={handleChange}
            type="text"
            placeholder="Phone Number"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  };

  const SecrectForm = () => {
    return (
      <Form>
        <h3>Password Reset</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Your secret String</Form.Label>
          <Form.Control
            onChange={(event) => setInputString(event.target.value)}
            type="text"
            placeholder="Enter Secret Stringt"
            name="secret"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSecretCheck}>
          Check Secret
        </Button>
      </Form>
    );
  };


  const ForgotPassword = () => {
    return (
      <Form>
        <h3>Forget password </h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter email"
            name="username"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleUserCheck}>
          Check username
        </Button>
      </Form>
    );
  };

  return (
    <>
      {/* {SignUpForm()} */}

      <div>{secret}</div>

      {secret ? SecrectForm() : ForgotPassword()}

      {/* {render confirm passwored form if state is true} */}
    </>
  );
}

export default App;

// axios.get(url, { header: {} });
// axios.post(url, {}, { headers: {} });
