import React, { Component, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState()
    const [otpExpiry, setOtpExpiry] = useState(false)
    const [sendOTP, setSendOTP] = useState(false)
    const [otpVerify, setOtpVerify] = useState(false)
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [alertMsg, setAlertMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const inputRefs = useRef([]);
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
        if(success && !error){
          return "success"
        }else if(error && !success){
          return "error"
        }
      }
    function handleSubmit(e) {
        e.preventDefault();
        setOtpExpiry(true)
        fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                // otp: Math.floor(1000 + Math.random() * 9000)
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setOpen(true)
                if (data.status == "ok") {
                    setAlertTimer(setSuccess)
                    setSendOTP(true)
                    setOtp(data.OTP)
                    setAlertMsg(data.msg)
                } else {
                    setAlertTimer(setError)
                    setAlertMsg(data.msg)
                }
            });
        setTimeout(() => {
            setOtpExpiry(false)
            setAlertTimer(setError)
            setAlertMsg("OPT Expried Try Again")
        }, 60000);
    }
    const handleChange = (index, event) => {
        const { value } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        // Move focus to the next input field
        if (value.length === 1 && index < inputs.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    const submitOtp = () => {
        if (otp == inputs.join('')) {
            setOpen(true)
            if (otpExpiry) {
                setAlertMsg("otp verifyed successfully");
                setOtpVerify(true)
            } else {
                setAlertTimer(setError)
                setAlertMsg("OPT Expried Try Again")
            }

        } else {
            setOpen(true)
            setAlertTimer(setError)
            setAlertMsg("Please Enter valid OTP");
        }
    }
    useEffect(() => {
        setAlertMsg("")
    }, [email, inputs])
    const changePassword = (e) => {
        e.preventDefault();
        if (newPass == confirmPass) {
            fetch("http://localhost:5000/update-password", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    newPass
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "ok") {
                        setOpen(true)
                        setAlertTimer(setSuccess)
                        setAlertMsg("password change successfully");
                        setTimeout(() => {
                            navigate('/login')
                        }, 500);
                    }
                });
        } else {
            setOpen(true)
            setAlertTimer(setError)
            setAlertMsg("Passwords do not match.");
        }
    }
    return (
        <>
        <div className="loginContainer h-[100vh] w-full flex flex-1 justify-center items-center">
            <div className={`w-96 px-10 py-8 lg:px-8 h-auto bg-white bg-opacity-80 rounded-3xl`}>
                {!otpVerify ? <>
                    <div className="mx-10 px-10 flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-40"
                            src={`${window.location.origin}/images/logo.png`}
                            alt="FoodLand_Logo"
                        />
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Forgot Password
                        </h2>
                    </div>
                    {!sendOTP ?
                        <div className="mx-10 px-5 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Enter Your Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-orange-500 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        Send OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="px-10">
                            <span className="text-xs mt-10 font-medium leading-6 text-gray-700">OTP Shared to {email}</span>
                            <div className="flex justify-between my-5">
                                {inputs.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={el => (inputRefs.current[index] = el)}
                                        className="h-10 w-10 text-center text-2xl rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                        maxLength="1"
                                        value={value}
                                        onChange={e => handleChange(index, e)}
                                    />
                                ))}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={inputs.join('').length < 4}
                                    onClick={submitOtp}
                                    className={`flex w-full justify-center rounded-md ${inputs.join('').length < 4 ? 'bg-orange-200' : 'bg-orange-500 hover:bg-indigo-500'} px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
                                >
                                    Submit OTP
                                </button>
                            </div>
                        </div>}
                </> : <form className="space-y-6" method="POST" onSubmit={changePassword}>
                    <div className="mx-10 px-5 flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-40"
                            src={`${window.location.origin}/images/logo.png`}
                            alt="FoodLand_Logo"
                        />
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Reset Password
                        </h2>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="emailShow" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="emailShow"
                                name="emailShow"
                                type="email"
                                autoComplete="off"
                                disabled
                                value={email}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="my-10">
                        <button
                            type="submit"
                            className={`flex w-full justify-center rounded-md bg-orange-500 hover:bg-indigo-500 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
                        >
                            Change Password
                        </button>
                    </div>
                </form>}

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