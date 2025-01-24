// Usage
import TwitchAuth from "./handleDCF.js";
import credentials from "../auth.js";

const twitchAuth = new TwitchAuth(credentials.clientId, credentials.scopes);
twitchAuth.init().then(() => {
	ComfyJS.Init(
		credentials.sender ?? credentials.channel,
		`oauth:${twitchAuth.access_token}`,
		credentials.channel
	);
});
