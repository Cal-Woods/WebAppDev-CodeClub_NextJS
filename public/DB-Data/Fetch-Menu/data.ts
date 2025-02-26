import { menu } from "@/public/PropTypes/types";
import { sql } from "@vercel/postgres";

/**
 * Fetches data from Database table 'menu_data' containing info on website nav menu entries.
 * 
 * @return All returned rows from database
 */
export async function fetchAllMenuentries() {
    //Try to fetch data from the db
    try {
        const data = await sql<menu>`SELECT * FROM menu_data`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.log("This issue is already handled, I logged it for troubleshooting purposes!\n"+error);
        return null;
    }
}