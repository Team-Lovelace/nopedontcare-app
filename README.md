##Routes

POST - /register
GET/PUT/DEL - /user/:username
POST/GET/ - /user/:username/nopes
GET/PUT/DEL - /user/:username/nopes/:id
GET/POST - /user/:username/nopes/:id/comments
PUT/DEL - /user/:username/nopes/:post_id/comments/:id


##Schemas

1. Post Schema
  * pictures: string, req
  * publication Date: string, req
  * caption: string
  * comments: [comment schema]
  * haters: [user_ids]
2. User Schema
  * username: string, req
  * name: string, req
  * email: string, req
  * bio: string
  * profile pic: string, req
  * posts: [post schema]
3. Comment Schema
  * user: _id
  * body: string, req
  * publication Date: string, req
  * virtual attribute: username
