const { User, Mountain, Quota, License } = require("../models");
const { bcryptCheckPass } = require("../helpers/bcrypt");
const { convertToToken } = require("../helpers/jwt");
class Controller {
  static async registerController(req, res, next) {
    try {
      const { email, name, password, phoneNumber, numberOfClimbers } = req.body;
      const createdUser = await User.create({
        email,
        name,
        password,
        phoneNumber,
        numberOfClimbers,
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
      const { MountainId } = req.params;
      const findMountain = await Mountain.findByPk(MountainId);
      if (!findMountain) {
        throw { name: "MountainNotFound" };
      }
      const { numberOfClimbers, totalPrice, QuotaId } = req.body;
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
      const { QuotaId, QuotaUse } = req.params;
      let quotaData = 0;
      const findQuota = await Quota.findByPk(QuotaId);
      if (!findQuota) {
        throw { name: "QuotaNotFound" };
      }
      quotaData = findQuota.quotaUse;
      await Quota.update(
        {
          quotaUse: quotaData + +QuotaUse,
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
}

module.exports = Controller;
