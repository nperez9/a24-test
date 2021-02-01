import mongoose, { Document } from 'mongoose';
import { Movie } from '../interfaces';

interface IMovieModel extends Movie, Document {

}

const movieImageSchema = new mongoose.Schema({
  cover: { type: String, required: true },
  poster: { type: String },
  captures: [{ type: String }]
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 150 },
  description: { type: String, required: true },
  shortDescription: { type: String, max: 255, required: true },
  duration: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  releaseDate: { type: String, required: true },
  images: movieImageSchema,
  genres: [{type: String, required: true}],
});


const movieModel = mongoose.model<IMovieModel>('movies', movieSchema, 'movies');

export default movieModel;