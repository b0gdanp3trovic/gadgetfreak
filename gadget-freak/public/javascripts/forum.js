var restRequestDelete = function(postId){
    $.ajax({
        method : "DELETE",
        url: "/forum/" + postId
    })
}


