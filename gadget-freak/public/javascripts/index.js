/* global $ */
function removeItem(elId){
    var path = window.location.pathname.split('/');
    console.log(path);
    $.ajax({
      url: path[2]+'/comment/'+elId,
      method: 'DELETE',
    })
}
$(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        });
});
$(document).ready(function(){
    $("#deletePost").click(function(){
        var path = window.location.pathname.split('/');
        $.ajax({
          url: path[2],
          method: 'DELETE',
        })
    });
    
});
