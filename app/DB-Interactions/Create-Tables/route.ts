
import { db } from "@vercel/postgres";

//Declare constant variable for db connection
const client = await db.connect();

async function seedTables() {
    //Use 'client.sql' to query database: Create table for homecarddata with columns matching data type 'Card'
    const cards = await client.sql`CREATE TABLE IF NOT EXISTS homecarddata (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    imgLink VARCHAR(255) NOT NULL,
    buttonLink VARCHAR(255) NOT NULL,
    buttonText VARCHAR(255) NOT NULL
    );`;

    return await Promise.resolve(() => {{cards}});
}

export async function GET() {
    //Initiate try-catch statement for interacting with database & catching errors
    try {
        //Run sql 'BEGIN' query
        await client.sql`BEGIN`;
        //Call function 'createTables'
        await seedTables();
        //Run sql 'COMMIT' query
        await client.sql`COMMIT`;
        return Response.json("Success!");
    }
    //Catch error
    catch(error) {
        //If there is an error, call sql'ROLLBACK' to undo attempt
        await client.sql`ROLLBACK`;

        return Response.json(`${error}`);
    }
} 