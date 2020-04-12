var restRequestDelete = function(postId, replyId){
    $.ajax({
        method : "DELETE",
        url: "/forum/" + postId + "/" + replyId
    })
}