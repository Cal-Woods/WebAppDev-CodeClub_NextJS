import { fetchWebCardData } from "../DB-Interactions/Fetch-Tables/data";
import { BlueMessage } from "../ui/blueMessage";
import Card from "../ui/card";

export default async function Page() {
  const data = await fetchWebCardData();
  //Store db fetch card data in data ^

  if(data == null) return(<p>There is no card data to show</p>);
  
  return (
      <div>
      <BlueMessage title="Web" message="Begin your adventure in web design by learning how to structure, and style webpages."/>
            <div className="w-full h-full flex flex-col justify-center md:flex-row">
              {data.map((el) => {
                return <Card key={el.id} buttonlink={el.buttonlink} buttontext={el.title} description={el.description} imglink={el.imglink} title={el.title} message={el.message} />
              })}
            </div>
      </div>
  );
}