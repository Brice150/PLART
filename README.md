<div align="center">
<img height="130px" width="130px" src="./src/assets/images/home/Logo2.png">
</div>
  
# PLART, a 3D printing web application

This application is a FullStack demo of my skills in Angular and Spring Boot.

## Pages Features

### Home

### Objects

### User

### Messages

### Admin

## Run Locally

Clone the project

```bash
  git clone https://github.com/Brice150/3D-Printing.git
```

Go to backend directory 
--> Run application on Intellij

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng serve -o
```

## API Reference

#### Get all categories

```http
  GET /category/all
```
#### Find category by id

```http
  GET /category/find/{id}
```
#### Add category

```http
  POST /category/add
```
With the category to add in request body

#### Update category

```http
  PUT /category/update
```
With the category to update in request body

#### Delete category by id

```http
  DELETE /category/{id}
```

### Same API are used for work, image, message, order and user instead of category
### For the user, one more API is available to login :

```http
  POST /user/login
```
With the user to login in request body

### For the work, 2 more APIs are available to upload a zip file on the backend server and download :

```http
  POST /work/file/upload
```
With the file to upload in request body

```http
  GET /work/file/download/{filename}
```

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Red | `#ff0000` |
| Green | `#0fff00` |
| Light Blue | `#1779ff` |
| Dark Blue | `#003785` |
| Light Purple | `#1d1b31` |
| Dark Purple | `#11101d` |
| White | `#ffffff` |
| Black | `#000000` |
