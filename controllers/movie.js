const { Op } = require("sequelize");
const { Favourite,User, Movie, Genre, MovieGenre,History } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
class Controller {

    static async getMovies(req, res, next) {
        try {
                     
        console.log(req.query);
        console.log(req.body);
        let name=req.query.name;
        let rating=req.query.rating;
        let title=req.query.title;
        let offset=req.query.page;
        let limit=req.query.limit;
        let genre=req.query.genre;
        if(!limit){
            limit=2;
        }
        if(!offset){
            offset=0;
        }else{
            offset=offset*limit
        }
        console.log(offset+" is OFFSET");
        
        let where = {
            statusArchieve: "active"
        }
        let whereGenre={
            model: MovieGenre,
            attributes: {
                exclude: ['createdAt', 'updatedAt',"MovieId","id"]
            },
            include:{
                model: Genre,
                attributes:['name']
            }
        }
        console.log(genre)
        if(rating){
            
            where.rating={[Op.gte]: rating}
        }
        if(title){
            title= "%"+title+"%"
            where.title={[Op.iLike]: title}
        }
        if(genre){
            if(genre.length>0){
                whereGenre.where={
                    GenreId:{[Op.or]:[genre]}
                }
            }
            
        }
        let option ={
            limit: limit,
            offset: offset,
            where:where,
            distinct:true,
            include:whereGenre
            
        }
            console.log(option);
            let {count,rows} = await Movie.findAndCountAll(option);
            console.log("Pages count: "+count +" limit"+limit+" totalPages "+Math.ceil(count/limit) +" offset "+offset )
            let totalPages=Math.ceil(count/limit) 
            if (rows) {   
                res.status(200).json({ Movies: rows,totalPages });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async getMovieDetail(req, res, next) {
        try {
            let id = req.params.id;
            const movies = await Movie.findByPk(id, {});
            if (!movies) {
                throw { statusCode: 404 };
            } else {
                res.status(200).json({
                    message: "Detail movies",
                    data: movies,
                });
            }


        } catch (error) {
            next(error);
        }
    }

    static async addMovie(req, res, next) {
        try {
            const authorId = req.user.id;
            const { title, synopsis, trailerUrl, imageUrl, rating, listGenres } = req.body;
            console.log(req.body);
            if (!title || !synopsis || !rating) {
                throw { statusCode: 400 }
            }
            console.log(`${title}, ${synopsis}, ${trailerUrl}, ${imageUrl}, ${rating}, ${authorId}, ${listGenres}`)
            const movie = await Movie.create({
                title, synopsis, trailerUrl, imageUrl, rating, authorId
            });
            if (movie) {
                
                let history = History.create({
                    action: 'created',
                    TargetId: movie.title,
                    UserId: req.user.email
                });
                if (listGenres) {
                    listGenres.forEach(element => {
                        console.log(element+" "+movie.id);
                        let moviegenre = MovieGenre.create({
                            MovieId: movie.id, GenreId: element
                        });
                    });
                }
                res.status(201).json({
                    message: "Movie " + title + " has been created",
                });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log("Error is caught here")
            console.log(error);
            next(error);
        }
    }

    static async updateMovie(req, res, next) {
        try {
            const authorId = req.user.id;
            let id = req.params.id;
            let { title, synopsis, trailerUrl, imageUrl, rating } = req.body;

            console.log(`${title}, ${synopsis}, ${trailerUrl}, ${imageUrl}, ${rating}, ${id}`)
            const movie = await Movie.findByPk(id);
            if (movie) {
                console.log("Movie is exist")
                if (!title) {
                    title = movie.title;
                }
                if (!synopsis) {
                    synopsis = movie.synopsis
                }
                if (!trailerUrl) {
                    trailerUrl = movie.trailerUrl
                }
                if (!imageUrl) {
                    imageUrl = movie.imageUrl
                }
                if (!rating) {
                    rating = movie.rating

                }
                const movieupdate = await movie.update({ title, synopsis, trailerUrl, imageUrl, rating });
                if (movieupdate) {

                    let history = History.create({
                        action: 'updated',
                        TargetId: movieupdate.title,
                        UserId: req.user.email
                    });

                    res.status(201).json({ message: "Movie updated" })
                }
            }
            else {
                throw { statusCode: 404 }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteFavourite(req, res, next){
        try {
            const authorId = req.user.email;
            let id = req.params.id;
            let movie = await Movie.findByPk(id);

            if (!movie) {
                throw { statusCode: 404 };
            } else {
                let favourite = await Favourite.findOne({where:{UserId: req.user.id,MovieId:movie.id}});
                if(favourite){
                    favourite.destroy().then(()=>{
                        let history = History.create({
                            action: "unfavourited ",
                            TargetId: movie.title,
                            UserId: authorId
                        });
                    }).then(() => {
                        res.status(200).json({
                            message: "Favourite deleted",
                        });
                    })
                }else{
                    throw { statusCode: 404 };
                }
                
            }

        } catch (error) {
            next(error);
        }
    }

    static async listFavourite(req, res, next){
        try {
            const authorId = req.user.id;
            let favourite = await Favourite.findAll({where:{UserId:authorId},
                include:{
                    model: Movie
                }});

            if (!favourite) {
                throw { statusCode: 404 };
            } else {
                res.status(200).json({ Favourites: favourite });
            }

        } catch (error) {
            next(error);
        }
    }

    static async addFavourite(req, res, next){
        try {
            const authorId = req.user.email;
            let id = req.params.id;
            let movie = await Movie.findByPk(id);

            if (!movie) {
                throw { statusCode: 404 };
            } else {
               console.log("Movie found");
                Favourite.findOrCreate({
                    where: {UserId: req.user.id,MovieId:movie.id}
                }).then((response) => {
                    if (response) {
                        let history = History.create({
                            action: "favourited ",
                            TargetId: movie.title,
                            UserId: authorId
                        });
                    }
                }).then(() => {
                    res.status(200).json({
                        message: "Favourite added",
                    });
                });

            }

        } catch (error) {
            next(error);
        }
    }


    static async deleteMovie(req, res, next) {
        try {
            const authorId = req.user.email;
            let id = req.params.id;
        let {status}= req.body
            let movie = await Movie.findByPk(id);

            if (!movie) {
                throw { statusCode: 404 };
            } else {
                if(!status) status = "archieved";
                movie.update({
                    statusArchieve:status
                }).then((response) => {
                    if (response) {
                        let history = History.create({
                            action: "update status to "+status,
                            TargetId: response.title,
                            UserId: authorId
                        });
                    }
                }).then(() => {
                    res.status(200).json({
                        message: "Movie deleted",
                    });
                });
                // movie.destroy().then((response) => {
                //     else {
                //         throw { statusCode: 500 };
                //     }
                // });


            }

        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const authorId = req.user.email;
            let id = req.params.id;
            let {status}=req.body;
            let movie = await Movie.findByPk(id);

            if (!movie) {
                throw { statusCode: 404 };
            } else {
                let statusArchieve = status;
                movie.update({
                    statusArchieve
                }).then((response) => {
                    if (response) {
                        let history = History.create({
                            action: "update status ",
                            TargetId: movie.title,
                            UserId: authorId
                        });
                    }
                }).then(() => {
                    res.status(200).json({
                        message: "Movie status updated",
                    });
                });
                // movie.destroy().then((response) => {
                //     else {
                //         throw { statusCode: 500 };
                //     }
                // });


            }

        } catch (error) {
            next(error);
        }
    }

    //genre controller
    static async getGenre(req, res, next) {
        try {
            let genre = await Genre.findAll();
            if (genre) {
                res.status(200).json({ Genres: genre });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async addGenre(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                throw { statusCode: 400 }
            }
            const genre = Genre.create({ name });
            if (genre) {
                res.status(201).json({
                    message: "Genre " + name + " has been created",
                });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateGenre(req, res, next) {
        try {
            let id = req.params.id;
            let { name } = req.body;
            const genre = Genre.findByPk({ id });
            if (genre) {
                if (!name) {
                    name = genre.name;
                }
                genre.update({ name }).then((response) => {
                    res.status(201).json({ message: "Genre updated" })
                })
            } else {
                throw { statusCode: 404 }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            let id = req.params.id;
            let genre = await Genre.findByPk(id);

            if (!genre) {
                throw { statusCode: 404 };
            } else {
                genre.destroy().then((response) => {
                    if (response) {
                        res.status(200).json({
                            message: "Genre deleted",
                        });
                    } else {
                        throw { statusCode: 500 };
                    }
                });


            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;