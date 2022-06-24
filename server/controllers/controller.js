const { User, Mountain, Quota, License } = require("../models");
const { bcryptCheckPass } = require("../helpers/bcrypt");
const { convertToToken } = require("../helpers/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
class Controller {
  static async registerController(req, res, next) {
    try {
      const { email, name, password, phoneNumber } = req.body;
      const createdUser = await User.create({
        email,
        name,
        password,
        phoneNumber,
      });
      const data = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async loginController(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Email/PasswordEmpty" };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "UserNotFound" };
      }
      const checkPass = bcryptCheckPass(password, findUser.password);
      if (!checkPass) {
        throw { name: "UserNotFound" };
      }
      const payload = {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
      };
      const token = convertToToken(payload);
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async mountainsController(req, res, next) {
    try {
      const response = await Mountain.findAll();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async mountainsByIdController(req, res, next) {
    try {
      const { MountainId } = req.params;
      const findMountain = await Mountain.findByPk(MountainId, {
        include: [
          {
            model: Quota,
          },
        ],
        order: [[Quota, "date", "ASC"]],
      });
      if (!findMountain) {
        throw { name: "MountainNotFound" };
      }
      res.status(200).json(findMountain);
    } catch (err) {
      next(err);
    }
  }

  static async postLicenseController(req, res, next) {
    try {
      const { MountainId, QuotaId } = req.params;
      const findMountain = await Mountain.findByPk(MountainId);
      const { numberOfClimbers, totalPrice } = req.body;
      if (numberOfClimbers <= 0) {
        throw { name: "BadInput" };
      }
      if (!findMountain) {
        throw { name: "MountainNotFound" };
      }
      const quota = await Quota.findByPk(QuotaId);
      const sisaKuota = quota.quotaMax - quota.quotaUse;
      console.log(sisaKuota);
      if (sisaKuota - numberOfClimbers < 0) {
        throw {
          name: "QuotaExceed",
          quotaRemain: sisaKuota,
        };
      }
      const { id: UserId } = req.user;
      const data = {
        UserId,
        MountainId,
        QuotaId,
        numberOfClimbers,
        totalPrice,
      };
      await License.create(data);
      res.status(201).json({ message: "Success Created License" });
    } catch (err) {
      next(err);
    }
  }

  static async patchQuotaController(req, res, next) {
    try {
      const { QuotaId } = req.params;
      const { quotaUse } = req.body;
      let quotaData = 0;
      const findQuota = await Quota.findByPk(QuotaId);
      if (!findQuota) {
        throw { name: "QuotaNotFound" };
      }
      quotaData = findQuota.quotaUse;
      await Quota.update(
        {
          quotaUse: quotaData + +quotaUse,
        },
        {
          where: {
            id: QuotaId,
          },
        }
      );
      res.status(200).json({ message: "QuotaUse has been updated" });
    } catch (err) {
      next(err);
    }
  }

  static async licensesController(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const response = await License.findAll({
        where: {
          UserId: UserId,
        },
        include: [
          {
            model: Mountain,
          },
          {
            model: Quota,
          },
          {
            model: User,
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async weather(req, res, next) {
    try {
      const weather = [];
      const response1 = await axios.get(
        "https://bmkg-scrap.herokuapp.com/api/cuaca/jawabarat"
      );
      const response2 = await axios.get(
        "https://bmkg-scrap.herokuapp.com/api/cuaca/jawatengah"
      );
      const response3 = await axios.get(
        "https://bmkg-scrap.herokuapp.com/api/cuaca"
      );
      const response4 = await axios.get(
        "https://bmkg-scrap.herokuapp.com/api/cuaca/jawatimur"
      );
      const gedePangrango = response1.data.daftar_kota.find(
        (el) => el.nama_kota === "Cianjur"
      );
      const Merbabu = response2.data.daftar_kota.find(
        (el) => el.nama_kota === "Magelang"
      );
      const Slamet = response2.data.daftar_kota.find(
        (el) => el.nama_kota === "Purwokerto"
      );
      const Kerinci = response3.data.daftar_cuaca.find(
        (el) => el.namaKota === "Jambi"
      );
      const detailKerinci = {
        suhu: Kerinci.cuaca,
        kelembapan: Kerinci.suhu,
      };
      const Semeru = response4.data.daftar_kota.find(
        (el) => el.nama_kota === "Kota Malang"
      );
      weather.push({ name: "Gede Pangrango", data: gedePangrango });
      weather.push({ name: "Merbabu", data: Merbabu });
      weather.push({ name: "Slamet", data: Slamet });
      weather.push({ name: "Kerinci", data: detailKerinci });
      weather.push({ name: "Semeru", data: Semeru });
      res.status(200).json(weather);
    } catch (err) {
      next(err);
    }
  }

  static async midtransController(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });
      const { LicenseId } = req.params;
      const response = await License.findByPk(LicenseId, {
        include: [
          {
            model: Mountain,
          },
          {
            model: Quota,
          },
          {
            model: User,
          },
        ],
      });
      let parameter = {
        transaction_details: {
          order_id: response.id,
          gross_amount: response.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: response.User.name,
          last_name: "TEST",
          email: response.User.email,
          phone: response.User.phoneNumber,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        // console.log("transactionToken:", transactionToken);
        res.status(200).json(transaction);
      });
    } catch (err) {
      next(err);
    }
  }

  static async patchLicenseController(req, res, next) {
    try {
      const { LicenseId } = req.params;
      await License.update(
        {
          status: "Completed Payment",
        },
        {
          where: {
            id: LicenseId,
          },
        }
      );
      res.status(200).json({ message: "Success" });
    } catch (err) {
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const { credential } = req.body;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let access_token;
      let email = payload.email;

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        access_token = convertToToken({
          id: user.id,
          name: user.name,
          email: user.email,
        });

        res.status(200).json({
          statusCode: 200,
          data: {
            access_token,
            email: user.email,
            userId: user.id,
          },
        });
      } else {
        user = await User.create(
          {
            email,
            password: "Google Sign In",
            name: "Google User",
            phoneNumber: "Google Phone Number",
          },
          {
            hooks: false,
          }
        );
        access_token = convertToToken({
          id: user.id,
          name: user.name,
          email: user.email,
        });

        res.status(201).json({
          statusCode: 201,
          data: {
            access_token,
            email: user.email,
            userId: user.id,
          },
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteLicenses(req, res, next) {
    try {
      const { LicenseId } = req.params;
      const { id } = req.user;
      const findLicense = await License.findByPk(LicenseId);
      if (!findLicense) {
        throw { name: "LicenseNotFound" };
      }
      if (findLicense.UserId !== id) {
        throw { name: "Forbidden" };
      }
      await License.destroy({
        where: {
          id: LicenseId,
        },
      });
      res.status(200).json({ message: "Success Delete License" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
