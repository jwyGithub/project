require.config({
	baseUrl: "model",
	paths: {
		jq: "../libs/jquery"
	}
});

require(["jq", "reg"], (_, reg) => {

	new reg();
});