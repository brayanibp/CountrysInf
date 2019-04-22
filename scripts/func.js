function save_data(index,value){
	window.localStorage.setItem(index,value);
}
 
function remove_data(index){
	window.localStorage.removeItem(index);	
}
  
function getData(param) {
    var sess = localStorage.getItem(param);
	return sess;
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
