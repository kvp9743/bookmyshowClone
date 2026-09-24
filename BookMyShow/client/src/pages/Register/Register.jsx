import React from "react";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import { registerUser } from "../../Services/userApiCalls";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else message.error(response.message);
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#DF1827]">
      <div className="h-auto  rounded-xl p-4 bg-white shadow-2xl ">
        <h1 className=" text-center text-lg font-semibold">
          Welcome to BookMyShow, Please Register.
        </h1>
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <FormItem
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </FormItem>
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
          <div className=" flex flex-col items-center w-full">
            <Button fullwidth={true} title="Register" type="submit" />
            <Link
              to="/login"
              className=" mt-1 text-[#DF1827] hover:brightness-80"
            >
              Already have an acount, Login.
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
