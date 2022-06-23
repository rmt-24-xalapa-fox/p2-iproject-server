const { comparePass } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { Staff } = require("../models/index");
const {OAuth2Client} = require('google-auth-library');
const { CLIENT_ID } = process.env

class StaffController{
    static async registerStaff(req, res, next){
        try {
            const { email, password, role } =
        req.body;
      // console.log(req.body);
      const createNewStaff = await User.create({
        email,
        password,
        role: "staff",
      });
      res.status(201).json({
        statusCode: 201,
        msg: "User has been created",
        data: {
          id: createNewStaff.id,
          email: createNewStaff.email,
        },
      });
        } catch (err) {
            console.log(err);
            next(err)
            
        }
    }

    static async loginStaff(req, res, next){
        try {
            const { email, password } = req.body;
      const staff = await Staff.findOne({
        where: {
          email: email,
        },
      });
      if (!staff) {
        throw new Error("Invalid email or password");
      }

      const validasi = comparePass(password, staff.password);

      if (!validasi) {
        throw new Error("Invalid email or password");
      }

      const payload = {
        email: staff.email,
        id: staff.id,
        role: staff.role,
      };

      const token = createToken(payload);

      res.status(200).json({
        msg: "Login succes",
        data: {
          token,
        },
      });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async loginByGoogle(req, res, next) {
      try {
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: req.headers.credential,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
  
        let email = payload.email;
        let access_token;
        let staff = await Staff.findOne({
          where: { email },
        });
  
        if (staff) {
          access_token = createToken({
            id: staff.id,
          });
  
          if (!user) {
            throw "Data not found";
          }
  
          res.status(200).json({
            access_token,
            email,
          });
        } else {
          let username = payload.name.split(" ").join(" ");
          let obj = {
            email,
            username,
            password: "google sign in",
            role: "staff",
          };
          staff = await Staff.create(obj, { hooks: false });
          access_token = createToken({
            id: staff.id,
          });
          res.status(201).json({
            access_token,
            email,
            message: "Success create account for " + staff.email,
          });
        }
      } catch (err) {
        next(err);
      }
    }
}

module.exports = StaffController