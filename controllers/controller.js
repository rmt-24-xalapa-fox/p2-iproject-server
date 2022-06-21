const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, FavoriteAnime } = require("../models");
const axios = require("axios");
const truncateString = require('../helpers/trim')

class Controller {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const isValid = await axios({
        method: "get",
        url: `https://verifier.meetchopra.com/verify/${email}?token=2b1e810090b21cab8a8753ec6bd1f0919bc1c698e5439627351a7f8dbbd17041f0569652a98ec7a58777cfce4df37ae6`,
      });

      if (!isValid.data.status) {
        throw { name: "Email invalid" };
      }
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({
          message: `${err.errors[0].message}`,
        });
      } else if (err.name === "Email invalid") {
        res.status(401).json({
          message: "Email invalid",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "Username is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const foundUser = await User.findOne({
        where: { username },
      });

      if (!foundUser) {
        throw { name: "Invalid username/password" };
      }
      const isValid = comparedPassword(password, foundUser.password);
      if (!isValid) {
        throw { name: "Invalid username/password" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };
      const token = signToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
        console.log(err)
      if (err.name === "Username is required") {
        res.status(400).json({
          message: "Username is required",
        });
      } else if (err.name === "Password is required") {
        res.status(400).json({
          message: "Password is required",
        });
      } else if (err.name === "Invalid username/password") {
        res.status(401).json({
          message: "Invalid username/password",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getSeasonAnime(req, res) {
    try{
      const response = await axios({
        url: `https://api.jikan.moe/v4/seasons/2022/summer`,
        method: "get"
      })

      const seasonAnimeJson = response.data.data
      const seasonAnime = seasonAnimeJson.map((anime)=>{
        const {title, images, synopsis, url, trailer} = anime
        return {
          title: truncateString(title, 20),
          imageUrl: images.jpg.image_url,
          synopsis: truncateString(synopsis, 40),
          url,
          trailer: trailer.embed_url
        }
      })
      res.status(200).json(seasonAnime)

    }
    catch(err){
      console.log(err)
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }

  static async addFavoriteAnime(req, res) {
    try {
      const { title, currentEpisode, totalEpisode, imgUrl, animeUrl } =
        req.body;
      const { id } = req.user;
      const response = await FavoriteAnime.create({
        title,
        currentEpisode,
        totalEpisode,
        imgUrl,
        animeUrl,
        UserId: id,
      });

      res.status(201).json({
        message: `${response.title} has been added to Favorite`,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async updateFavoriteanime(req, res) {
    try {
      const { id } = req.params;
      const { currentEpisode } = req.body;

      const updateFavoriteanime = await FavoriteAnime.update(
        {
          currentEpisode,
        },
        {
          where: {
            id: +id,
          },
        }
      );

      res.status(200).json({
        message: "currentpage was Update",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async getallFavoriteAnime(req, res) {
    try {
      const UserId = +req.user.id;
      const response = await FavoriteAnime.findAll({
        where: {
          UserId,
        },
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async deleteFavoriteAnime(req, res) {
    try {
      const id = +req.params.id;
      const favBeforeDelete = await FavoriteAnime.findByPk(id);
      if (!favBeforeDelete) {
        throw { name: "Data not Found" };
      }
      const deleteFavoriteAnime = await FavoriteAnime.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Favorite with id ${id} deleted successfully`,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = Controller;
