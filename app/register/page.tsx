import { cookies } from "next/headers";
import { BlueMessage } from "../ui/blueMessage"
import RegisterForm from "../ui/RegisterForm";

export default async function Page() {
  const cookieStore = await cookies()
  
    return (
      <div id="registration">
        <BlueMessage title="Register" message="Sign up for an account to be able to book yourself into upcoming events."></BlueMessage>
        <RegisterForm />
      </div>
    );
}