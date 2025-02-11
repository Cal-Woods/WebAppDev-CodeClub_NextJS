import { BlueMessage } from "../ui/blueMessage";
import { pythonCards } from "@/public/DB-Data/cards";
import Card from "../ui/card";

export default function Page() {
    return (
        <div>
        <BlueMessage title="Python" message="Learn about Python one of the world's most popular programming languages to create digital art, interactive images and models."/>
              <div className="w-full h-full flex flex-col justify-center md:flex-row">
                {pythonCards.map((el) => {
                  return <Card key={el.id} buttonLink={el.buttonLink} buttonText={el.title} description={el.description} imgLink={el.imgLink} title={el.title} message={el.message} />
                })}
              </div>
        </div>
    )
}