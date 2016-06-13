$(function(){
	var num=0;
	$(document).on('contextmenu',false);
	var xy2id=function(x,y){
		return x+'-'+y;
	}

	var jisuan=function(x,y){
       var num=0;
       if($('#'+xy2id(x,y-1)).is('.lei')){num++};
       if($('#'+xy2id(x,y+1)).is('.lei')){num++};
       if($('#'+xy2id(x-1,y-1)).is('.lei')){num++};
       if($('#'+xy2id(x-1,y)).is('.lei')){num++};
       if($('#'+xy2id(x-1,y+1)).is('.lei')){num++};
       if($('#'+xy2id(x+1,y-1)).is('.lei')){num++};
       if($('#'+xy2id(x+1,y)).is('.lei')){num++};
       if($('#'+xy2id(x+1,y+1)).is('.lei')){num++};
       return num
	}
	var zuojian=function(e){
		if($(this).is('.biaoji')){
			return;
		}
        if(e.data.lei){
        	clearInterval(timeId);
        	$('.yin').fadeIn(500).text('你惊醒了神龙，接受惩罚吧');
        	
        }
        else{
        	$(this).text(jisuan(e.data.x,e.data.y)).addClass('tip');
        }
	}
	var youjian=function(e){
		if($(this).is('.tip')){
			return
		}
        $(this).toggleClass('biaoji');
        if($('.biaoji').length===$('.lei').length){
        	if($('.biaoji.lei').length===$('.lei').length){        		
        		clearInterval(timeId);
        		var time=$('#ji').text();
        		console.log(time)
        		$('.yin').fadeIn(500).text('您已找出所有神龙用时'+time+'秒');	
        	}
        }
	}
	var clickHandler=function(e){
		if(e.which===1){
			zuojian.call(this,e);
		}else if(e.which===3){
			youjian.call(this,e);
		}
	}
	var shuaxin=function(){
		$('.sence').empty();		
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				var islei=Math.random()>0.9;
				$('<div>')
				.addClass(function(){
					return 'block '+(islei?'lei':'');
				})
				.attr('id',i+'-'+j)	   
				.on('mousedown',{x:i,y:j,lei:islei},clickHandler)
				.appendTo('.sence')	;
			}
		}
		$('#u').text($('.lei').length);
	}
      shuaxin();  
    var timeId;  
     
	 $('.start').on('click',function(){
	 	$('.yin').fadeOut(500);
	 	num=0;
        timeId=setInterval(function(){
      		$('#ji').text(num);
      		num+=1
      	},1000)
	 });
	 $('.restart').on('click',function(){
	 	clearInterval(timeId);
	 	$('#ji').text(0);
	 	$('.yin').fadeOut(500);	 	
        $('.sence').empty();         
		shuaxin();
	 })
})