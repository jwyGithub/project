"use strict";

require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "login"], function (_, Userlogin) {

	new Userlogin();
});