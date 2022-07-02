const { User } = require("../models/index");
const { verifiedPass, createToken, verifiedToken } = require("../helps/help");
const RadioBrowser = require("radio-browser");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { APIKEY, SERVERKEY, CLIENTKEY, CLIENT_ID } = process.env;
const midtransClient = require("midtrans-client");
const { sendEmail } = require("../helps/sendemail");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const status = "Free";
      const inputData = { email, password, name, status };

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!name) {
        throw { name: "Name is required" };
      }

      if (!status) {
        throw { name: "Status is required" };
      }

      const newUser = await User.create(inputData);

      sendEmail(email, name, null);

      const result = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      let email = payload.email;
      let token;

      let user = await User.findOne({ where: { email } });

      if (user) {
        token = createToken({
          id: user.id,
          email: user.email,
          status: user.status,
        });

        res.status(200).json({ access_token: token });
      } else {
        let email = payload.email;
        let password = "whatTheHelliamdoinghere";
        let status = "Free";
        let name = payload.given_name

        let newAccGoogle = {
          email,
          password,
          name,
          status
        };

        let newUser = await User.create(newAccGoogle);

        token = createToken({
          id: newUser.id,
          email: newUser.email,
          status: newUser.status,
        });

        res.status(200).json({access_token: token});
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

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
        status: findUser.status,
      };

      const token = createToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTokenPayment(req, res, next) {
    try {
      if (req.user.status === "Premium") {
        throw { name: "Access Denied, Your account already Premium" };
      }
      const { username, phoneNumber } = req.body;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: SERVERKEY,
        clientKey: CLIENTKEY,
      });


      const { email } = req.user;
      let idNumber = 1;

      let parameter = {
        transaction_details: {
          order_id: `${phoneNumber} - ${idNumber}`,
          gross_amount: 200000,
          name: username,
          phone: phoneNumber,
          email_user: email,
        },
        credit_card: {
          secure: true,
        },
      };

      idNumber++;

      const transaction = await snap.createTransaction(parameter);

      if (!transaction) {
        throw { name: "Transaction failed" };
      }

      res.status(200).json({ TokenPayment: transaction.token });

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

  static async top10radio(req, res, next) {
    try {
      let filter = {
        limit: 10,
        by: "topvote",
      };

      if (req.user.status !== "Premium") {
        throw { name: "You are not authorized, Premium member only" };
      }

      const getRadio = await RadioBrowser.getStations(filter);

      if (!getRadio) {
        throw { name: "Radio station not found" };
      }

      const result = getRadio.map((el) => {
        return {
          Name: el.name,
          url1: el.url,
          url2: el.url_resolved,
          Country: el.country,
          TotalVotes: el.votes,
          official_website: el.homepage,
        };
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const { access_token } = req.headers;
      const userId = verifiedToken(access_token).id;

      if (!userId) {
        throw { name: "User id not found" };
      }

      const { status } = req.body;

      const updateStatus = await User.update(
        { status },
        {
          where: {
            id: userId,
          },
        }
      );

      res.status(200).json({ message: "Status has been changed" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  Controller,
};
