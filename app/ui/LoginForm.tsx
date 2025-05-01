'use client'

import { useActionState } from "react";
import { handleLogin } from "../(form-processing)/registration/actions";

export default function LoginForm() {
    const [state, action, isPending] = useActionState(handleLogin, undefined)

    return(
        <div id="login-form-outer" className="min-w-[450px] max-w-[650px] sm:min-w-[550px] sm:max-w-[800px] md:min-w-[900px] md:max-w-[1200px] lg:min-w-[1200px] m-auto border-white border-2 border-dotted">
            <div id="login-form-inner" className="w-[90%] h-[300px] m-auto text-center bg-green-300">
                <form id="login-form" action={action} className="h-fit text-black">
                    <label htmlFor="userName" className="inline-block mt-8 text-center">Enter username</label> <br />
                    <input type="text" name="username" id="userName" defaultValue={state?.username} placeholder="Enter username" className="w-full border-2 border-black rounded-sm" required/>
                    {state?.error && <p className="mt-4 text-sm text-red-700">{state.error}</p>}

                    <label htmlFor="passWord" className="inline-block mt-8 text-center">Enter password</label> <br />
                    <input type="password" name="password" id="passWord" placeholder="Enter password" className="w-full border-2 border-black rounded-sm text-black" minLength={8} required/>

                    <button type="submit" disabled={isPending} className="w-full mt-4 bg-slate-500 hover:bg-slate-400 active:bg-slate-200">Submit</button>
                </form>
                {state?.message && <p className="mt-4 text-sm text-white sm:text-green-600">{state.message}</p>}
            </div>
        </div>
    );
}