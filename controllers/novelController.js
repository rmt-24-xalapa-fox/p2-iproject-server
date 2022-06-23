const { Novel, Genre } = require("../models/index");

class NovelController{
    static async getNovel(req, res, next) {
        try {
          const listNovel = await Novel.findAll({
            include: {
              model: Genre,
            },
          });
          res.status(200).json({
            statusCode: 200,
            msg: "Success access",
            data: listNovel,
          });
          next();
        } catch (err) {
          next(err);
        }
      }

      static async postNovel(req, res, next) {
        try {
          const { title, synopsis, imageUrl, releaseDate, price, genreId } = req.body;
          const { id: staffId } = req.staffs;
          const createNovel = await Novel.create({
            title,
            synopsis,
            imageUrl,
            releaseDate,
            price,
            staffId,
            genreId
          });
    
          res.status(201).json({
            statusCode: 201,
            message: "Succes create movie",
            createNovel,
          });
          next();
        } catch (err) {
          next(err);
        }
      }

      static async getNovelById(req, res, next) {
        try {
          const NovelId = +req.params.id;
          const novelById = await Novel.findByPk(NovelId);
    
          if (novelById <= 0 || !novelById) {
            throw "Error not found";
          }
          res.status(200).json({
            statusCode: 200,
            data: novelById,
          });
          next();
        } catch (err) {
          next();
        }
      }

      static async putNovelById(req, res, next) {
        try {
          const NovelId = +req.params.id;
          const { title, synopsis, imageUrl, releaseDate, price, genreId } = req.body;
          const { id: staffId } = req.staffs;
          const data = {
            title,
            synopsis,
            imageUrl,
            releaseDate,
            price,
            staffId,
            genreId
          };
          
          const updateNovel = await Novel.update(data, {
            where: { id: NovelId },
          });
    
          if (updateNovel <= 0 || !updateNovel) {
            throw "Data not found";
          }
          
          const novelById = await Movie.findByPk(NovelId);
            
          res.status(200).json({
            statusCode: 200,
            msg: "Success update movie",
            novelById, 
          });
          next();
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

    //   static async updateMovieById(req, res, next) {
    //     try{
    //       const status = req.body.status;
    //       const { title } = req.body;
    //       const movieId = +req.params.id;
    //       const email  = req.users.email;
    //       // console.log(status);
    
    //       const movieById  = await Movie.findByPk(movieId)
    //       const updatePatchMovie = await Movie.update(
    //         {status}, {
    //           where: {
    //             id: movieId
    //           }
    //         })
    
    //       const historyPatchMovie = await History.create({
    //         title,
    //         movieId,
    //         updatedBy: email,
    //         description: `Movie with id ${movieById.id} has been updated from ${status} into inactive`
    //       })
    
    //       res.status(200).json({
    //         statusCode: 200,
    //         msg: "Succes update movie status",
    //         updatePatchMovie,
    //         historyPatchMovie
    //       })
    //     } catch(err){
    //       next(err)
    //     }
    //   }

    static async deleteNovelById(req, res, next) {
        try {
          const NovelId = +req.params.id;
          const novelById = await Novel.findByPk(NovelId);
          const deleteNovel = await Novel.destroy({
            where: {
              id: NovelId,
            },
          });
    
          if (!deleteNovel) {
            throw "Data not found";
          }
          res.status(200).json({
            statusCode: 200,
            message: `${novelById.title} succes to delete`,
          });
          next();
        } catch (err) {
            console.log(err);
          next(err);
        }
      }
}

module.exports = NovelController