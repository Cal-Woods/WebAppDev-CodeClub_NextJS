import Link from "next/link";

export default function LoginReg() {
    
    return(
        <div id="login-reg-links">
            <Link href={"/login"} aria-label="Login link">Login</Link>
            <p className="inline-block">/</p>
            <Link href={"/register"} aria-label="Register link" className="inline-block">Register</Link>
        </div>
    );
}