import { cardData } from '@/public/PropTypes/types';
import {sql} from '@vercel/postgres';

export async function fetchHomeCardData() {
    //Try to fetch data from the db
    try {
        const data = await sql<cardData>`SELECT * FROM card_data WHERE id ILIKE 'HC_'`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.error('Database Error:', error);
        throw new Error("Could not fetch card data!");
    }
}