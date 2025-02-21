import { BlueMessage } from "./ui/blueMessage";
import Card from "./ui/card";
//import { cards } from "@/public/DB-Data/cards";

//Import function to get data from database
import { fetchHomeCardData } from "./DB-Interactions/Fetch-Tables/data";

import { cardProps } from "@/public/PropTypes/types";
import { ChristmasWindow } from "./ui/christmasWindow";

export default async function Page() {
  const data = await fetchHomeCardData();
  //Store 'fetchHomeCardData() function ^ to get db carddata

  return (
    <div className="w-full h-fit">
      <BlueMessage title="Learn to code with Codeclub" message="Our projects have step-by-step instructions to teach you how to create games, animations, and much more. Choose from hundreds of options, in up to 30 languages."/>
      <button id="accordion" className="w-full block bg-slate-400 border-2 border-slate-500  mb-[8px] sm:hidden">Cards</button>
      <div className="w-full h-full flex flex-col md:justify-center align-middle md:flex-row">
        {data.map((el) => {return <Card key={el.id} description={el.description} message={el.message} imglink={el.imglink} buttonlink={el.buttonlink} buttontext={el.buttontext} title={el.title} />})}
      </div>
      <ChristmasWindow />
    </div>
  );
}