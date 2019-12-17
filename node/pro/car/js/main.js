require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "car"], (_, car) => {

	new car();
});