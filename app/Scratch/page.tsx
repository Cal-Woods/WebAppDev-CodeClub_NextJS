import { BlueMessage } from "../ui/blueMessage";
import { scratchCards } from "@/public/Data/cards";
import Card from "../ui/card";

export default function Page() {
    return (
            <div className="w-full h-fit">
              <BlueMessage title="Scratch" message="Begin your adventure in digital making, by learning to code animations, stories and games in Scratch."/>
              <div className="w-full h-full flex flex-col justify-center md:flex-row">
                {scratchCards.map((el) => {
                  return <Card key={el.id} buttonLink={el.buttonLink} buttonText={el.title} desc={el.desc} imgLink={el.imgLink} title={el.title} message={el.message} />
                })}
              </div>
            </div>
    );
}