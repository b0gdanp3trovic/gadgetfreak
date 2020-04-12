
var restRequestDelete = function(){
    $.ajax({
        method: "DELETE",
        url: "/api/gadgets"
    })
}

var restRequestCreate = function(){
    $.ajax({
        method : "POST",
        url: "/api/gadgets/startingData"
    })
}