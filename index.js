// 
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";



dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());//cors - 3rd party middle ware
//midde ware-> Intercept -> converting body to json
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
export const client = await createConnection();

app.get("/", function (request, response) {
  response.send("Hello 🌏✨🎊");
});

app.use('/movies', moviesRouter)
  
  app.use('/users',usersRouter);
  app.listen(PORT, () => console.log(`Server started in ${PORT} `));

  

  

