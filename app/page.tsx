import { BlueMessage } from "./ui/blueMessage";
import Card from "./ui/card";

//Import array that contains results of function to get data from database
import { homeCardData } from "@/public/DB-Data/database-content";

import { ChristmasWindow } from "./ui/christmasWindow";
import { cookies } from "next/headers";

export default async function Page() {
  //Get cookies
  const cookieStore = await cookies()
  
  //Print cookies
  console.log(cookieStore.toString())
  //Check if data is null
  if(homeCardData == null) return(<p>There is no card data to show!</p>);
  
  return (
    <div className="w-full h-fit">
      <BlueMessage title="Learn to code with Codeclub" message="Our projects have step-by-step instructions to teach you how to create games, animations, and much more. Choose from hundreds of options, in up to 30 languages."/>
      <button id="accordion" className="w-full block bg-slate-400 border-2 border-slate-500  mb-[8px] sm:hidden">Cards</button>
      <div className="w-full h-full flex flex-col md:justify-center align-middle md:flex-row">
        {homeCardData.map((el) => {return <Card key={el.id} description={el.description} message={el.message} imglink={el.imglink} buttonlink={el.buttonlink} buttontext={el.buttontext} title={el.title} />})}
      </div>
      <ChristmasWindow />
    </div>
  );
}