'use server'

import { db, sql } from "@vercel/postgres"
import bcrypt from 'bcryptjs'
import { permanentRedirect, RedirectType } from "next/navigation"
import { registrationSchema } from "./user-validation-schema"
import { userData, userVerifyData } from "@/public/PropTypes/types"
import { cookies } from "next/headers"

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
    //Declare cookies to access cookies()
    const cookieStore = await cookies()

    //Validation
    if(data.get("username") == null || data.get("password") == null) {
        throw new Error('One or more fields is null!')
    }

    //Declare a constant for each piece of data
    const user = data.get("username") as string
    const pass = data.get("password") as string


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
    if(compared == true) {
        console.log("Login successful!")

        //Match was found so get details from db
        const userDetails = await sql<userData>`SELECT (username, first_name, last_name, birth_date, email, account_type, primary_interest) FROM user_info WHERE username = ${user}`

        //Put userDetails into session
        await cookieStore.set({
            name:'authSessionUser',
            value:userDetails.rows[0].username,
            expires:1000*60*60*24,
            secure:true
        })
        await cookieStore.set({
            name:'authSessionType',
            value:userDetails.rows[0].type,
            expires:1000*60*60*24,
            secure:true
        })
        await cookieStore.set({
            name:'authSessionfName',
            value:userDetails.rows[0].fName,
            expires:1000*60*60*24,
            secure:true
        })
        await cookieStore.set({
            name:'authSessionlName',
            value:userDetails.rows[0].lName,
            expires:1000*60*60*24,
            secure:true
        })
        await cookieStore.set({
            name:'authSessionInterest',
            value:userDetails.rows[0].interest,
            expires:1000*60*60*24,
            secure:true
        })
        await cookieStore.set({
            name:'authSessionDob',
            value:userDetails.rows[0].dob.toDateString(),
            expires:1000*60*60*24,
            secure:true
        })
        
        return {message:"Login successful!"}
    }
    else {
        return {userName:user, error: "Password was incorrect!"};
    }
}