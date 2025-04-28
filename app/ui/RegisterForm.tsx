'use client'
import { useActionState } from "react"
import { handleSignUp } from "../(form-processing)/registration/actions"
import { boolean } from "zod";

export default function RegisterForm() {
    //Declare constant to use useActionState() hook for forms
    const [state, action, isPending] = useActionState(handleSignUp, undefined);
    return (
        <div id="outer" className="w-[400px] md:w-[750px] lg:w-[1000px] h-fit border-black border-x-2 border-y-2 md:mt-4 m-auto clear-both bg-white align-middle text-black">
            <div id="inner" className="w-full m-auto text-center">
                <form id="register" aria-label="Sign-up form" action={action}>
                    <fieldset className="border-2 border-dotted border-red-600">
                    <legend aria-label="Personal Details" className="text-lg font-semibold underline mt-2 m-auto">Personal Details</legend>

                    <label htmlFor="firstName">First Name</label> <br />
                    <input type="text" name="firstName" id="firstName" placeholder="Enter first name" defaultValue={state?.fName?.toString()} className="w-[90%] mt-2 border-2 border-black drop-shadow-sm" required/> <br /> <br />

                    <label htmlFor="lastName">Last Name</label> <br />
                    <input type="text" name="lastName" id="lastName" placeholder="Enter last name" defaultValue={state?.lName?.toString()} className="w-[90%] mt-2 border-2 border-black drop-shadow-sm" required/> <br /> <br />

                    <label htmlFor="date">Date of birth</label> <br />
                    <input type="date" name="dob" id="date" defaultValue={state?.dob?.toString()} className="w-[90%] mt-2 border-2 border-black drop-shadow-sm" required/> <br /> <br />

                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" placeholder="Enter email address" defaultValue={state?.email?.toString()} className="mt-2 w-[90%] border-2 border-black drop-shadow-sm" required></input> <br />
                    {state?.errors?.email && <p className="text-sm text-red-700">{state.errors.email}.</p>}

                    <select aria-label="select area of interest" name="interest" id="interest" defaultValue={"default"} className="w-[90%] mt-2 text-center border-2 drop-shadow-md border-black bg-blue-700" aria-required required>
                        <option value="default">Area of interest</option>
                        <option value="scratch" aria-label="Scratch">Scratch</option>
                        <option value="python" aria-label="Python">Python</option>
                        <option value="web" aria-label="Web">Web</option>
                    </select> <br />
                    </fieldset>

                    <fieldset className="border-2 border-dotted border-red-600">
                        <legend aria-label="username and password" className="text-lg font-semibold underline mt-2 m-auto">Username & Password</legend>
                        <label htmlFor="user">Username</label> <br />
                        <input type="text" name="user" id="user" defaultValue={state?.uName?.toString()} className="w-[90%] mt-2 border-black border-2" required></input> <br />
                        <label htmlFor="pass">Password</label> <br />
                        <input type="password" name="pass" id="pass" autoComplete="false" className="w-[90%] mt-2 border-black border-2" required></input> <br />
                        {state?.errors?.password && (
                            <div>
                                <p className="text-sm text-red-800">Password must:</p>
                                <ul>
                                    {state.errors.password.map(err => (
                                        <li key={err} className="text-sm text-red-800">{err}</li>
                                ))  }
                                </ul>
                            </div>
                        )}
                        <label htmlFor="repass">Re-type password</label> <br />
                        <input type="password" name="repass" id="repass" autoComplete="false" className="w-[90%] mt-2 border-black border-2" required></input> <br />
                        {state?.errors?.confirmPassword && <p className="text-red-800">{state.errors.confirmPassword}</p>}
                    </fieldset>

                    <button name="reg_submit" type="submit" disabled={isPending} className="w-[90%] border-2 border-black bg-slate-400 hover:bg-white active:bg-cyan-200 active:text-black">Submit details</button>
                </form>
            </div>
        </div>
    )
}