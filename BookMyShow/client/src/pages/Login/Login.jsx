import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";

import { Input, message } from "antd";
import { loginUser } from "../../Services/userApiCalls";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        navigate("/");
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#DF1827]">
      <div className="h-auto  rounded-xl p-4 bg-white shadow-2xl ">
        <h1 className=" text-center text-lg font-semibold">
          Welcome to BookMyShow, Please Login.
        </h1>
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <FormItem
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </FormItem>
          <div className=" flex flex-col items-center">
            <Button fullwidth={true} title="Login" type="submit" />
            <Link to="/register" className=" mt-1 text-[#DF1827]">
              Don't have an acount, Register.
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
