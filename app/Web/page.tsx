import { BlueMessage } from "../ui/blueMessage";
import { webCards } from "@/public/DB-Data/cards";
import Card from "../ui/card";

export default function Page() {
    return (
        <div>
        <BlueMessage title="Web" message="Begin your adventure in web design by learning how to structure, and style webpages."/>
              <div className="w-full h-full flex flex-col justify-center md:flex-row">
                {webCards.map((el) => {
                  return <Card key={el.id} buttonLink={el.buttonLink} buttonText={el.title} description={el.description} imgLink={el.imgLink} title={el.title} message={el.message} />
                })}
              </div>
        </div>
    )
}