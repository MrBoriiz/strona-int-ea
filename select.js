function showDiv(select){
    if(select.value==0){
     document.getElementById('mgs1').style.display = "block";
    } else{
     document.getElementById('mgs1').style.display = "none";
    }
    if(select.value==1){
        document.getElementById('mgdod').style.display = "block";
       } else{
        document.getElementById('mgdod').style.display = "none";
       }
 } 