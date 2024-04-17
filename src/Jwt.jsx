import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Jwt = () => {
  const token = localStorage.getItem("usertoken");
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const handleLogin = async () => {
    const response = await axios.get(
      `http://localhost:4000/handleLogin?username=${formState.username}&password=${formState.password}`
    );
    if (response.data !== "invalid user") {
      const token = response?.data?.split(":")[1];
      localStorage.setItem("usertoken", token);
      setIsLoggedIn(true);
    } else {
      alert("invalid user");
    }
  };

  const LoginForm = () => {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        {/* <h3>Password Reset</h3> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Login</Form.Label>
          <Form.Control
            className="mb-3"
            onChange={(event) =>
              setFormState({
                ...formState,
                username: event.target.value,
              })
            }
            type="text"
            placeholder="Username"
            name="username"
          />
          <Form.Control
            onChange={(event) =>
              setFormState({
                ...formState,
                password: event.target.value,
              })
            }
            type="text"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    );
  };

  const handleLogout = () => {
    localStorage.setItem("usertoken", "");
    setIsLoggedIn(false);
  };

  const handleUsers = async () => {
    await axios.get(`http://localhost:4000/getUsers`, {
      headers: {
        auth: token,
      },
    });
  };

  const handleBookings = async () => {
    await axios.get(`http://localhost:4000/getBookings`, {
      headers: {
        auth: token,
      },
    });
  };

  return !isLoggedIn ? (
    LoginForm()
  ) : (
    <div>
      <Button
        className="mx-3"
        variant="primary"
        type="submit"
        onClick={handleUsers}
      >
        Get Users
      </Button>

      <Button
        className="m-3"
        variant="primary"
        type="submit"
        onClick={handleBookings}
      >
        Get bookings
      </Button>

      <Button
        className="m-3"
        variant="primary"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Jwt;
