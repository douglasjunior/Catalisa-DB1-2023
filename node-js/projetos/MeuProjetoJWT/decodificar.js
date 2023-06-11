const jwt = require("jsonwebtoken");

const secret = "minha-senha-super-secreta";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJub21lIjoiRG91Z2xhcyJ9LCJ0aXBvIjoiYWRtaW5pc3RyYWRvciIsImlhdCI6MTY4NjUwNzUxMn0.ki_-SmcWaIVkuM8GL4EMkTccZnrthVTmVLNCgIA7m7E";

const payload = jwt.verify(token, secret);

console.log('Meu Payload: ', payload);
