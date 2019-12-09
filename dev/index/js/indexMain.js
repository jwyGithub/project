require.config({
	baseUrl:"model",
	paths:{
		jq:"../libs/jquery"
	}
})

require(["jq","index","banner"],(_,index,banner)=>{

	
	new index();
	new banner();
	



})