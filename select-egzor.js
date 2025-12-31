// wybór sezonu egzorcysty

function showDivEGZ(select){
    if(select.value==0){
     document.getElementById('egzs4').style.display = "block";
    } else{
     document.getElementById('egzs4').style.display = "none";
    }
    if(select.value==1){
        document.getElementById('egzs5').style.display = "block";
       } else{
        document.getElementById('egzs5').style.display = "none";
       }
    if(select.value==2){
        document.getElementById('egzs6').style.display = "block";
       } else{
        document.getElementById('egzs6').style.display = "none";
       }
    if(select.value==3){
        document.getElementById('egzall').style.display = "block";
        } else{
        document.getElementById('egzall').style.display = "none";
        }
 } 