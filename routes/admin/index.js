const express = require('express');
const router = express.Router();
const AdminController = require("../../controllers/admin/");
const admin = new AdminController;


/**
 * @api {post} /admin/login login
 * @apiName login
 * @apiGroup admin
 * @apiBody {String} [email]
 * @apiBody {String} [password]
 */
router.post("/login", admin.loginAdmin);

/**
 * @api {post} /admin/create create
 * @apiGroup admin
 * @apiName create
 * @apiBody {String} [email]
 * @apiBody {String} [password]
 * @apiHeader {String} Authorization
 */
router.post("/create", admin.createAdmin);

/**
 * @api {get} /admin/fetch fetch
 * @apiGroup admin
 * @apiName fetch
 * @apiHeader {String} Authorization
 */
router.get("/fetch", admin.fetchListAdmin);

/**
 * @api {put} /admin/change-password change-password
 * @apiGroup admin
 * @apiName change-password
 * @apiBody {String} [oldPassword]
 * @apiBody {String} [newPassword]
 * @apiHeader {String} Authorization
 */
router.put("/change-password", admin.changePassword);

/**
 * @api {put} /admin/set-type-admin set-type-admin
 * @apiGroup admin
 * @apiName set-type-admin
 * @apiBody {String} [email]
 * @apiBody {Number} [typeAdmin] DefaultValues = 1 0-moderator 1- admin, 2- editor, 3-*moderator ask documentation
 * @apiHeader {String} [Authorization]
 */
router.put('/set-type-admin', admin.setTypeAdmin)

/**
 * @api {put} /admin/set-permission set-permission
 * @apiGroup admin
 * @apiName set-permission
 * @apiBody {String} [email]
 * @apiBody {Boolean} create_read_only DefaultValues=false
 * @apiBody {Boolean} create_update DefaultValues=false
 * @apiBody {Boolean} remove_read_only DefaultValues=false
 * @apiBody {Boolean} remove_update DefaultValues=false
 * @apiBody {Boolean} setting_read_only DefaultValues=false
 * @apiBody {Boolean} setting_update DefaultValues=false
 * @apiBody {Boolean} token_read_only DefaultValues=false
 * @apiBody {Boolean} token_update DefaultValues=false
 * @apiHeader {String} [Authorization]
 */
router.put('/set-permission', admin.setPermissionParams)

/**
 * @api {put} /admin/set-wallet-admin set-wallet-admin
 * @apiGroup admin
 * @apiName set-wallet-admin
 * @apiBody {String} [email]
 * @apiBody {String} [wallet]
 * @apiHeader {String} [Authorization]
 */
router.put('/set-wallet-admin', admin.setWalletAdmin)


module.exports = router;