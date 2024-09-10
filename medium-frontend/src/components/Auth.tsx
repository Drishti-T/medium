
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInputType } from "@hellcat/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignUpInputType>({
        // ideally  u should have two seprate componenets 1. sigin and 2 signup 
        // and only the re-usable component should be extracted out 
        // useState<SignupInputtype> here conditional types are difficult
        // never add signin or signup types like this in this statement: useState<SignUpInputType>
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        console.log("async funtion req starting");
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
                
            );
            console.log(response);
            const jwt = response.data;
            console.log(jwt.jwt);
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch (error) {

            console.error('Request failed with error:', error);
            alert("Request failed");
            // alert the user that the request failed
        }

    }

    return <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}


        <div className="flex justify-center">
            <div>

                {/* this should be a auth header component ____________
and use theAuthHeader component in sigin and signup component */}
                <div className="px-12">
                    <div className="text-3xl font-extrabold">
                        Create account
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Signup" : "Signin"}
                        </Link>
                    </div>
                </div>
                {/* _____________ */}
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            // if name: e.target.value throws an error then use the below code
                            name: (e.target as HTMLInputElement).value,
                        }))
                    }}></LabelledInput> : null}
                    <LabelledInput label="Username" placeholder="email" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            // if name: e.target.value throws an error then use the below code
                            username: (e.target as HTMLInputElement).value,

                        }))
                    }}></LabelledInput>
                    <LabelledInput label="Password" type={"password"} placeholder="Password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            // if name: e.target.value throws an error then use the below code
                            password: (e.target as HTMLInputElement).value,

                        }))
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signup" : "signin"}</button>

                </div>
            </div>
        </div>

    </div>
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent) => void;
    type?: string; // in order to show stars instead of text in password fiels
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {

    return <div>
        <label className="block mb-2 text-sm font-bold text-black pt-4">{label}</label>
        <input onChange={onChange} type={type || "text "} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
}