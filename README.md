# auth_boiler
boiler for proj 2 


This is a boiler plate for an express app with local user authentication. It exists so I have a customized boilerplate and dont have to start from scratch on all my projects 

## What it includes 

* local Auth (email and password)
* passport and passport-local
* Sessions for saving user info and displaying flash messages 
* settings forPostGreSQL and sequelize
* Hashed Passwords 
* EJS templating and EJS layouts
* sequelize user model
* Materialize styling - nav and footer 


## Models

**User Model**

| Method | Type | Notes |
| ------ | ---- | -------|
|  id | Integer | Serial Primary Key |
| firstname| String | Required length > 1 |
| lastname| String | - |
| password | String | unique login |
| bio | text | - |
| admin | Boolean | Defaulted to False |
| createdAt | Date | Automaticlly added by Sequelize|
| updateddAt | Date | Automaticlly added by Sequelize|

## Routes
**Routes in Index**

| Method | Path | Purpose|
| ------ | ---- | -------|
| GET | '/' | Home page |
| GET | '/' | Catch-all for 404s |

| Method | Path | Purpose|
| ------ | ---- | -------|
| GET | '/auth/login' | Render login |
| POST | '/auth/login' | Process login data |
| GET | '/auth/signup' | Render signup form |
| POST | '/auth/signup' | process signup data |
| GET | '/auth/logout' | Remove user from signup |


**Routes in controllers/profile.js**
| Method | Path | Purpose |
| ------ | ---------------------- | ---------------------------- |
| GET | `/profile/user` | Show user dashboard (authorized user only) |
| GET | `/profile/admin` | Show admin dashboard (authorized admin only) |
| GET | `/profile/guest/:id` | View user dashboard as guest (authorized user only) |

## Directions For Use

### 1. Clone repository, but with different Name 
run the following code in terminal:
```sh
git clone <repo_link> <new_name>
```

**For Example**

```sh
git clone https://github.com/samuelhhawkins/auth_boiler.git shiny-new-project
```

### 2. Install the modules from package.json

```sh
npm i 
```
### 3. Customize the new project

remove defaulty stuff. For example:

* Title in `layout.ejs`
* Logo in nav bar 
* Description and repository fields in package.json
* Remove this boiler plate's readme content
* Switch Favicon to one spacific to your project (in `layout.ejs` head section)

### 4. Create new database for your project 

```sh
createdb <new_db_name>
```



*
*
*
*
