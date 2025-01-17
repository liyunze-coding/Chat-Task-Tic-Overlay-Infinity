class TwitchAuth {
	constructor(clientId, scopes) {
		this.clientId = clientId;
		this.scopes = scopes;
		this.access_token = null;
		this.refresh_token = null;
	}

	async startAuthFlow() {
		// Step 1: Request Device Code
		const codeData = await this.requestDeviceCode(this.clientId);
		this.displayUserCode(codeData.verificationUri);
		return codeData;
	}

	async continueAuthFlow(codeData) {
		// After obtaining Device Code
		// Step 2: Poll for Token
		const tokenData = await this.pollForToken(
			codeData.deviceCode,
			this.clientId
		);

		if (!tokenData) {
			location.reload();
		}

		const tokenToSave = {
			client_id: this.clientId,
			scopes: this.scopes,
			access_token: tokenData.access_token,
			refresh_token: tokenData.refresh_token,
		};

		await this.saveToken(tokenToSave);
	}

	async requestDeviceCode(clientId) {
		const now = Date.now();
		const url = "https://id.twitch.tv/oauth2/device";
		const body = new URLSearchParams({
			client_id: clientId,
			scopes: this.scopes,
		});
		const res = await fetch(url, { method: "POST", body });
		const json = await res.json();
		if ("message" in json) {
			throw new Error(`[${res.status}] ${json.message}`);
		}

		return {
			deviceCode: json.device_code,
			userCode: json.user_code,
			verificationUri: json.verification_uri,
			expiresIn: json.expires_in * 1000,
			createdAt: now,
			interval: json.interval * 1000,
		};
	}

	displayUserCode(verificationUri) {
		const container = document.getElementById("auth-container");
		container.innerHTML = `
            <p>Copy Link to browser:<br> <a href="${verificationUri}" target="_blank">${verificationUri}</a></p>
        `;
	}

	async pollForToken(deviceCode, clientId) {
		const endpoint = "https://id.twitch.tv/oauth2/token";
		const body = new FormData();
		body.append("client_id", clientId);
		body.append(
			"grant_type",
			"urn:ietf:params:oauth:grant-type:device_code"
		);
		body.append("device_code", deviceCode);

		const response = await fetch(endpoint, {
			method: "POST",
			body,
		});
		const data = await response.json();

		if (data.access_token) {
			return data;
		} else {
			console.error("Error:", data);
		}
	}

	async saveToken(tokenData) {
		localStorage.setItem("twitch_token", JSON.stringify(tokenData));
	}

	getToken() {
		return JSON.parse(localStorage.getItem("twitch_token")) || null;
	}

	setupAuthModal() {
		// modal overlay
		const modalOverlay = document.createElement("div");
		modalOverlay.id = "modal-overlay";
		modalOverlay.style.fontFamily = "Arial, sans-serif";
		modalOverlay.style.position = "fixed";
		modalOverlay.style.top = "0";
		modalOverlay.style.left = "0";
		modalOverlay.style.width = "100%";
		modalOverlay.style.height = "100%";
		modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		modalOverlay.style.display = "flex";
		modalOverlay.style.justifyContent = "center";
		modalOverlay.style.alignItems = "center";
		modalOverlay.style.zIndex = "1000";

		modalOverlay.innerHTML = `
            <div id="modal-container" style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 300px; text-align: center;line-height: 1.4rem">
                <h2>Authorization Required</h2>
                <div style="margin-bottom: 10px; font-weight: bold;"><b style="font-size:1.2rem">Step 1:</b></div>
                <div id="auth-container" style="margin-bottom: 10px;">Copy Link to browser: </div>
                <div style="margin-bottom: 10px;"><b style="font-size:1.2rem">Step 2:</b><br/>
                Click below AFTER authorizing</div>
                <button id="authorized" style="margin-top: 10px; padding: 10px 20px; border: none; border-radius: 4px; background-color: #007BFF; color: #fff; cursor: pointer;">Click here after authorizing</button>
            </div>
        `;

		// Append modal overlay to body
		document.body.appendChild(modalOverlay);

		// Add event listener to the authorization button
		document.getElementById("authorized").addEventListener("click", () => {
			document.body.removeChild(modalOverlay);
		});
	}

	displayNoClientId() {
		// modal overlay
		const modalOverlay = document.createElement("div");
		modalOverlay.id = "modal-overlay";
		modalOverlay.style.position = "fixed";
		modalOverlay.style.top = "0";
		modalOverlay.style.left = "0";
		modalOverlay.style.width = "100%";
		modalOverlay.style.height = "100%";
		modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		modalOverlay.style.display = "flex";
		modalOverlay.style.justifyContent = "center";
		modalOverlay.style.alignItems = "center";
		modalOverlay.style.zIndex = "1000";
		modalOverlay.style.fontFamily = "Arial, sans-serif";

		modalOverlay.innerHTML = `
            <div id="modal-container" style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 300px; text-align: center;">
                <h2>Missing Client ID</h2>
                <div style="margin-bottom: 10px;">
                    <b style="font-size:1.2rem">Step 1:</b><br/> 
                    Go to <a href="https://dev.twitch.tv/console">Twitch Dev Console</a> and Register Your Application</div>
                <div style="margin-bottom: 10px; line-height: 1.4rem">
                    <b style="font-size:1.2rem">Step 2:</b><br/>
                    Enter information for the app. <br/><br/>
                    <b>Redirect URL</b>: <code style="font-size: 1rem">http://localhost</code> <br />
                    <b>Category</b>: <code style="font-size: 1rem">Chat Bot</code> <br />
                    <b>Client Type</b>: <code style="font-size: 1rem">Public</code>
                </div>
                <div style="margin-bottom: 10px; line-height: 1.4rem">
                    <b style="font-size:1.2rem">Step 3:</b><br/>
                    Obtain <b>Client ID</b> from the registered application
                </div>
                <div style="margin-bottom: 10px; line-height: 1.4rem">
                    <b style="font-size:1.2rem">Step 4:</b><br/>
                    Enter <b>Client ID</b> in index.js file
                </div>
                <button id="refresh-button" style="margin-top: 10px; padding: 10px 20px; border: none; border-radius: 4px; background-color: #007BFF; color: #fff; cursor: pointer;">Click to Refresh</button>
            </div>
        `;

		// Append modal overlay to body
		document.body.appendChild(modalOverlay);

		// Add event listener to the refresh button
		document
			.getElementById("refresh-button")
			.addEventListener("click", () => {
				location.reload();
			});
	}

	async refreshToken(data) {
		const now = Date.now();
		const url = "https://id.twitch.tv/oauth2/token";
		const body = new URLSearchParams({
			client_id: data.client_id,
			grant_type: "refresh_token",
			refresh_token: data.refresh_token,
		});

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body,
		});

		const json = await res.json();

		if (!res.ok) {
			throw new Error(
				`[${res.status}] ${json.message || "Failed to refresh token"}`
			);
		}

		return {
			...json,
			createdAt: now,
		};
	}

	async init() {
		return new Promise(async (resolve, reject) => {
			let token = await this.getToken();

			if (
				token &&
				this.clientId &&
				token.client_id == this.clientId &&
				token.scopes == this.scopes
			) {
				try {
					let token_refresh = await this.refreshToken(token);

					const tokenToSave = {
						client_id: this.clientId,
						scopes: this.scopes,
						access_token: token_refresh.access_token,
						refresh_token: token_refresh.refresh_token,
					};

					this.access_token = token_refresh.access_token;
					this.refresh_token = token_refresh.refresh_token;

					await this.saveToken(tokenToSave);
					resolve(tokenToSave);
				} catch (error) {
					console.error("Error refreshing token:", error);
					reject(error);
				}
			} else if (this.clientId == null || this.clientId == "") {
				this.displayNoClientId();
				reject(new Error("Client ID is missing"));
			} else {
				this.setupAuthModal();
				var codeData = await this.startAuthFlow();

				document
					.getElementById("authorized")
					.addEventListener("click", async (e) => {
						try {
							await this.continueAuthFlow(codeData);
							location.reload();
							resolve();
						} catch (error) {
							reject(error);
						}
					});
			}
		});
	}
}

export default TwitchAuth;
