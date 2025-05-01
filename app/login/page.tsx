import { cookies } from "next/headers";
import { BlueMessage } from "../ui/blueMessage";
import LoginForm from "../ui/LoginForm";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
    //Get cookies
    const cookieStore = await cookies()

    //Validate user
    if(cookieStore.has("authSessionUser") == true) {
        redirect("/", RedirectType.replace)
    }
    return (
        <div id="login">
            <BlueMessage title="Login" message="Login from here to book events or manage event tickets if you are an admin." />
            <LoginForm />
        </div>
    );
}