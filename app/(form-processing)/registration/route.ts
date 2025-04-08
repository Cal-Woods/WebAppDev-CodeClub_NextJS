'use server'

export async function POST() {
    //TODO: Prevent user from accessing route without proper credentials
    return Response.json("Registered");
}