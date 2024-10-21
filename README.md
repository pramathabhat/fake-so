[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in *images/*

# Instructions to setup and run project

## **VERY IMPORTANT:** 
### The cookies are set up in such a way that the user logged in will stay logged in until logged out
### The cookies name is currentUser, it will save on login and delete on logout
#
## **Testing Notes:**
### If the test cases are not working, it is due to the paths for init.js and destroy.js
### You MAY need to change the variable PATH in **fakeso.cy.js** to the correct path the folder for this project is in
### If you do this you will need to uncomment the cy.exec functions that are commented and comment the ones currently in use
### This will ensure the init.js and destroy.js files can run correctly
#
### Setup:
#### run npm install
### Packages: (All should be in the package.json file, not all were used in the final version)
#### packages used in the client:
##### --- "@reduxjs/toolkit"
##### --- "@testing-library/jest-dom"
##### --- "@testing-library/react"
##### --- "@testing-library/user-event"
##### --- "axios"
##### --- "react"
##### --- "react-dom"
##### --- "react-redux"
##### --- "react-router"
##### --- "react-router-dom"
##### --- "react-scripts"
##### --- "redux"
##### --- "web-vitals"
#### packages used in the server:
##### --- "bcrypt"
##### --- "bcryptjs"
##### --- "cookie-parser"
##### --- "cors"
##### --- "express"
##### --- "express-session"
##### --- "mongoose"
##### --- "mysql"
#
### If need be, run these npm installs to install the necessary packages:
#### npm install node
#### npm install nodemon
#### npm install express
#### npm install express-session
#### npm install cookie-parser
#### npm install cors

#### npm install mongoose

#### npm install react
#### npm install redux
#### npm install react-redux
#### npm install @reduxjs/toolkit
#### npm install axios
#
### MongoDB Server
#### Server URL: mongodb://127.0.0.1:27017/fake_so
#### Load Database: node init.js
#### Delete Database: node destroy.js
#### Start mongodb: navigate to C:/Program Files/MongoDB/Server/7.0/bin, then run mongod.exe
#
### Node Server
#### Server URL: localhost:8000
#### Start Server: nodemon server.js
#
### Client Side
#### Client URL: localhost:3000
#### Start Client: npm start
#
#
#
## Team Member 1 Contribution
### Christopher Morgan

### Use-Cases:
#### Create Account
#### Login
#### Logout of account
#### Homepage
#### Searching
#### New Question
#### User Profile

### Server Implementation

## Team Member 2 Contribution
### Pramatha Bhat

### Use-Cases:
#### All Tags - Actors Registered user, Guest user.
#### Answers - Actors Guest user.
#### Answers - Actors Registered user.
#### Comments - Actors Guest user.
#### Comments - Actors Registered user.
#### New Answer - Actors Registered user.

### Server Implementation for comments

## Test cases

| Use-case Name      | Test case Name                                                                                   |
|--------------------|--------------------------------------------------------------------------------------------------|
| All Tags           | Guest User All Tags                                                                              |
|                    | Guest User Selects a Tag                                                                         |
|                    | Guest User Searches No Tags                                                                      |
|                    | Registered User All Tags                                                                         |
|                    | Registered User Selects a Tag                                                                    |
|                    | Registered User All Tags Asks a question with a new tag                                          |
| Answers            | Get Question Answers                                                                             |
|                    | Registered User Get Question Answers                                                             |
|                    | Registered User upvotes a question                                                               |
|                    | Registered User downvotes after upvoting a question                                              |
|                    | Registered User downvotes a question                                                             |
|                    | Registered User upvotes after downvoting a question                                              |
|                    | Registered User cannot upvote a question due to too low of a reputation score                    |
|                    | Registered User cannot downvote a question due to too low of a reputation score                  |
|                    | Registered User Get Question Answers Asks A Question                                             |
|                    | Registered User Get Question Answers Asks A Question                                             |
| Create Account     | Shows Welcome message                                                                            |
|                    | Shows options in welcome page                                                                    |
|                    | Shows Register Page                                                                              |
|                    | Register Page Functions Valid Email                                                              |
|                    | Register Page Functions Invalid Email                                                            |
|                    | Register Page Functions Existing Username                                                        |
|                    | Register Page Functions Existing Email                                                           |
|                    | Register Page Functions Not Matching Password                                                    |
| Home Page          | Guest User Works                                                                                 |
|                    | Guest User HomePage                                                                              |
|                    | Guest User Scroll Next                                                                           |
|                    | Guest User Scroll Prev                                                                           |
|                    | Guest User Scroll Next Prev                                                                      |
|                    | Guest User Scroll Prev Next                                                                      |
|                    | Guest User Active Sort                                                                           |
|                    | Guest User Newest Sort                                                                           |
|                    | Guest User Unanswered Sort                                                                       |
|                    | Guest User Go To Login Page                                                                      |
|                    | Guest User Go To Register Page                                                                   |
|                    | Registered User HomePage                                                                         |
|                    | Registered User Scroll Next                                                                      |
|                    | Registered User Scroll Prev                                                                      |
|                    | Registered User Scroll Next Prev                                                                 |
|                    | Registered User Scroll Prev Next                                                                 |
|                    | Registered User Active Sort                                                                      |
|                    | Registered User Newest Sort                                                                      |
|                    | Registered User Unanswered Sort                                                                  |
| Login              | Shows Login Screen                                                                               |
|                    | Logs In                                                                                          |
|                    | Invalid Username                                                                                 |
|                    | Invalid Password                                                                                 |
|                    | Registered User Works                                                                            |
| Logout of account  | User Logs Out Successfully                                                                       |
| New Question       | Registered User can go to Ask a Questions                                                        |
|                    | Registered User asks a question                                                                  |
|                    | Registered User asks a question with too many characters in the title                            |
|                    | Registered User asks a question without a title                                                  |
|                    | Registered User asks a question without text                                                     |
|                    | Registered User asks a question with a valid hyperlink                                           |
|                    | Registered User asks a question with an invalid hyperlink                                        |
|                    | Registered User asks a question with too many tags                                               |
|                    | Registered User asks a question with too many tags                                               |
|                    | Registered User asks a question with no tags                                                     |
|                    | Registered User with less than 50 rep tries to add a new tag                                     |                                                   |
| Searching          | Guest User Search Only Tags 1 Tag                                                                |
|                    | Guest User Search Only Tags 2 Tags                                                               |
|                    | Registered User Searches No Tags                                                                 |
|                    | Registered User Search Only Tags 1 Tag                                                           |
|                    | Registered User Search Only Tags 2 Tags                                                          |
| User Profile       | Registered User goes to Profile                                                                  |
|                    | Registered User goes to Profile and gets their questions                                         |
|                    | Registered User goes to Profile and modifies a question title successfully                       |
|                    | Registered User goes to Profile and modifies a question title unsuccessfully too long of a title |
|                    | 	Registered User goes to Profile and modifies a question title unsuccessfully no title           |
|                    | 	Registered User goes to Profile and deletes question                                            |
|                    | 	Registered User goes to Profile and reposts question                                            |
|                    | 	Registered User goes to Profile and modifies a question text successfully                       |
|                    | 	Registered User goes to Profile and modifies a question text unsuccessfully invalid hyperlink   |
|                    | 	Registered User goes to Profile and modifies a question text unsuccessfully no text             |
|                    | 	Registered User goes to Profile and modifies a question tags successfully                       |
|                    | 	Registered User goes to Profile and modifies a question tags unsuccessfully too many tags       |
|                    | 	Registered User goes to Profile and modifies a question tags unsuccessfully no tags             |
|                    | 	Registered User goes to Profile and modifies a question tags unsuccessfully too long tag        |
|                    | 	Registered User goes to Profile and gets their Answers                                          |
|                    | 	Registered User goes to Profile and modifies an answer successfully                             |
|                    | 	Registered User goes to Profile and modifies an answer unsuccessfully no answer                 |
|                    | 	Registered User goes to Profile and modifies an answer unsuccessfully bad hyperlink             |
|                    | 	Registered User goes to Profile and deletes an answer                                           |
|                    | 	Registered User goes to Profile and reposts an answer                                           |
|                    | 	Registered User goes to Profile and gets their Tags                                             |
|                    | 	Registered User goes to Profile and modifies a tag                                              |
|                    | 	Registered User goes to Profile and modifies a tag no value                                     |
|                    | 	Registered User goes to Profile and modifies a tag too long tag                                 |
|                    | 	Registered User goes to Profile and deletes a tag                                               |




## Design Patterns Used

- Design Pattern Name: Singleton Pattern (In the current implementation, more than one instance cannot be created)

- Problem Solved: Singleton Pattern: The Singleton pattern was implemented in the code to ensure that there is only one instance of the Database class. This can be particularly useful for managing a single database connection throughout the application. It improves code structure by centralizing the responsibility of managing the database connection in a single class, making it easier to maintain and control access to the database. The Singleton pattern is not inherently tied to a specific framework in this implementation. Instead, it's used to solve a common problem of managing a single database connection. This is a classic use case for the Singleton pattern, ensuring that there is only one instance of the Database class, which in turn manages the database connection. This can prevent issues related to multiple, unnecessary connections and ensures efficient use of resources.

In the provided code, a Singleton pattern is implemented through the Database class to manage the database connection. This design pattern ensures that only one instance of the Database class is created, facilitating a single, shared connection to the MongoDB database. The connect method within the class guarantees that a connection is established only if one doesn't exist already, preventing redundant connections. Similarly, the disconnect method allows for terminating the connection but only if there was a previous connection. The Singleton pattern brings advantages such as resource efficiency by managing a single, centralized connection, preventing multiple connections, and providing control over database operations. This design choice enhances code maintainability, security, and consistency in handling database interactions throughout the application.

- Location in code where pattern is used: server/models/database.js
