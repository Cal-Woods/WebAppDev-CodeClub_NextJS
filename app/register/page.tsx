
import { BlueMessage } from "../ui/blueMessage"
import RegisterForm from "../ui/RegisterForm";

export default async function Page() {
  
    return (
      <div id="registration">
        <BlueMessage title="Register" message="Sign up for an account to be able to book yourself into upcoming events."></BlueMessage>
        <RegisterForm />
      </div>
    );
}