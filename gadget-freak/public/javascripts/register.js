/* global $ */
function mySubmitFunction(){
    
    if(!$('input#name').val() || !$('input#last').val() || 
    !$('input#email').val() || !($('input#gender1').val()!="" || $('input#gender2').val()!="") ||
     !$('input#city').val()  || !$('input#uname').val() ||
     !$('input#pword').val() || !$('input#cpword').val()){
        $('.alert#emptyField.alert-danger').show();
        return false;  
     }
    if(!/\d/.test($('input#pword').val()) || !/[A-Z]/.test($('input#pword').val()) || !/[a-z]/.test($('input#pword').val()) || !$('input#pword').val().length > 5){
        $('.alert#emptyField.alert-danger').hide();
        $('.alert#Pw.alert-danger').show();
        return false;   
    }
    if($('input#pword').val() != $('input#cpword').val()){
        $('.alert#emptyField.alert-danger').hide();
        $('.alert#Pw.alert-danger').hide();
        $('.alert#cPw.alert-danger').show();
        return false;   
    }
    
  return true;
}

function mySubmitFunctionLogin(){
    if(!$('input#uname').val() || !$('input#pword').val()){
        $('.alert#emptyField.alert-danger').show();
        return false;  
     }
  return true;
}

function mySubmitFunctionPost(){
    if(!$('input#phone').val() || !$('input#picture').val()){
        $('.alert#emptyField.alert-danger').show();
        return false;  
     }
  return true;
}

function mySubmitFunctionComment(){
  return true;
}