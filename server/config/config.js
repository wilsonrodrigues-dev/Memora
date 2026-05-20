import dotenv from 'dotenv'
dotenv.config()

export const config={
    PORT:process.env.PORT,
    GOOGLE_DRIVE_FOLDER_ID:process.env.GOOGLE_DRIVE_FOLDER_ID
}