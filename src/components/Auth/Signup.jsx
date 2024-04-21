import React, { Component, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const setAlertTimer = (stateUpdate) => {
    stateUpdate(true)
    setTimeout(() => {
      stateUpdate(false)
    }, 2000);
  }
  const setAlertType = (r) => {
    if (success) {
      return "success"
    } else if (error) {
      return "error"
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: uuidv4(),
        name,
        email :email.toLowerCase(),
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpen(true)
        if (data.status == "ok") {
          setAlertTimer(setSuccess)
          setAlertMsg("Registration Successful");
          setName('')
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/login')
          }, 500);
        } else if (data.status == "Conflict") {
          setAlertTimer(setError)
          setAlertMsg(data.msg);
        } else {
          setAlertTimer(setError)
          console.log(data.msg);
          setAlertMsg("Something went wrong");
        }
      });
  };
  console.log(alertMsg);
  return (
    <>
      <div className="loginContainer h-[100vh] w-full flex flex-1 justify-center items-center">
        <div className={`px-6 py-8 lg:px-8 h-auto bg-white bg-opacity-80 rounded-3xl`}>
          <div className="mx-10 px-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-40"
              src={`${window.location.origin}/images/logo.png`}
              alt="FoodLand_Logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mx-10 px-5 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already Have an Accound ?{' '}
              <a href="/login" className="font-semibold leading-6 text-orange-500 hover:text-indigo-500">
                <u>SignIn</u>
              </a>
            </p>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={setAlertType()}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
}