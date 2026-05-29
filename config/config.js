import dotenv from 'dotenv'
dotenv.config()

if(!process.env.PORT){
    console.error("PORT is not defined in environment variables.");
    process.exit(1);
}
if(!process.env.GOOGLE_DRIVE_FOLDER_ID) {
    console.error("GOOGLE_DRIVE_FOLDER_ID is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.client_id) {
    console.error("client_id is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.client_secret) {
    console.error("client_secret is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.redirect_uris) {
    console.error("redirect_uris is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.access_token) {
    console.error("access_token is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.refresh_token) {
    console.error("refresh_token is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.scope) {
    console.error("scope is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.token_type) {
    console.error("token_type is not defined in environment variables.");
    process.exit(1);
}

if(!process.env.expiry_date) {
    console.error("expiry_date is not defined in environment variables.");
    process.exit(1);
}



export const config={
    PORT:process.env.PORT||3000,
    GOOGLE_DRIVE_FOLDER_ID:process.env.GOOGLE_DRIVE_FOLDER_ID,
    client_secret:process.env.client_secret,
    client_id:process.env.client_id,
    redirect_uris:process.env.redirect_uris,
    access_token:process.env.access_token,
    refresh_token:process.env.refresh_token,
    scope:process.env.scope,
    token_type:process.env.token_type,
    expiry_date:Number(process.env.expiry_date)


}