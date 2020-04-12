
# GadgetFreak
GadgetFreak is a platform that allows users to find information about the latest
tech products and their prefomances. Users are able to leave their feedback, create
new forum posts, descuss problems, give solutions or share their opinion.

Heroku working version of [GadgetFreak](https://gadget-freak.herokuapp.com/)

On our website you can find the following:

- Registration
- Searching for a device.
- Information about the device
- Leave feedback
- Adding a device as well as it's information
- Communicating on our forum with other customers

## Initialization

In order to get this application localy you need to clone it form our bitbucket [repository](https://bitbucket.org/bp3201/gadget-freak/overview)

> git clone https://bitbucket.org/bp3201/gadget-freak.git

You will need node installed and run the command

> npm install

You will need a running mongo database called **gadget-freak**.
You have 2 choices:

- Istall a local mongo database
- Connect to a remote mongo database 

If you decide to connect to a local mongo database, start the application with the following command:

> npm start

If you decide to connect to a remote mongo database, start the application with the following command:

> NODE_ENV=production MLAB_URI=mongodb://user:pass@ds163103.mlab.com:63103/gadget-freak npm start

Where MLAB_URI is the link to your remote repository

If you want to host you application for example on heroku you need to initialize 2 variables

NODE_ENV has to be production in order to use a remote db

> heroku config:set NODE_ENV=production

MLAB_URI represents the link to you remote db

> heroku config:set MLAB_URI=mongodb://user:pass@ds163103.mlab.com:63103/gadget-freak

## Getting to know the application

Our aplication is a [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) type of application

The application is in [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) architecture 

For the view files we use pug (jade).


Our application consists of 3 major parts:

- The devices and their respective pages
- Forum 
- Login/Registration

### Devices

In our application users can create pages for some device and input basic information as well as pictures about that device.

Our application allows users to then modify the info and the pictures of post or delete it.

Users can comment on every device. The comment consists of comment text as well as device rating. 

We also allow comment modification, the user can chage their comment txt as well as the rating of the device and if they commented on the wrong device they can simply delete it.

Users can share the page of the device through the twitter api that every device page has under the device title.

### Forum

Our application includes a forum, where users could post some of the opinions about the devices. 

A user cannot post if he/she does not have an account and is not currently logged in.

User can reply (comment) on each other's posts, this aswell requires an active account.

Posts and replies can be deleted, but only the user that posted/replied is authorized to perform this action.

Forum includes view and reply count too. 


### Login/Registration

The registration has a basic form in which you need to fill in all the fields.

There are several checks that happen before you register and all ov ther are on 3 layers ( client side, server side and database): 

- All fields must be filled 
- Email form (wheather it contains @)
- Password must contain 1 upper case letter, 1 lower case letter, 1 number and must be at least 6 characters
- Bots password and password conformation must be equal

After you are registered you will be redirected to our homepage and will be logged in with your new account

The login page requires username and password.

On the login page same as the registration page there are several checks that happen on all 3 layers:

- All fields must be filled
- The user must exist in out database

After logging in you will be redirected to our homepage

They can log out if the want and their session will end

## Internal introduction

### Devices

Our application works on pc, phone (iphone 6), and tablet (iPad)

There are multiple input fields 

For device there are 2 main ones that are required:

- The device name
- And the device picture (in URL form)

The device information which is not required and can be later inserted or modified.

On the device post we can add comments where we can select the rating (stars required) and comment text which is not required.
Both can be later modified.

### Forum

Forum includes the main/home page which is basically a list of all posts on the forum. Each post displays a user, a "Read more..." option which 
directs you to the page of the post, view count, reply count, and a "DELETE" button on the certain user's owned posts. 

There is a post making page, which has the "about" option, and the content of the post itself. Non-members cannot create new posts, of course.

Every post has it's own page, which is being accessed via REST requests. Each post has its' content on the top, following with the replies, and a comment option at the bottom, if you are
a member and currently logged in with a valid account.

### Login/Registration

Login 2 fields. The first one is username and the second one passowrd (in protected form dots). Both must be filled in otherwise the request will be denied.

Registration contains multiple fields. First and Last name are regular text fields and email is an email field that requires @ symbol. Then 
you can chose between male and female. City is a text field and Country is a dropdown select. Username is a text field. Password and Confirm Password
are both protected fields with dots and they need to be equal.

All fields must be filled in and all the rules apply as mentioned before.

### General

We use pug for all pages which consist of 1 layout.

Our device page uses a mixin for the comment stars.

As for the style we mainly use bootstrap with minor personal changes.

## Database and Rest

Database as mentioned in the initialization can be local or remote.

We have implemented REST API as well as models for device post, comments and pictures which are part of the device post, user which contains all the users data,
forum as well as forum post with the main topic and replies.

On all models can be applied GET, POST, PUT, DELETE which are connected to the database.

## Authorization level

### Guest

Guest cam only watch, he cannot post comment or post in the forum.

### User

Registered users can comment on posts, post a topic in the forum as well as comment, they can also edit their own post.

### Admin

Admin users can do all of the above plus delete comments on posts and make a device post and edit and delete all the posts in the forum.

## Page load analysis

### Chrome

Homepage  ~740s

Gadget post ~960 ms

Add item ~450ms

Login ~550ms

Register ~650ms

Forum ~680ms

### Mozila

Homepage ~780ms

Gadget post ~1.08ms

Login ~600ms

Register ~620ms

Forum ~640ms

The slowest page to load is Gadget Post because it has to load the most information plus it has to load external pictures for the featured device.

---
###### Project by: Aleksandar Cuculoski and Bogdan Petrović

