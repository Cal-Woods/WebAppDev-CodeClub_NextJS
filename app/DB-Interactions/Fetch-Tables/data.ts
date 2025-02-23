import { cardData } from '@/public/PropTypes/types';
import {sql} from '@vercel/postgres';

/**
 * Gets card data for home page, from db.
 * @returns Fetched data
 */
export async function fetchHomeCardData() {
    //Try to fetch data from the db
    try {
        const data = await sql<cardData>`SELECT * FROM card_data WHERE id ILIKE 'HC_'`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.log("This issue is already handled, I logged it for troubleshooting purposes!\n"+error);
        return null;
    }
}

/**
Gets Scratch card data from db.
@returns Fetched data
*/
export async function fetchScratchCardData() {
    //Try to fetch data from the db
    try {
        const data = await sql<cardData>`SELECT * FROM card_data WHERE id ILIKE 'SC_'`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.log("This issue is already handled, I logged it for troubleshooting purposes!\n"+error);
        return null;
    }
}

export async function fetchPythonCardData() {
    //Try to fetch data from the db
    try {
        const data = await sql<cardData>`SELECT * FROM card_data WHERE id ILIKE 'PC_'`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.log("This issue is already handled, I logged it for troubleshooting purposes!\n"+error);
        return null;
    }
}

export async function fetchWebCardData() {
    //Try to fetch data from the db
    try {
        const data = await sql<cardData>`SELECT * FROM card_data WHERE id ILIKE 'WC_'`; 

        return data.rows;
    }
    //Catch a possible error
    catch(error) {
        console.log("This issue is already handled, I logged it for troubleshooting purposes!\n"+error);
        return null;
    }
}