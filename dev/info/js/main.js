require.config({
	baseUrl:"model",
	paths:{
		jq:"../libs/jquery"
	}
})

require(["jq","info"],(_,info)=>{

	
	new info.detail();
	setTimeout(() =>{
		new info.banner();
	},1000)
	
	


})