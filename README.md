<p align="center"><img src="https://socialify.git.ci/prakhar-singh09/SummarizeIt/image?description=1&descriptionEditable=This%20is%20dual%20functionality%20App%20for%20summarizing%20content%20either%20via%20URLs%20or%20manual%20text%20input.&font=Bitter&language=1&name=1&owner=1&pattern=Brick%20Wall&theme=Dark" alt="hoolichat-api" width="640" height="320" /></p>


<h1 align="center">
   Summarizeit 📝
</h1>

An AI-Powered Summary Generation App
Introducing AI-Powered Platform that extracts summaries seamlessly from web URLs or manual input, into concise summaries, which users can easily save for future reference and use.

## 👨‍💻Features

- A content summarization App utilizing the MERN stack and GenAI to deliver efficient and accurate summaries.
- Dual functionality for summarizing content either via URLs or manual text input.
- Designed and developed a comprehensive CRUD system to store, retrieve, update, and delete generated summaries, ensuring easy management and accessibility of summarized content.
- JWT for secure and seamless Authentication and Authurization.
- Google OAuth Login for seamless Authentication and Authurization.

## Getting Started

Clone the project

```bash
git clone https://github.com/prakhar-singh09/Summarizeit.git
```
### FrontEnd

Go to the frontend directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start the react script

```bash
npm start
```

### Backend

Go to the Backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### FrontEnd

- `REACT_APP_URL`
- `REACT_APP_URL_RAPID_API_KEY`

### BackEnd

- `PORT`
- `JWT_SECRET`
- `MONGOURI`
- `OPENAI_API_KEY`



## API Reference

#### signup

```http
POST /api/auth/createuser/
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |

#### Body
`Raw(json)`

```
{
    "name":"",
    "email":"",
    "password":""
}
```

#### login

```http
POST /api/auth/login
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |

#### Body
`Raw(json)`

```
{
    "email":"",
    "password":""
}
```




#### Get all Summaries

```http
GET /api/notes/fetchallnotes
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |
| `auth-token` | `Your Auth token` |


####  Save a Summary

```http
POST /api/notes/addnote/
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |
| `auth-token` | `Your Auth token` |

#### Body

`Raw(json)`

```
{
    "title":"",
    "description":"",
}
```


####  Edit a Summary

```http
PUT /api/notes/updatenote/:id
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |
| `auth-token` | `Your Auth token` |

#### Body

`Raw(json)`

```
{
    "title":"",
    "description":"",

}
```
####  Delete a Summary

```http
DELETE /api/notes/deletenote/:id
```
#### Request Headers

| Parameter | Type     |
| :-------- | :------- | 
| `Content-Type` | `application/json` |
| `auth-token` | `Your Auth token` |

#### Body

`Raw(json)`

```
{
    "title":"",
    "description":"",

}
```

## ⚡Technology Stack

### [ReactJS](https://react.dev/)
### [NodeJS](https://nodejs.org/)
### [MongoDB](https://www.mongodb.com/)
### [Express](http://expressjs.com/)

### Contribution
Contributions are welcome! Feel free to submit issues or pull requests.

### License
This project is licensed under the MIT License.
