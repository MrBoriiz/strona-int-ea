// wybór sezonu egzorcysty

function showDivRDR(select){
    if(select.value==1){
     document.getElementById('rdrs2').style.display = "block";
    } else{
     document.getElementById('rdrs2').style.display = "none";
    }
    if(select.value==2){
        document.getElementById('rdrall').style.display = "block";
        } else{
        document.getElementById('rdrall').style.display = "none";
        }
 } 