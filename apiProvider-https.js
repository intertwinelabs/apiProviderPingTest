// API Provider Ping Test using https Server
// Copyright (c) 2020 IntertwineLabs
// Written by Richard Lee
// Email: intertwinelabs@outlook.com

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const https = require("https");
const fs = require("fs");

var https_options = {
	key: fs.readFileSync(process.env.CAKeyFile),
	cert: fs.readFileSync(process.env.CACrtFile),

// --- uncomment the following 3 lines to enable 2-way SSL ---
//	requestCert: true,
//	rejectUnauthorized: false,
//	ca: fs.readFileSync(process.env.CABundleFile)
};

var app = express();
var PORT = process.env.PORT || 8443;

var httpsServer = https.createServer(https_options, app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- (/rest/api/ping) API Handling for PING TEST ----
app.get("/rest/api/ping", (req,res) => {
	const ping_resp_msg = {
		message: "API Provider - Ping Test (GET Method)",
		version: "1.0.0",
		zone: "Internet"
	};

	// log to console
	console.log(new Date().toString().slice(0,24) + ";" + req.method + ";" + req.connection.remoteAddress + ";" + req.url);

	res.setHeader("Content-Type", "application/json");
	return res.send(JSON.stringify(ping_resp_msg));
});

app.post("/rest/api/ping", (req,res) => {
	var ping_resp_msg = {
		message: "",
		version: "1.0.0",
		zone: "Internet"
	};

	var pingMsg = req.body.pingMsg;
	ping_resp_msg["message"] = "API Provider - Ping Test (POST Method) => " + pingMsg;

	// log to console
	console.log(new Date().toString().slice(0,24) + ";" + req.method + ";" + req.connection.remoteAddress + ";" + req.url);

	res.setHeader("Content-Type", "application/json");
	return res.send(JSON.stringify(ping_resp_msg));
});
// ----

httpsServer.listen(PORT, () => {
  console.log("\n" +
    "=== API Provider Ping Test (Version 1.0.0) ===\n" +
		"Written by Richard Lee\n" +
    	"Email: intertwinelabs@outlook.com\n\n" +
		"## Supports GET and POST method.\n\n" +
		"   e.g. GET Method  => https://<domain>:<port>/rest/api/ping\n" +
		"        - use Curl to post message for testing\n" +
		"        $ curl -X GET https://<domain>:<port>/rest/api/ping\n\n" +
		"   e.g. POST Method => https://<domain>:<port>/rest/api/ping\n" +
		"        - use Curl to post message for testing\n" +
		"        $ curl -X POST -H \"Content-Type: application/json\"\n" +
		"               -cacert <CACert.ca-bundle>\n" +
		"               -d \'{\"pingMsg\":\"Hello World\"}\'\n" +
		"               https://<domain>:<port>/rest/api/ping\n\n" +
		"API Provider Ping Test listening on PORT: " + PORT + "\n\n");
});
