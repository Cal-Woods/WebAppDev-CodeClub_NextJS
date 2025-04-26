import { BlueMessage } from "../ui/blueMessage";
import LoginForm from "../ui/LoginForm";

export default function Page() {
    return (
        <div id="login">
            <BlueMessage title="Login" message="Login from here to book events or manage event tickets if you are an admin." />
            <LoginForm />
        </div>
    );
}