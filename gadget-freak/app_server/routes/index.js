var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');
var ctrlDPost = require('../controllers/devicePost');
var ctrlForum = require('../controllers/forum');
var ctrlFPost = require('../controllers/forumPost');
var ctrlUsers = require('../controllers/users');
var ctrlOther = require('../controllers/other');


router.get('/', ctrlOther.angularApp);
//router.get('/devicePost/:idDevice', ctrlDPost.devicePost);
//router.get('/login', ctrlUsers.loginGet);
//router.post('/login', ctrlUsers.loginPost);
//router.post('/logout', ctrlUsers.logOut);
//router.get('/register', ctrlUsers.registerGet);
//router.post('/register', ctrlUsers.registerPost);
//router.get('/devicePost/:idDevice/comment', ctrlIndex.comment);
//router.post('/devicePost/:idDevice/comment', ctrlDPost.commentPut);
//router.get('/forum/add-post', ctrlIndex.addforumpost)
//router.get('/forum', ctrlForum.forumPage);

//router.post('/forum/add-post', ctrlForum.forumPost);
//router.get('/add-gadget', ctrlIndex.addgadget);
//router.post('/add-gadget', ctrlDPost.addgadgetPost);
router.get('/db', ctrlIndex.db);
//router.get('/devicePost/:idDevice/pictures', ctrlDPost.addPicGet);
//outer.post('/devicePost/:idDevice/pictures', ctrlDPost.addPicPost);

//router.delete('/devicePost/:idDevice', ctrlDPost.devicePostDelete);
//router.delete('/devicePost/:idDevice/comment/:idComment', ctrlDPost.devicePostDeleteComment);

//router.get('/add-gadget/:idDevice', ctrlIndex.addgadget);
//router.post('/add-gadget/:idDevice', ctrlDPost.addgadgetEditPut);

//router.get('/devicePost/:idDevice/comment/:idComment', ctrlIndex.comment);
///router.post('/devicePost/:idDevice/comment/:idComment', ctrlDPost.commentUpdate);



//router.get('/forum/post/:postId', ctrlFPost.forumPage);
//router.post('/forum/post/:postId', ctrlFPost.replyPost);
//router.delete('/forum/:postId', ctrlForum.deletePost);

//router.get('/add-post', ctrlFPost.showAddPage);
//router.delete('/forum/:postId/:replyId', ctrlFPost.replyDelete);

//router.get('/', ctrlOstalo.angularApp);
//router.get('/forum', ctrlForum.forumPage);
module.exports = router;
