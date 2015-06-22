#####Routes

POST - /users
GET/PUT/DEL - /users/:id
POST/GET/ - /users/:user_id/posts
GET/PUT/DEL - /users/:user_id/posts/:id
GET/POST - /users/:user_id/posts/:id/comments
PUT/DEL - /users/:user_id/posts/:post_id/comments/:id


#####Schemas

Post Schema
  pictures: string, req
  publication Date: string, req
  caption: string
  comments: [comment schema]
  haters: [user_ids]

User Schema
  username: string, req
  name: string, req
  email: string, req
  bio: string
  profile pic: string, req
  posts: [post schema]

Comment Schema
  user: _id
  body: string, req
  publication Date: string, req
  virtual attribute: username
