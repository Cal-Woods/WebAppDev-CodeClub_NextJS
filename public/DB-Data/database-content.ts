
//Import functions for fetching card data from db
import { fetchHomeCardData, fetchPythonCardData, fetchScratchCardData, fetchWebCardData } from "./Fetch-Cards/data"

//Store all card data for all pages from db
export const homeCardData = await fetchHomeCardData();
export const scratchCardData = await fetchScratchCardData();
export const pythonCardData = await fetchPythonCardData();
export const webCardData = await fetchWebCardData();


//Store menu entry data from db
