
import { homeCards } from "@/public/DB-Data/cards";
import { db } from "@vercel/postgres";

//Declare constant variable for db connection
const client = await db.connect();

async function seedCardDataTable() {
    //Use 'client.sql' to query database: Create table for homecarddata with columns matching data type 'Card', Store 
    await client.sql`
    CREATE TABLE IF NOT EXISTS card_data (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(512) NOT NULL,
    message VARCHAR(512) NOT NULL,
    imgLink VARCHAR(255) NOT NULL,
    buttonLink VARCHAR(255) NOT NULL,
    buttonText VARCHAR(255) NOT NULL
    );`;

    //Storing an array with card data in 'insertedCards'
    const insertedCards = await Promise.all(
        //'map()' function iterates over given data and does something for each one.
        // 
        homeCards.map((card) => client.sql`
            INSERT INTO card_data VALUES (${card.id}, ${card.title}, ${card.description}, ${card.message}, ${card.imgLink}, ${card.buttonLink}, ${card.buttonText})
            ON CONFLICT (id) DO NOTHING;
    `,
        ),
    );
    
    return insertedCards;
}

export async function GET() {
    //Initiate try-catch statement for interacting with database & catching errors
    try {
        //Run sql 'BEGIN' query
        await client.sql`BEGIN`;
        //Call function 'createTables'
        await seedCardDataTable();
        //Run sql 'COMMIT' query
        await client.sql`COMMIT`;

        //Return a json string 'success'
        return Response.json("Success!");
    }
    //Catch error
    catch(error) {
        //If there is an error, call sql'ROLLBACK' to undo attempt
        await client.sql`ROLLBACK`;

        //Return `${error}` in json string
        return Response.json(`${error}`);
    }
} 