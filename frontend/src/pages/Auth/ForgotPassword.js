import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/registerstyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/auth/forgot-password`,
        {
          email,
          newpassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot-Password | Ecommerce"}>
      <div className="h-screen flex flex-col items-center justify-center form-container">
        <h1>Forgot Password</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mx-4">
            Reset
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
