import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // navigation
  const navigate = useNavigate();

  // registation function
  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      console.log(responseError);
      setErrors(responseError?.data?.error);
    }

    console.log(data);

    if (data?.user?._id) {
      // show aler message
      toast.success("User Logged In Successfully");

      // clear state
      setErrors({});
      setEmail("");
      setPassword("");

      // navigate to login page
      navigate("/");
    }
  }, [data, isLoading, isError, responseError, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required!!";
    }

    if (!password) {
      validationErrors.password = "Password is required!!";
    }

    if (Object.keys(validationErrors)?.length > 0) {
      return setErrors(validationErrors);
    }

    // login
    login({ email, password });
  };

  return (
    <main className="flex items-center justify-center h-screen w-full">
      <div className="w-[400px] flex flex-col items-center bg-white px-5 py-8 rounded-xl shadow-md shadow-dark/10">
        <h3 className="text-xl">Welcome Back</h3>
        <p className="text-center text-sm mt-2">
          Don't miss your next opportunity. Sign in to stay updated on your
          professional world.
        </p>

        <form
          onSubmit={submitHandler}
          className="w-full mt-8 flex flex-col gap-4"
        >
          <div>
            <label htmlFor="email" className="text-dark text-sm mb-1 block">
              Email
            </label>
            <div className="flex items-center gap-2 border rounded-md py-2 px-3 bg-white w-full">
              <AiOutlineUser />
              <input
                type="text"
                id="email"
                className="w-full block outline-none bg-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors?.email && (
              <p className="mt-2 text-red-700">{errors?.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-dark text-sm mb-1 block">
              Password
            </label>
            <div className="flex items-center gap-2 border rounded-md py-2 px-3 bg-white w-full">
              <AiOutlineUser />
              <input
                type="password"
                id="password"
                className="w-full block outline-none bg-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors?.password && (
              <p className="mt-2 text-red-700">{errors?.password}</p>
            )}
          </div>
          <button className="uppercase w-full bg-primary text-white rounded-md py-2">
            sign in
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between w-full">
          <span className="text-primary text-[13px] cursor-pointer">
            Forgot password?
          </span>
          <Link to="/register" className="text-[13px] text-primary font-bold">
            Join now
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
