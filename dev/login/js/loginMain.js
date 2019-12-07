require.config({
	baseUrl:"model",
	paths:{
		jq:"../libs/jquery"
	}
})

require(["jq","login"],(_,Userlogin)=>{

	
	new Userlogin();
	



})