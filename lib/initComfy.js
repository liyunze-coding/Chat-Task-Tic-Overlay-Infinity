// Usage
import TwitchAuth from "./handleDCF.js";
import credentials from "../auth.js";

const twitchAuth = new TwitchAuth(credentials.clientId, credentials.scopes);
twitchAuth.init().then((data) => {
	ComfyJS.Init(
		credentials.sender,
		`oauth:${twitchAuth.access_token}`,
		credentials.channel
	);
});
