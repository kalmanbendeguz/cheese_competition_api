const express = require("express");
const router = express.Router();
const error_middleware = require("../middlewares/common/error");

const all_paths_router = require("./all_paths");
router.use(all_paths_router);

const base_router = require("./base");
router.use("/", base_router);

const set_language_router = require("./set_language");
router.use("/set_language", set_language_router);

const message_authenticated_router = require("./message_authenticated");
router.use("/message_authenticated", message_authenticated_router);

const message_unauthenticated_router = require("./message_unauthenticated");
router.use("/message_unauthenticated", message_unauthenticated_router);

const login_router = require("./login");
router.use("/login", login_router);

const logout_router = require("./logout");
router.use("/logout", logout_router);

const registration_router = require("./registration");
router.use("/registration", registration_router);

const confirm_registration_router = require("./confirm_registration");
router.use("/confirm_registration", confirm_registration_router);

const privacy_policy_router = require("./privacy_policy");
router.use("/privacy_policy", privacy_policy_router);

const forget_password_router = require("./forget_password");
router.use("/forget_password", forget_password_router);

const restore_password_router = require("./restore_password");
router.use("/restore_password", restore_password_router);

const landing_router = require("./landing");
router.use("/landing", landing_router);

const rate_cheese_router = require("./rate_cheese");
router.use("/rate_cheese", rate_cheese_router);

const confirm_rating_router = require("./confirm_rating");
router.use("/confirm_rating", confirm_rating_router);

const modify_rating_router = require("./modify_rating");
router.use("/modify_rating", modify_rating_router);

const view_rating_router = require("./view_rating");
router.use("/view_rating", view_rating_router);

const settings_router = require("./settings");
router.use("/settings", settings_router);

const send_feedback_router = require("./send_feedback");
router.use("/send_feedback", send_feedback_router);

const archive_router = require("./archive");
router.use("/archive", archive_router);

const view_archived_rating_router = require("./view_archived_rating");
router.use("/view_archived_rating", view_archived_rating_router);

const rating_pictures_router = require("./rating_pictures");
router.use("/rating_pictures", rating_pictures_router);

const static_router = require("./static");
router.use("/static", static_router);

const default_router = require("./default");
router.use(default_router);

router.use(error_middleware());

module.exports = router;
