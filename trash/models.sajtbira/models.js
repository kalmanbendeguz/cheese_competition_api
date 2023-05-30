let models = {};

models.allowed_judge = require("./Allowed_Judge");
models.archived_cheese = require("./Archived_Cheese");
models.archived_rating = require("./Archived_Rating");
models.archived_rating_picture = require("./Archived_Rating_Picture");
models.cheese = require("./Cheese");
models.hand_in = require("./Hand_In");
models.judge_active_password_reset = require("./Judge_Active_Password_Reset");
models.judge_temporary_registration = require("./Judge_Temporary_Registration");
models.judge_user = require("./Judge_User");
models.key_value = require("./Key_Value");
models.rating_picture = require("./Rating_Picture");
models.rating = require("./Rating");
models.temporary_rating = require("./Temporary_Rating");
models.temporary_rating_picture = require("./Temporary_Rating_Picture");

module.exports = models;
