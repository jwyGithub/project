require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "listinfo"], (_, info) => {

	new info();
});