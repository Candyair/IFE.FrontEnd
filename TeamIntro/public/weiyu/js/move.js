window.onload=function(){
   var  oMainLeft=document.getElementById("main_left");
   var  aLeanInfo=getByClass(oMainLeft,"main-left-info");
   moveFromTop(aLeanInfo[0],-200,0);
   moveFromTop(aLeanInfo[1],-400,10);
   moveFromTop(aLeanInfo[2],-600,10);
};
   
    function getByClass(oParent,sClass){
         var aEle=oParent.getElementsByTagName("*");
         var arr=[];
         for(var i=0;i<aEle.length;i++){
            if(aEle[i].className.split(' ')[0]==sClass){
                  arr.push(aEle[i]);
            }//if
         }//for
         return arr;
    }//getByClass


    function moveFromTop(obj,from,to){
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){      	
             var iSpeed=(to-from)/10;
             iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);          
             if(from>=to&&iSpeed>0){
             	clearInterval(obj.timer);
             }else{
             	from+=iSpeed;
             	obj.style.top=from+'px';
             }
        },50);
    }