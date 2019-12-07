"use strict";

require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "index"], function (_, index) {

	new index();
});