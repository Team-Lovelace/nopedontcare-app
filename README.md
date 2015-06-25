#ROUTES

POST - /register
GET/PUT/DEL - /user/:username
POST/GET/ - /user/:username/nopes
GET/PUT/DEL - /user/:username/nopes/:id
GET/POST - /user/:username/nopes/:id/comments
PUT/DEL - /user/:username/nopes/:post_id/comments/:id


#SCHEMAS

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


#WIREFRAMES
##Homescreen
![1_project_3_homescreen](https://cloud.githubusercontent.com/assets/8007927/8356550/113ec768-1b24-11e5-9e50-5af9466493dd.png)
##Edit User Profile
![2_project_3_edit_user_profile](https://cloud.githubusercontent.com/assets/8007927/8356553/1146e330-1b24-11e5-8bf5-2ea9b2a31709.png)
##User Profile with Posts
![3_project_3_user_profile](https://cloud.githubusercontent.com/assets/8007927/8356552/1145f538-1b24-11e5-8fd4-2bb3a583290d.png)
##User Feed
![4_project_3_user_feed](https://cloud.githubusercontent.com/assets/8007927/8356555/114abd98-1b24-11e5-800a-1fdf82e85cd3.png)
##Most Vexatious Posts and Most Flagged Content
![5_project_3_vexatious_posts](https://cloud.githubusercontent.com/assets/8007927/8356551/1145c112-1b24-11e5-9864-3d1bd8263735.png)
##White Noise Feed
![6_project_3_white_noise_feed](https://cloud.githubusercontent.com/assets/8007927/8356554/11480fa8-1b24-11e5-88b4-caf19907304e.png)
