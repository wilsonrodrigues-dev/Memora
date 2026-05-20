import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis';
import credentials from "./credentials.json" with { type: "json" };

const SCOPES = ["https://www.googleapis.com/auth/drive"];


const { client_secret, client_id, redirect_uris } =
  credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const TOKEN_PATH = "token.json";

async function authorize() {

  if (fs.existsSync(TOKEN_PATH)) {

    const token = fs.readFileSync(TOKEN_PATH);

    oAuth2Client.setCredentials(JSON.parse(token));

    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this url:");
  console.log(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {

    rl.question("Enter the code here: ", (code) => {

      rl.close();

      oAuth2Client.getToken(code, (err, token) => {

        if (err) {
          console.error(err);
          return;
        }

        oAuth2Client.setCredentials(token);

        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));

        resolve(oAuth2Client);
      });
    });
  });
}

export default authorize;