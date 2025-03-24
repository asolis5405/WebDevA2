# WebDevA2
WebDevA2 Piazza project\
* First install basic packages\
npm install express nodemon mongoose dotenv body-parser

* Install the joi package for validations\
 npm install joi

* Install the encryption/decryption library\
 npm install bcryptjs

* Install the JWT package for generating auth-tokens\
 npm install jsonwebtoken

The Piazza Network allows the user to complete the following tasks:
* Create a post (requires authentication -> user must be signed in)\
  POST: visit localhost:3000/api/posts
* Get all posts (publicly available)\
  GET: visit localhost:3000/api/posts
* Get a single post by ID (publicly available -> must have post ID)\
  GET: visit localhost:3000/api/posts/:id 
* Update a post (requires authentication -> only the post creator can update)\
  PATCH: visit localhost:3000/api/posts/:id
* Delete a post (requires authentication -> only the post creator can delete)\
  DELETE: visit localhost:3000/api/posts/:id


