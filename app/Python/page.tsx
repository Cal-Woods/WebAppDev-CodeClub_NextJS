import { fetchPythonCardData } from "../DB-Interactions/Fetch-Tables/data";
import { BlueMessage } from "../ui/blueMessage";
import Card from "../ui/card";

export default async function Page() {
  const data = await fetchPythonCardData();
  //Store 'fetchPythonCardData' ^ data

  //Check if data is empty
  if(data == null) return(<p>There is no card data to show!</p>);
  
  return (
      <div>
      <BlueMessage title="Python" message="Learn about Python one of the world's most popular programming languages to create digital art, interactive images and models."/>
        <div className="w-full h-full flex flex-col justify-center md:flex-row">
          {data.map((el) => {return <Card key={el.id} description={el.description} message={el.message} imglink={el.imglink} buttonlink={el.buttonlink} buttontext={el.buttontext} title={el.title} />})}
        </div>
      </div>
  );
}