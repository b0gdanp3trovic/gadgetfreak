var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');
var ctrlDPost = require('../controllers/devicePost');
var ctrlForum = require('../controllers/forum');
//var ctrlFPost = require('../controllers/forumPost');
var ctrlReg = require('../controllers/register');
var ctrlLogin = require('../controllers/login');
var ctrlComment = require('../controllers/comment');
var ctrlGadgets = require('../controllers/gadgets.js');
var ctrlPic = require('../controllers/pictures.js');
var ctrlAuthentication = require('../controllers/authentication');
var ctrlReplies = require('../controllers/replies.js');

var jwt = require('express-jwt');
var authentication = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload'
});

/* Lokacijske strani */
router.get('/gadgets', ctrlGadgets.gadgetList);
router.get('/gadgets/:gadgetId', ctrlGadgets.getGadgetById);
router.post('/gadgets', ctrlGadgets.createGadget);
router.post('/gadgets/startingData', ctrlGadgets.addStartingData);
router.put('/gadgets/:gadgetId', ctrlGadgets.updateGadget);
router.delete('/gadgets', ctrlGadgets.deleteAll);
router.delete('/gadgets/:gadgetId', ctrlGadgets.deleteGadget);

/* Lokacijske strani */
router.get('/', ctrlIndex.index);

router.get('/devicePost/', ctrlDPost.postGetAll);
router.get('/devicePost/:idPost', ctrlDPost.postGet);
router.post('/devicePost/', ctrlDPost.postPost);
router.put('/devicePost/:idPost', ctrlDPost.postPut);
router.delete('/devicePost/:idPost', ctrlDPost.postDelete);

//router.get('/login', ctrlLogin.loginGet);
//router.post('/login', ctrlLogin.loginPost);

//router.get('/register', ctrlReg.usersGetAll);
//router.get('/register/:idUser', ctrlReg.usersGet);
//router.post('/register', ctrlReg.userPost);
//router.put('/register/:idUser', ctrlReg.userPut);
//router.delete('/register/:idUser', ctrlReg.userDelete);

router.get('/devicePost/:idPost/comment',ctrlComment.commentGet);
router.post('/devicePost/:idPost/comment', authentication, ctrlComment.commentCreate);
router.put('/devicePost/:idPost/comment/:idComment',ctrlComment.commentPut);
router.delete('/devicePost/:idPost/comment/:idComment',ctrlComment.commentDelete);

router.get('/forum', ctrlForum.forumGetAll);
router.post('/forum', ctrlForum.forumPost);
router.get('/forum/:idPost', ctrlForum.forumGetPost);
router.put('/forum/:idPost', ctrlForum.forumPostPut);
router.delete('/forum/:idPost', ctrlForum.forumPostDelete);
router.put('/forum/:idPost/edit', ctrlForum.editForumPost);

router.get('/add-gadget', ctrlIndex.addGadgetGet);
router.post('/add-gadget', ctrlIndex.addGadgetPost);

router.post('/forum/:idPost', ctrlReplies.replyPost);

router.post('/devicePost/:idPost/pictures', ctrlPic.pictureCreate);

router.get('/sideDevices', ctrlIndex.sideIndex);

router.delete('/forum/:idPost/:idReply', ctrlReplies.deleteRep);

/* Avtentikacija */
router.post('/registration', ctrlAuthentication.registration);
router.post('/login', ctrlAuthentication.login);

//router.get('/forum/:idPost', ctrlForum.addViewer);
module.exports = router;
