const { User } = require("../models/index");
const { verifiedPass, createToken } = require("../helps/help");
const RadioBrowser = require("radio-browser");
const axios = require("axios");
const { APIKEY, SERVERKEY, CLIENTKEY } = process.env;
const midtransClient = require("midtrans-client");
const { sendEmail } = require("../helps/sendemail");

class Controller {

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "Invalid email/password" };
      }

      const checkPass = verifiedPass(password, findUser.password);

      if (!checkPass) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = createToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  
  static async getallSong(req, res, next) {
    try {
      const data = await axios({
        method: "get",
        url: `http://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${APIKEY}`,
      });

      if (!data) {
        throw { name: "Songs not found" };
      }

      let trackInfo = data.data.message.body.track_list;

      let result = trackInfo.map((el) => {
        return {
          title: el.track.track_name,
          rating: el.track.track_rating,
          album: el.track.album_name,
          artistName: el.track.artist_name,
          songUrl: el.track.track_share_url,
        };
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
