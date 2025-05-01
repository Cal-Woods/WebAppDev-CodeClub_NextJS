'use server'

import { db, sql } from "@vercel/postgres"
import bcrypt from 'bcrypt'
import { permanentRedirect, RedirectType } from "next/navigation"
import { registrationSchema } from "./user-validation-schema"
import { userData, userVerifyData } from "@/public/PropTypes/types"

//Store database connection string
const client = await db.connect()

export async function handleSignUp(state: object|undefined, formData: FormData) {
    //Store registerSchema Zod object from neighbouring user-validation.ts file
    const validated = registrationSchema.safeParse({
        email:formData.get("email"),
        password:formData.get("pass"),
        confirmPassword:formData.get("repass")
    });

    //Check if validation was NOT a success
    if(!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            email: formData.get("email"),
            fName: formData.get("firstName"),
            lName: formData.get("lastName"),
            dob: formData.get("dob"),
            uName: formData.get("user"),
            area: formData.get("interest")
        };
    }

    //Get all submitted data as string values
    const username = formData.get("user") as string
    const pass = formData.get("pass") as string
    const repass = formData.get("repass") as string
    const fName = formData.get("firstName") as string
    const lName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const dob = formData.get("dob") as string
    const interest = formData.get("interest") as string

    //Validate form data - if any formData is null or undefined, then redirect to web app root route
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

//Server action to handle login
export async function handleLogin(state: object|undefined, data:FormData) {
    //Validation
    if(data.get("username") == null || data.get("password") == null) {
        return
    }

    //Declare a constant for each piece of data
    const user = data.get("username") as string
    const pass = data.get("pass")?.toString() as string

    //Store result of looking up given username in db
    const checkedUserName = await Promise.resolve(sql<userVerifyData>`SELECT username, password FROM user_info WHERE username = ${user}`)

    //Check checkedUserName
    if(checkedUserName.rowCount == null) {
        throw new Error("Something bad happened while connecting to the database!");
    }

    if(checkedUserName.rowCount < 1) {
        console.log("No matches!")
        return {username:user, error:"There were no matches for that username!"};
    }
    //Store hashed password value
    const hashPass = checkedUserName.rows[0].password
    const compared = await bcrypt.compare(pass, hashPass)

    //Check hashed password against data
    if(compared) {
        console.log("Login successful!")

        //Match was found so get details from db
        const userDetails = await sql<userData>`SELECT (username, first_name, last_name, birth_date, email, account_type, primary_interest) FROM user_info WHERE username = ${user}`

        console.log(userDetails)
        //Put userData into session
        
        return {userName:user, message:"Login successful!"}
    }
    else {
        console.log(pass.toString(), checkedUserName.rows[0].password)
        return {userName:user, message: "Password was incorrect!"};
    }
}