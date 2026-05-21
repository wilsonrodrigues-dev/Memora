import { google } from "googleapis";
import { config } from "./config.js";


const oAuth2Client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  config.redirect_uris
);

oAuth2Client.setCredentials({
  access_token: config.access_token,
  refresh_token: config.refresh_token,
  scope: config.scope,
  token_type: config.token_type,
  expiry_date: config.expiry_date,
});

export default oAuth2Client;