import { BlueMessage } from "./ui/blueMessage";
import Card from "./ui/card";
import { homeCards } from "@/public/DB-Data/cards";
import { ChristmasWindow } from "./ui/christmasWindow";

export default function Page() {
  return (
    <div className="w-full h-fit">
      <BlueMessage title="Learn to code with Codeclub" message="Our projects have step-by-step instructions to teach you how to create games, animations, and much more. Choose from hundreds of options, in up to 30 languages."/>
      <button id="accordion" className="w-full block bg-slate-400 border-2 border-slate-500  mb-[8px] sm:hidden">Cards</button>
      <div className="w-full h-full flex flex-col md:justify-center align-middle md:flex-row">
        {homeCards.map((el) => {
          return <Card key={el.id} buttonLink={el.buttonLink} buttonText={el.buttonText} desc={el.desc} imgLink={el.imgLink} title={el.title} message={el.message} />
        })}
      </div>
      <ChristmasWindow />
    </div>
  );
}
