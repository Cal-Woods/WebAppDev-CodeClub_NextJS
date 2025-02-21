import { fetchScratchCardData } from "../DB-Interactions/Fetch-Tables/data";
import { BlueMessage } from "../ui/blueMessage";
import Card from "../ui/card";

export default async function Page() {
  const data = await fetchScratchCardData();
    return (
            <div className="w-full h-fit">
              <BlueMessage title="Scratch" message="Begin your adventure in digital making, by learning to code animations, stories and games in Scratch."/>
              <div className="w-full h-full flex flex-col justify-center md:flex-row">
                {data.map((el) => {return <Card key={el.id} description={el.description} message={el.message} imglink={el.imglink} buttonlink={el.buttonlink} buttontext={el.buttontext} title={el.title} />})}

              </div>
            </div>
    );
}