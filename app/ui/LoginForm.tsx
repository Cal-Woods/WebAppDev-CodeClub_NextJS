export default function LoginForm() {


    return(
        <div id="login-form-outer" className="min-w-[450px] max-w-[650px] sm:min-w-[550px] sm:max-w-[800px] md:min-w-[900px] md:max-w-[1200px] lg:min-w-[1200px] h-fit m-auto ">
            <div id="login-form-inner" className="w-[90%] h-[300px] m-auto text-center bg-green-400">
                <form id="login-form" action="#">
                    <fieldset className="border-white border-dotted border-2">
                        <legend className="m-auto pt-8">Login</legend>
                        <label htmlFor="userName" className="inline-block mt-8 text-center">Enter username</label> <br />
                        <input type="text" name="username" id="userName" placeholder="Enter username" className="w-full border-2 border-black rounded-sm" required/>

                        <label htmlFor="passWord" className="inline-block mt-8 text-center">Enter password</label> <br />
                        <input type="password" name="password" id="passWord" placeholder="Enter password" className="w-full border-2 border-black rounded-sm text-black" minLength={8} required/>

                        <button type="submit" className="w-full mt-14 bg-slate-500 hover:bg-slate-400 active:bg-slate-200">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}