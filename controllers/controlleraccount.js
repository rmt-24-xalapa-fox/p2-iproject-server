class ControllerAccount {
  static async login(req, res, next) {
    try {
      const {OAuth2Client} = require('google-auth-library');
      const client = new OAuth2Client(CLIENT_ID);
      const token = req.headers.credential

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // { iss, nbf, aud, sub, email, email_verified, azp, name, picture } = payload
      // console.log(payload);      
      // const userid = payload['sub'];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      let user = await User.findOne({
        attributes: ["id", "username", "role", "password"],
        where: {
          email: payload['email'],
          password: payload['sub'], 
          // just in case same email count as unique when using oauth
        }
      })

      if(!user){
        user = await User.create({          
          email: payload['email'],
          password: payload['sub'],
          username: payload['name'],
        },
        { hooks: false}
        )
      }

      const newtoken = convertToToken({
        id: user.id,
        email: user.email
      })

      res.status(200).json({
        access_token: newtoken,
      })      
      
    } catch (error) {
      // console.log("ERROR:", JSON.stringify(error,null,2));
      next(error)
    }
  }
}

module.exports = ControllerAccount