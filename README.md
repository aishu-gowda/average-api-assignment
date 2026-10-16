# Average Calculator REST API

Overview

This project is a simple REST API built using Node.js. It accepts numbers through a POST endpoint and returns the running average of all submitted numbers.

It also includes a simple web interface for entering numbers and viewing the calculated average.

Technologies Used

- Node.js
- JavaScript
- HTML
- CSS
- REST API
- Node.js built-in HTTP module
- Node.js built-in testing module

 Features

- Submit a number using `POST /average`
- Calculate the running average of submitted numbers
- Return the total number of submitted values
- Validate incoming numbers
- Handle invalid JSON and unknown routes
- Provide a simple web interface
- Include automated tests

 Project Structure

```text
assesment aish api/
├── public/
│   └── index.html
├── src/
│   └── server.js
├── test/
│   └── server.test.js
├── package.json
└── README.md
```

 Requirements

- Node.js 20 or newer
- npm

 Installation

Clone the repository and open its directory:

bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_FOLDER


No additional packages are required for the current implementation because it uses Node.js built-in modules.

## Run the Application

bash
npm start


Open this URL in your browser:

http://localhost:3000

## API Documentation

### Endpoint

POST /average

### Request Body

json
{
  "number": 10
}


### Successful Response

json
{
  "average": 10,
  "count": 1
}


Submit more numbers to update the running average.

### Error Responses

- 400 Bad Reques` — invalid JSON or invalid number
- 404 Not Found — unknown route

### Important Note

Submitted numbers are stored in memory. They reset whenever the server restarts.

## Run Tests

bash
npm test


The tests verify average calculations, invalid input, invalid JSON, unknown routes, and the home page.

