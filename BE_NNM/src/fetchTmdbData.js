import axios from 'axios';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import connectDB from './config/db.js'; // Thêm .js nếu dùng ESM
import Movie from './models/Movie.js';
import Actor from './models/Actor.js';
import Genre from './models/Genre.js';

config({ path: '../.env' }); // Load biến môi trường từ .env

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

console.log('MONGO_URI trước khi connect:', process.env.MONGO_URI);
console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY);

// Đồng bộ genres từ TMDb
async function syncGenres() {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const tmdbGenres = response.data.genres;

        for (const tmdbGenre of tmdbGenres) {
            const existingGenre = await Genre.findOne({ tmdbId: tmdbGenre.id });
            if (!existingGenre) {
                const newGenre = new Genre({
                    tmdbId: tmdbGenre.id,
                    name: tmdbGenre.name
                });
                await newGenre.save();
                console.log(`Đã thêm genre: ${tmdbGenre.name}`);
            }
        }
    } catch (error) {
        console.error('Lỗi khi đồng bộ genres:', error);
    }
}

async function fetchAndUpdateTmdbData() {
    try {
        // Kết nối MongoDB
        await connectDB();

        // Đồng bộ genres trước
        await syncGenres();

        // Lấy danh sách phim mới từ TMDb
        const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const movies = response.data.results;

        for (const movie of movies) {
            const existingMovie = await Movie.findOne({ tmdbId: movie.id });
            if (!existingMovie) {
                const movieDetails = await axios.get(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`);
                const actors = movieDetails.data.credits.cast.slice(0, 5);
                const genres = movieDetails.data.genres;

                // Lấy trailer
                const videoResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
                const videos = videoResponse.data.results;
                let trailerUrl = "";
                const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer");
                if (trailer) {
                    trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                }

                // Lấy ObjectId của genres
                const genreIds = await Promise.all(genres.map(async (g) => {
                    const genre = await Genre.findOne({ tmdbId: g.id });
                    return genre ? genre._id : null;
                })).then(ids => ids.filter(id => id !== null));

                // Thêm phim mới
                const newMovie = new Movie({
                    tmdbId: movie.id,
                    title: movie.title,
                    description: movie.overview || "No description available",
                    releaseYear: movie.release_date ? parseInt(movie.release_date.slice(0, 4)) : null,
                    genre: genreIds.length > 0 ? genreIds : [],
                    director: "Unknown",
                    actors: [],
                    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
                    trailer: trailerUrl, // Sửa từ "trailerUrl" thành trailerUrl
                    theatricalReleaseDate: movie.release_date ? new Date(movie.release_date) : null,
                    ratings: [],
                    comments: [],
                    bannerImage: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : ""
                });
                const savedMovie = await newMovie.save();

                // Xử lý diễn viên
                const actorIds = await Promise.all(actors.map(async (actor) => {
                    let savedActor = await Actor.findOne({ tmdbId: actor.id });
                    if (!savedActor) {
                        savedActor = new Actor({
                            tmdbId: actor.id,
                            name: actor.name,
                            birthDate: null,
                            birthPlace: "",
                            description: actor.known_for_department || "Actor",
                            knownForMovies: [savedMovie._id],
                            profileImage: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "",
                            photos: []
                        });
                        await savedActor.save();
                    } else {
                        await Actor.updateOne(
                            { _id: savedActor._id },
                            { $addToSet: { knownForMovies: savedMovie._id } }
                        );
                    }
                    return savedActor._id;
                }));

                // Cập nhật actors vào movie
                await Movie.updateOne(
                    { _id: savedMovie._id },
                    { $set: { actors: actorIds } }
                );

                console.log(`Đã thêm phim: ${movie.title} với ${genreIds.length} thể loại với trailer: ${trailerUrl}`);
            }
        }
        console.log('Cập nhật dữ liệu từ TMDb hoàn tất!');
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ TMDb:', error);
    } finally {
        mongoose.connection.close();
    }
}

fetchAndUpdateTmdbData();