USER LOGIN APP

This practical is based on user registration and JWT based authentication system.

Concept
 User will get auth_token and refresh_token after successfully login. Auth token has 1 min of validity and refresh_token has 2 days of validity. When auth_token has been expired we have to pass refresh_token to get new auth token by calling refreshToken api. User can logout by calling logout api. After doing logout user do not have authority to use any APIs without doing login again.

Technology Used
 - Node.js
 - MongoDB

List of APIs

 1. Register new user.
    API    = https://user-auth-system1.herokuapp.com/api/v1/register
    Method = POST

 2. Login 
    API    = https://user-auth-system1.herokuapp.com/api/v1/login
    Method = POST 

 3. Search user
    API    = https://user-auth-system1.herokuapp.com/api/v1/search
    Method = POST

 4. To get new auth_token with the help of refresh_token
    API    = https://user-auth-system1.herokuapp.com/api/v1/refreshToken
    Method = POST

 5. Logout
    API    = https://user-auth-system1.herokuapp.com/api/v1/logout
    Method = GET


