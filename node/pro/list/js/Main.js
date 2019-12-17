require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "list"], (_, info) => {

	new info();
});