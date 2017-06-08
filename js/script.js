window.onload=function(){
	waterfall("main","box");
	window.onscroll=function(){
		if(checkscrollslide()){
			var dateInt={"date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"37.jpg"},{"src":"38.jpg"}]};
			var oparent=document.getElementById("main");
			for(var i=0;i<dateInt.date.length;i++){
			var obox=document.createElement("div");
			obox.className="box";
			oparent.appendChild(obox);
			var opic=document.createElement("div");
			opic.className="pic";
			obox.appendChild(opic);
			var oimg=document.createElement("img");
			oimg.src="img/"+dateInt.date[i].src;
			opic.appendChild(oimg);
			waterfall("main","box");
			}
		};
	}
}
function waterfall(parent,box){
	var oparent=document.getElementById(parent);
	var Oboxs=getByClass(oparent,box);//图片对象的结果集
	var oboxw=Oboxs[0].offsetWidth;//每一列的宽度
	var cols=Math.floor(document.documentElement.clientWidth/oboxw);//列数
	oparent.style.cssText="width:"+cols*oboxw+"px;margin:0 auto";
	var Harr=[];//存放每一列的高度
	for(var i=0;i<Oboxs.length;i++){
		if(i<cols){
			Harr.push(Oboxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null, Harr);//行中最小的高度
			var index=getminHindex(Harr,minH);//求出最小高度的索引
			Oboxs[i].style.cssText="position:absolute;top:"+minH+"px;left:"+oboxw*index+"px";
			Harr[index]+=Oboxs[i].offsetHeight;
		}
	}
}
function getByClass(parent,clsName){
	var boxArr=new Array();
	var oElement=parent.getElementsByTagName("*");
	for(var i=0;i<oElement.length;i++){
		if(oElement[i].className==clsName){
			boxArr.push(oElement[i]);
		}
	}
	return boxArr;
}
function getminHindex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//判断是否具有滚动加载的条件
function checkscrollslide(){
	var oparent=document.getElementById("main");
	var oBoxs=getByClass(oparent,"box");
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//最后一个box距离顶部+1/2的自身高度
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//滚动条的滚动距离
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return scrollTop+height>lastBoxH?true:false;
	
}