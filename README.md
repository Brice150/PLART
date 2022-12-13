<div align="center">
<img height="130px" width="130px" src="./src/assets/images/Logo.png">
</div>
  
# PLART, a 3D printing web application

This application is a FullStack demo of my skills in Angular and Spring Boot.

## Pages Features

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

## Run Locally

Clone the project

```bash
  git clone https://github.com/Brice150/PLART.git
```

Go to backend directory 
--> Run application on Intellij

Install dependencies

Go to PLART directory and install Angular and Angular Material :

```bash
  npm install
```

```bash
  npm install -g @angular/cli
```

```bash
  ng add @angular/material
```

Start the server

```bash
  ng serve -o
```

## API Reference

### Connect

#### Registration

```http
  POST /registration
```

#### Email confirmation

```http
  GET /registration/confirm
```

#### Login

```http
  GET /login
```

#### Logout

```http
  GET /logout
```

#### Logout

```http
  GET /logout
```

### Stats

#### Get users number

```http
  GET /stats/users
```

#### Get creaters number

```http
  GET /stats/creaters
```

#### Get objects number

```http
  GET /stats/objects
```

### Objects

#### Find all objects

```http
  GET /object/all
```

#### Find object by id

```http
  GET /object/find/${id}
```

#### Add object

```http
  POST /object/add
```

#### Update object

```http
  PUT /object/update
```

#### Delete object

```http
  DELETE /object/delete/${id}
```

#### Upload image

```http
  POST /object/image/upload
```

#### Upload file

```http
  POST /object/file/upload
```

#### Get object image

```http
  GET /object/image/get/${imagename}
```

#### Download object file

```http
  GET /object/file/download/${filename}
```

### User

#### Find all users

```http
  GET /user/all
```

#### Find user by email

```http
  GET /user/find/email/${email}
```

#### Find user by id

```http
  GET /user/find/id/${id}
```

#### Update user

```http
  PUT /user/update
```

#### Delete user

```http
  DELETE /user/delete/${email}
```

### Messages

#### Find message by id

```http
  GET /message/find/${id}
```

#### Add message

```http
  POST /message/add
```

#### Update message

```http
  PUT /message/update
```

#### Delete message

```http
  DELETE /message/delete/${id}
```

### Admin

#### Find all users

```http
  GET /admin/user/all
```

#### Find all messages

```http
  GET /admin/message/all
```

#### Delete user

```http
  DELETE /admin/user/delete/${email}
```

#### Delete message

```http
  DELETE /admin/message/delete/${id}
```

#### Delete object

```http
  DELETE /admin/object/delete/${id}
```