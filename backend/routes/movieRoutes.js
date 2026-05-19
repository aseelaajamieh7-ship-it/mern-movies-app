const express = require("express");

const router = express.Router();

const Movie = require("../models/Movie");

const authMiddleware = require("../middleware/authMiddleware");

const loggerMiddleware = require("../middleware/loggerMiddleware");


// GET ALL MOVIES
router.get("/", authMiddleware, async (req, res) => {

  try {

    const movies = await Movie.find({
      user: req.session.userId,
    });

    res.json(movies);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ADD MOVIE
router.post(
  "/",
  authMiddleware,
  loggerMiddleware,
  async (req, res) => {

    try {

      const { title, description } = req.body;

      const movie = await Movie.create({
        title,
        description,
        user: req.session.userId,
      });

      res.status(201).json({
        message: "Movie added successfully",
        movie,
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);


// UPDATE MOVIE
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { title, description } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userId,
      },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "Movie updated successfully",
      updatedMovie,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// DELETE MOVIE
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Movie.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId,
    });

    res.json({
      message: "Movie deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});


module.exports = router;