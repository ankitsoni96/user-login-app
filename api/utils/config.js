module.exports = (function () {
    let data = {
      JWTSecretKey: "L9T#Slsj!poqS1#o08MnbA#$iBU*VY5EUe^&xY",
      default_auth_token: "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#USERLOGINSYSTEM",
      refresh_token: "USERjmLVF6G9AaryLOGINpa9y5AhG3JpwQXanNSYSTEMRWBgaaTfU3d",
      secretKey:"afdvrvOVH6sdmpNWjFGRTYHGYFRRIqCc7rdxs01lwHzfr3",
    }
    if (process.env.NODE_ENV === "production") {
      data.db = {
        url:"mongodb+srv://mongo:root@cluster0.xopxo.mongodb.net/user-app",
        database:"user-system"
      }
      data.host = "localhost"
      data.port = 8443
      data.passwordSalt = "WRCVSVTE56V6WC3567RTFGTU76VB45VVC567JGYBDBCE54657F34CXBHGJGK"
    } else {
        // LOCAL
      data.db = {
        url:"mongodb+srv://mongo:root@cluster0.xopxo.mongodb.net/user-app"
      }
      data.host = "localhost"
      data.port = 8443
    }
    return data;
  })();
  