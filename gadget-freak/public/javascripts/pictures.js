/* global $ */

$(document).ready(function(){
    var curPic = 2;
    $("#addPicture").click(function(){
        $("#subPictures").append('<input class="form-control" id="subPic" name="subPic" type="text" placeholder="Pic: '+ curPic +'"/>');
        curPic++;
    });
    
});