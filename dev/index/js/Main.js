require.config({
	baseUrl:"model",
	paths:{
		jq:"../libs/jquery"
	}
})

require(["jq","index","banner"],(_,index,banner)=>{

	new index();
	new banner({
		banner:$(".banner").find(".imgbox").find("img")
	});

	// 1f
	new banner({
		banner: $(".one").find(".imgbox").find("img"),
		delaytime:4000,
		movetime:1000
	});
	// 2f
	new banner({
		banner: $(".two").find(".imgbox").find("img"),
		delaytime:4400,
		movetime:1000
	});
	// 3f
	new banner({
		banner: $(".three").find(".imgbox").find("img"),
		delaytime:4800,
		movetime:1000
	});
	// 4f
	new banner({
		banner: $(".four").find(".imgbox").find("img"),
		delaytime:5200,
		movetime:1200
		
	});



})