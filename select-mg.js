// wybór sezonu miasto gliwice

function showDivMG(select){
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
    if(select.value==2){
    document.getElementById('mgall').style.display = "block";
    } else{
    document.getElementById('mgall').style.display = "none";
    }

 } 