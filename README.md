<div align="center">
<img height="130px" width="130px" src="./src/assets/images/Logo.png">
</div>
  
# PLART, a 3D printing web application

Frontend : Angular
<br>
Backend : Spring Boot

<details>
  <summary>Pages Features</summary>

  ### Home

  - Images swiper with dynamic descriptions
  - Animated website stats with go to connect, user or objects pages when clicked

  ### Objects

  - Search object or filter objects by category
  - See objects with a rotating card animation
  - Download the 3D printable file of any object 

  ### Connect

  - Register with email confirmation
  - Login with form control and failure animation
  - Logout is available on any page once logged in

  ### User

  - Login needed to view this page
  - Modify or delete your account (delete needs confirmation)
  - See your objects and download them
  - Add an object with a file and optionnal image
  - Modify or delete your objects (delete needs confirmation)

  ### Messages

  - Login needed to view this page
  - Search user
  - See messages and messages number per user
  - Send, modify or delete a message

  ### Admin

  - Admin role needed to view this page
  - Search user, object or message
  - See all users, objects or messages
  - Delete user, object or message

</details>

<details>
  <summary>Run Locally</summary>

  ### Clone the project

  ```bash
    git clone https://github.com/Brice150/PLART.git
  ```

  ### Go to backend directory 
    --> Run application on Intellij

  ### Install dependencies

  ```bash
    npm install
  ```

  ### Start the server

  ```bash
    ng serve -o
  ```

</details>  

<details>
  <summary>API Reference</summary>

  <details>
  <summary>Connection</summary>

  ### Register

  ```http
    POST /registration
  ```

  ### Confirm email

  ```http
    GET /registration/confirm
  ```

  ### Login

  ```http
    GET /login
  ```

  ### Logout

  ```http
    GET /logout
  ```

  </details> 

  <details>
  <summary>Admin</summary>

  ### Get all users

  ```http
    GET /admin/user/all
  ```

  ### Delete user

  ```http
    DELETE /admin/user/${email}
  ```

  ### Get all messages

  ```http
    GET /admin/message/all
  ```

  ### Delete message

  ```http
    DELETE /admin/message/${messageId}
  ```

  ### Delete object

  ```http
    DELETE /admin/object/${messageId}
  ```

  </details> 

  <details>
  <summary>User</summary>

  ### Get all users

  ```http
    GET /user/all
  ```

  ### Get connected user

  ```http
    GET /user
  ```

  ### Get user by id

  ```http
    GET /user/${userId}
  ```

  ### Update user

  ```http
    PUT /user
  ```

  ### Delete user

  ```http
    DELETE /user/${email}
  ```

  </details> 

  <details>
  <summary>Message</summary>

  ### Get message by id

  ```http
    GET /message/${messageId}
  ```

  ### Add message

  ```http
    POST /message
  ```

  ### Update message

  ```http
    PUT /message
  ```

  ### Delete message

  ```http
    DELETE /message/${messageId}
  ```

  </details> 

  <details>
  <summary>Object</summary>

  ### Get all objects

  ```http
    GET /object/all
  ```

  ### Get object by id

  ```http
    GET /object/${objectId}
  ```

  ### Add object

  ```http
    POST /object
  ```

  ### Update object

  ```http
    PUT /object
  ```

  ### Delete object

  ```http
    DELETE /object/${objectId}
  ```

  ### Upload object image

  ```http
    POST /object/image
  ```

  ### Get object image

  ```http
    GET /object/image/${imageName}
  ```

  ### Upload object file

  ```http
    POST /object/file
  ```

  ### Get object file

  ```http
    GET /object/file/${fileName}
  ```

  </details> 

  <details>
  <summary>Stats</summary>

  ### Get users number

  ```http
    GET /stats/users
  ```

  ### Get creaters number

  ```http
    GET /stats/creaters
  ```

  ### Get objects number

  ```http
    GET /stats/objects
  ```

  </details> 

</details> 