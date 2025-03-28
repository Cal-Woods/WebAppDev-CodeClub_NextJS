import { BlueMessage } from "../ui/blueMessage"

export default function Page() {
    return (
      <div id="registration">
      <BlueMessage title="Register" message="Sign up for an account to be able to book yourself into upcoming events."></BlueMessage>
      <div id="outer" className="w-[400px] md:w-[750px] lg:w-[1000px] h-fit border-black border-x-2 border-y-2 md:mt-4 m-auto clear-both bg-white align-middle text-black">
        <div id="inner" className="w-full m-auto text-center">
          <form id="register" aria-label="Sign-up form.">
            <legend aria-label="Personal Details" className="text-lg font-semibold underline mt-2">Personal Details</legend>

            <label htmlFor="firstName">First Name</label> <br />
            <input type="text" name="firstName" id="firstName" placeholder="Enter first name:" className="w-[90%] mt-2 border-2 border-black drop-shadow-sm"/> <br /> <br />

            <label htmlFor="lastName" className="">Last Name</label> <br />
            <input type="text" name="lastName" id="lastName" placeholder="Enter last name" className="w-[90%] mt-2 border-2 border-black drop-shadow-sm"/> <br /> <br />

            <label htmlFor="date">Date of birth</label> <br />
            <input type="date" name="date" id="date" className="w-[90%] mt-2 border-2 border-black drop-shadow-sm"/> <br /> <br />

            <label htmlFor="email">Email</label> <br />
            <input type="email" id="email" placeholder="Enter email address" className="mt-2 w-[90%] border-2 border-black drop-shadow-sm"></input> <br />

            <select aria-label="select area of interest" name="interest" id="interest" defaultValue="default" className="w-[90%] text-center border-2 drop-shadow-md border-black bg-blue-700">
              <option value="default">Area of interest</option>
              <option value="scratch">Scratch</option>
              <option value="python">Python</option>
              <option value="web">Web</option>
            </select>


          </form>
        </div>
      </div>
      </div>
    );
}