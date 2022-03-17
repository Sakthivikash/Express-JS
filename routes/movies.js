import express from 'express';
import { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovies } from '../helper.js';

const router = express.Router();

//Cursor pagination -> convert to array use (toArray) method
//Get all movies in the database:
router.get("/movies", async function (request, response) {
  // db.movies.find({})-> in mysql
  const movies = await getAllMovies();
  response.send(movies);
});

//get one movie only:
router.get("/movies/:id",async function (request, response) {
    console.log(request.params);
    // filter | find
    const { id } = request.params;
    // const movie = movies.find((mv) => mv.id === id);
    const movie= await getMovieById(id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    movie? response.send(movie): response.status(404).send({ message: "No such movie found 😅" });
  });

  //delete movie code:
  router.delete("/movies/:id",async function (request, response) {
    console.log(request.params);
    // filter | find
    const { id } = request.params;
    // const movie = movies.find((mv) => mv.id === id);
    const result= await deleteMovieById(id);
    response.send(result);
  });
  
  //Edit the movie:
  router.put("/movies/:id", async function (request, response) {
    console.log(request.params);
    // db.movies.updateOne({id: "102"}, {$set: upadateData})
    const { id } = request.params;
    const updateData = request.body;

    const result = await updateMovieById(id, updateData);
    response.send(result);});

  //Add new movies:
  router.post("/movies", async function (request, response) {
    
    const data= request.body;
    const result= await createMovies(data);
    response.send(result);
  
  });

  export const moviesRouter = router;
