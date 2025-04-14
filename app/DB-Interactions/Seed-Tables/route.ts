import { cards, menuData } from "@/public/DB-Data/data-inserts";
import { db } from "@vercel/postgres";
import { userInfo } from "../(User-DB)/placeholder-user-info";
import bcrypt from "bcryptjs";


//Declare constant variable for db connection
const client = await db.connect();

/**
 * Creates & seeds the 'card_data' table in connected database.
 * @returns Promise result of inserting cards
 */
async function seedCardDataTable() {
    //Use 'client.sql' to query database: Create table for homecarddata with columns matching data type 'Card', Store 
    await client.sql`
    CREATE TABLE IF NOT EXISTS card_data (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    pos NUMERIC(2,0) NOT NULL UNIQUE,
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
        cards.map((card) => client.sql`
            INSERT INTO card_data VALUES (${card.id}, ${card.pos}, ${card.title}, ${card.description}, ${card.message}, ${card.imgLink}, ${card.buttonLink}, ${card.buttonText})
            ON CONFLICT (id) DO NOTHING;
    `,
        ),
    );
    
    return insertedCards;
}

/**
 * Creates & seeds 'menu_data' table in database.
 * @returns Promise results of inserted menu entries
 */
async function seedMenuDataTable() {
    //Use 'client.sql' to query database: Create table for menu data with columns matching data type 'menuData'
    await client.sql`
    CREATE TABLE IF NOT EXISTS menu_data (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL UNIQUE
    );`;

    //Storing an array with menu data in 'insertedMenuEntries'
    const insertedMenuEntries = await Promise.all(
        //'map()' function iterates over given data and does something for each one.
        // 
        menuData.map((entry) => client.sql`
            INSERT INTO menu_data VALUES (${entry.id}, ${entry.title}, ${entry.link})
            ON CONFLICT (link) DO NOTHING;
    `,
        ),
    );
    
    return insertedMenuEntries;
}

/**
 * Creates & seeds 'user_info' table in database.
 * @returns Promise results of inserted user entries
 */
async function seedUserInfoTable() {
    //Use 'client.sql' to query database: Create table for menu data with columns matching data type 'menuData'
    await client.sql`
    CREATE TABLE IF NOT EXISTS user_info (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date date NOT NULL,
    email VARCHAR(255) UNIQUE,
    account_type VARCHAR(255) NOT NULL,
    primary_interest VARCHAR(255) NOT NULL
    );`;

    //Hash passwords
    const secrets = [await bcrypt.hash(userInfo[0].password, 13), await bcrypt.hash(userInfo[1].password, 13)];
    
    
    //Storing an array with user data in 'insertedUserEntries'
    const insertedUserEntries = await Promise.all([
        //'map()' function iterates over given data and does something for each one.
        // hash passwords
        client.sql`
            INSERT INTO user_info (username, password, first_name, last_name, birth_date, email, account_type, primary_interest) VALUES (${userInfo[0].username}, ${secrets[0]}, ${userInfo[0].fName}, ${userInfo[0].lName}, ${userInfo[0].dob},${userInfo[0].email}, ${userInfo[0].accountType}, ${userInfo[0].interest})
            ON CONFLICT (username) DO NOTHING;`,
        client.sql`
            INSERT INTO user_info (username, password, first_name, last_name, birth_date, email, account_type, primary_interest) VALUES (${userInfo[1].username}, ${secrets[1]}, ${userInfo[1].fName}, ${userInfo[1].lName}, ${userInfo[1].dob},${userInfo[1].email}, ${userInfo[1].accountType}, ${userInfo[1].interest})
            ON CONFLICT (username) DO NOTHING;`,
    ])

    return insertedUserEntries;
}


export async function GET() {
    //Initiate try-catch statement for interacting with database & catching errors
    try {
        //Run sql 'BEGIN' query
        await client.sql`BEGIN`;
        //Call function 'seedCardDataTable'
        await seedCardDataTable();
        //Call function 'seedMenuDataTable'
        await seedMenuDataTable();
        //Call function seedUserInfoTable()
        await seedUserInfoTable();
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