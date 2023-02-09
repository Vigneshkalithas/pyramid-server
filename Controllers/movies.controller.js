import { Movies } from "../model/movie.model.js";

const GetAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res
      .status(200)
      .send({ error: false, message: "data send successfully", data: movies });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ error: true, message: `sorry something went wrong , ${error}` });
  }
};

const GetOneMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const getOneMovie = await Movies.findById(id);
    res.status(200).send({
      error: false,
      message: "data sent successfully",
      data: getOneMovie,
    });
  } catch (error) {
    res
      .status(404)
      .send({ error: true, message: `sorry something went wrong , ${error}` });
  }
};

export { GetAllMovies, GetOneMovies };
