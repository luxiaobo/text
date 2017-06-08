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
	var Oboxs=getByClass(oparent,box);//ͼƬ����Ľ����
	var oboxw=Oboxs[0].offsetWidth;//ÿһ�еĿ��
	var cols=Math.floor(document.documentElement.clientWidth/oboxw);//����
	oparent.style.cssText="width:"+cols*oboxw+"px;margin:0 auto";
	var Harr=[];//���ÿһ�еĸ߶�
	for(var i=0;i<Oboxs.length;i++){
		if(i<cols){
			Harr.push(Oboxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null, Harr);//������С�ĸ߶�
			var index=getminHindex(Harr,minH);//�����С�߶ȵ�����
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
//�ж��Ƿ���й������ص�����
function checkscrollslide(){
	var oparent=document.getElementById("main");
	var oBoxs=getByClass(oparent,"box");
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//���һ��box���붥��+1/2������߶�
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//�������Ĺ�������
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return scrollTop+height>lastBoxH?true:false;
	
}