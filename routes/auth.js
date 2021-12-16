const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.js");
const auth = new AuthController;
/**
  @api {post} /api/auth/createToken Create Token
  @apiGroup auth
  @apiName createToken
  @apiHeader {String} auth
  @apiBody {String} invoice ="0x33295b5De6e00d45f68a3a7712cb16940bFebEfE"
  @apiSuccess {String} token
  @apiSuccess {String} tokenRefresh
  @apiSuccess {Number} exp
  @apiSuccess {Number} wallet_id
*/
router.post("/createToken", auth.createToken);

/**
  @api {post} /api/auth/refreshToken Refresh token
  @apiGroup auth
  @apiName refreshToken
  @apiHeader {String} Authorization
  @apiHeaderExample {json} Header-Example:
 {"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZvaWNlIjoiMHgzMzI......"}
 */
router.post("/refreshToken", auth.refreshToken);


module.exports = router;