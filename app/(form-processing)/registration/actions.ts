'use server'

import { db } from "@vercel/postgres"
import bcrypt from "bcryptjs"
import { permanentRedirect, RedirectType } from "next/navigation"

//Store database connection string
const client = await db.connect()

export async function handleSignUp(formData: FormData):Promise<void> {
    

    //Get all submitted data as string values
    const username = formData.get("user") as string
    const pass = formData.get("pass") as string
    const repass = formData.get("repass") as string
    const fName = formData.get("firstName") as string
    const lName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const dob = formData.get("dob") as string
    const interest = formData.get("interest") as string

    //Validate form data - if any formData is null or undefined
    if(!username || !pass || !repass || !fName || !lName || !email || !dob || !interest) {
        permanentRedirect("/", RedirectType.push)
    }

    //Hash password with bcrypt from bcryptjs
    const hash = await bcrypt.hash(pass, await bcrypt.genSalt(13))

    //Query db and insert formData
    await client.sql`BEGIN`
    await client.sql`INSERT INTO user_info (username, password, first_name, last_name, birth_date, email, account_type, primary_interest) VALUES(
        ${username}, ${hash}, ${fName}, ${lName}, ${dob}, ${email}, 'coder', ${interest}
    )`
    await client.sql`COMMIT`


    return
}