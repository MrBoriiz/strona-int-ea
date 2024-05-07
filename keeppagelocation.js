function keepLocation(oldOffset) {
    if (window.pageYOffset!= null){
      st=oldOffset;
    }
    if (document.body.scrollWidth!= null){
      st=oldOffset;
    }
    setTimeout('window.scrollTo(0,st)',10);
  }