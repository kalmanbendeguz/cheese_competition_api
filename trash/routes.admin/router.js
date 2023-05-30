const passport = require("passport");

// authentication
const check_authenticated = require("../middlewares/authenticate/check_authenticated");
const check_not_authenticated = require("../middlewares/authenticate/check_not_authenticated");

// render
const render = require("../middlewares/render");

// registration
const validate_registration = require("../middlewares/registration/validate_registration");
const user_with_email_exists = require("../middlewares/registration/user_with_email_exists");
const is_email_allowed_to_register = require("../middlewares/registration/is_email_allowed_to_register");
const hash_password = require("../middlewares/registration/hash_password");
const generate_link = require("../middlewares/registration/generate_link");
const save_temporary_registration = require("../middlewares/registration/save_temporary_registration");
const send_verification_email = require("../middlewares/registration/send_verification_email");
const set_confirm_registration_email_sent_cookie = require("../middlewares/registration/set_confirm_registration_email_sent_cookie");

// confirm email
const check_link_valid = require("../middlewares/confirm_registration/check_link_valid");
const save_registered_user = require("../middlewares/confirm_registration/save_registered_user");
const delete_user_from_temporary_db = require("../middlewares/confirm_registration/delete_user_from_temporary_db");
const set_successful_registration_cookie = require("../middlewares/confirm_registration/set_successful_registration_cookie");

// login
const check_email_only_temporary = require("../middlewares/login/check_email_only_temporary");
const check_email_registered = require("../middlewares/login/check_email_registered");
const check_password_correct = require("../middlewares/login/check_password_correct");
const validate_login = require("../middlewares/login/validate_login");

// GET rate_cheese
const get_rating_sheet = require("../middlewares/rate_cheese/get/get_rating_sheet");
const get_cheese = require("../middlewares/rate_cheese/get/get_cheese");
const create_category_string = require("../middlewares/rate_cheese/get/create_category_string");
//const validate_secret_id = require('../middlewares/rate_cheese/get/validate_secret_id')
const uniformize_secret_id = require("../middlewares/rate_cheese/get/uniformize_secret_id");
const check_already_rated_get = require("../middlewares/rate_cheese/get/check_already_rated");

// POST rate_cheese
//const validate_rating = require('../middlewares/rate_cheese/post/validate_rating')
const create_rating_object = require("../middlewares/rate_cheese/post/create_rating_object");
const get_cheese_post = require("../middlewares/rate_cheese/post/get_cheese");
const get_rating_sheet_post = require("../middlewares/rate_cheese/post/get_rating_sheet");
const create_category_string_post = require("../middlewares/rate_cheese/post/create_category_string");
const save_temporary_rating = require("../middlewares/rate_cheese/post/save_temporary_rating");
const generate_confirm_rating_link = require("../middlewares/rate_cheese/post/generate_link");
const redirect_to_confirm_rating = require("../middlewares/rate_cheese/post/redirect_to_confirm_rating");
const check_already_rated = require("../middlewares/rate_cheese/post/check_already_rated");

// GET confirm_rating
const get_temporary_rating = require("../middlewares/confirm_rating/get/get_temporary_rating");
const check_temporary_rating_belongs_to_judge = require("../middlewares/confirm_rating/get/check_temporary_rating_belongs_to_judge");
const get_cheese_confirm_rating = require("../middlewares/confirm_rating/get/get_cheese");
const create_category_string_confirm_rating = require("../middlewares/confirm_rating/get/create_category_string");
const get_rating_sheet_confirm_rating = require("../middlewares/confirm_rating/get/get_rating_sheet");
const get_dictionary_confirm_rating = require("../middlewares/confirm_rating/get/get_dictionary");

// POST confirm_rating
const get_temporary_rating_post = require("../middlewares/confirm_rating/post/get_temporary_rating");
const save_rating = require("../middlewares/confirm_rating/post/save_rating");
const remove_temporary_rating = require("../middlewares/confirm_rating/post/remove_temporary_rating");
const check_already_rated_confirm_rating = require("../middlewares/confirm_rating/post/check_already_rated");
const set_successful_rating_cookie = require("../middlewares/confirm_rating/post/set_successful_rating_cookie");

// logout
const logout = require("../middlewares/logout/logout");

// POST forget_password
const check_email_registered_forget_password = require("../middlewares/forget_password/check_email_registered");
const generate_restore_id = require("../middlewares/forget_password/generate_restore_id");
const send_restore_password_email = require("../middlewares/forget_password/send_restore_password_email");
const save_password_reset = require("../middlewares/forget_password/save_password_reset");
const set_successful_restore_email_sent = require("../middlewares/forget_password/set_successful_restore_email_sent");

// GET restore_password
const check_restore_link_valid = require("../middlewares/restore_password/get/check_restore_link_valid");

// POST restore_password
const check_restore_id_valid = require("../middlewares/restore_password/post/check_restore_id_valid");
const check_user_exists = require("../middlewares/restore_password/post/check_user_exists");
const hash_restore_password = require("../middlewares/restore_password/post/hash_restore_password");
const save_restored_password = require("../middlewares/restore_password/post/save_restored_password");
const remove_active_password_reset = require("../middlewares/restore_password/post/remove_active_password_reset");
const set_successful_password_reset_cookie = require("../middlewares/restore_password/post/set_successful_password_reset_cookie");

// redirect
const redirect = require("../middlewares/redirect");

// message
const get_message_from_cookie = require("../middlewares/message/unauthenticated/get_message_from_cookie");
const check_message_unauthenticated = require("../middlewares/message/unauthenticated/check_message_unauthenticated");
const check_message_authenticated = require("../middlewares/message/authenticated/check_message_authenticated");

// general settings
const get_general_settings = require("../middlewares/settings/general/get_general_settings");
const save_general_settings = require("../middlewares/settings/general/save_general_settings");
const set_save_general_settings_successful_cookie = require("../middlewares/settings/general/set_save_general_settings_successful_cookie");

// password settings
const check_original_password_correct = require("../middlewares/settings/password/check_original_password_correct");
const hash_set_password = require("../middlewares/settings/password/hash_set_password");
const save_set_password = require("../middlewares/settings/password/save_set_password");
const set_save_password_settings_successful_cookie = require("../middlewares/settings/password/set_save_password_settings_successful_cookie");

// modify_rating
const get_rating_modify_rating = require("../middlewares/modify_rating/get_rating");
const check_temporary_rating_belongs_to_judge_modify_rating = require("../middlewares/modify_rating/check_temporary_rating_belongs_to_judge");
const get_cheese_modify_rating = require("../middlewares/modify_rating/get_cheese");
const get_rating_sheet_modify_rating = require("../middlewares/modify_rating/get_rating_sheet");
const get_judge_modify_rating = require("../middlewares/modify_rating/get_judge");
const modify_rating_object = require("../middlewares/modify_rating/modify_rating_object");
const save_modified_rating = require("../middlewares/modify_rating/save_modified_rating");
const set_modify_rating_successful_cookie = require("../middlewares/modify_rating/set_modify_rating_successful_cookie");
const redirect_to_view_ratings = require("../middlewares/modify_rating/redirect_to_view_ratings");
const get_cheese_modify_rating_post = require("../middlewares/modify_rating/get_cheese_post");
const get_rating_modify_rating_post = require("../middlewares/modify_rating/get_rating_post");
const get_number_of_pictures = require("../middlewares/modify_rating/get_number_of_pictures");
const multer_decode = require("../middlewares/modify_rating/multer_decode");
const save_modified_pictures = require("../middlewares/modify_rating/save_modified_pictures");

// log
const log_method_and_url = require("../middlewares/log_method_and_url");

// landing
const get_cheeses = require("../middlewares/landing/get/get_cheeses");

// results
const get_scores = require("../middlewares/results/get/get_scores");

// matrix
const get_judges = require("../middlewares/matrix/get/get_judges");
const get_ratings = require("../middlewares/matrix/get/get_ratings");
const do_magic = require("../middlewares/matrix/get/do_magic");

// generate id pairs
const export_id_pairs = require("../middlewares/export_id_pairs/export_id_pairs");

// cheeses
const get_hand_ins = require("../middlewares/cheeses/get_hand_ins");

// take_cheese
const take_cheese = require("../middlewares/take_cheese/take_cheese");
const generate_receipt = require("../middlewares/take_cheese/generate_receipt");
const get_cheese_take_cheese = require("../middlewares/take_cheese/get_cheese");

// view cheese
const get_cheese_view_cheese = require("../middlewares/view_cheese/get_cheese");

// edit_cheese
const get_cheese_get_edit_cheese = require("../middlewares/edit_cheese/get/get_cheese");
const check_cheese_belongs_to_user_get_edit_cheese = require("../middlewares/edit_cheese/get/check_cheese_belongs_to_user");
const load_product_tree_edit_cheese = require("../middlewares/edit_cheese/get/load_product_tree");
//const create_category_string = require('../middlewares/edit_cheese/get/create_category_string')
const get_cheese_post_edit_cheese = require("../middlewares/edit_cheese/post/get_cheese");
const check_cheese_belongs_to_user_post_edit_cheese = require("../middlewares/edit_cheese/post/check_cheese_belongs_to_user");
const save_modified_cheese = require("../middlewares/edit_cheese/post/save_modified_cheese");
const set_successful_edit_cookie = require("../middlewares/edit_cheese/post/set_successful_edit_cookie");
const create_category_array_edit_cheese = require("../middlewares/edit_cheese/post/create_category_array");
const modify_cheese = require("../middlewares/edit_cheese/post/modify_cheese");

// view ratings
const get_cheese_view_ratings = require("../middlewares/view_ratings/get_cheese");
const get_ratings_of_cheese = require("../middlewares/view_ratings/get_ratings_of_cheese");
const get_judges_of_ratings = require("../middlewares/view_ratings/get_judges_of_ratings");
const get_rating_pictures_view_ratings = require("../middlewares/view_ratings/get_rating_pictures_view_ratings");

// view rating
const get_cheese_view_rating = require("../middlewares/view_rating/get/get_cheese");
const create_category_string_view_rating = require("../middlewares/view_rating/get/create_category_string");
const get_rating_sheet_view_rating = require("../middlewares/view_rating/get/get_rating_sheet");
const get_dictionary_view_rating = require("../middlewares/view_rating/get/get_dictionary");
const get_rating = require("../middlewares/view_rating/get/get_rating");
const get_rating_pictures_view_rating = require("../middlewares/view_rating/get_rating_pictures_view_rating");

// redirect to referer
const redirect_to_referer = require("../middlewares/redirect_to_referer");

// delete rating
const delete_rating = require("../middlewares/delete_rating/delete_rating");
const remove_rating_pictures = require("../middlewares/delete_rating/remove_rating_pictures");

// delete_cheese
const remove_cheese = require("../middlewares/remove_cheese/remove_cheese");

// download_certificates
const generate_certificates = require("../middlewares/download_certificates/generate_certificates");
const filter_certificated_cheeses = require("../middlewares/download_certificates/filter_certificated_cheeses");

// receipt settings
const get_receipt_settings = require("../middlewares/settings/receipt/get_receipt_settings");
const save_receipt_settings = require("../middlewares/settings/receipt/save_receipt_settings");

// open entry
const set_entry_opened = require("../middlewares/open_entry/set_entry_opened");

// close entry
const set_entry_closed = require("../middlewares/close_entry/set_entry_closed");

// coordination
const get_coordination_state = require("../middlewares/coordination/get_coordination_state");

// send rating summary emails
const send_rating_summary_emails = require("../middlewares/send_rating_summary_emails/send_rating_summary_emails");
const get_ratings_of_cheeses = require("../middlewares/send_rating_summary_emails/get_ratings_of_cheeses");
const filter_not_a_number_cheeses = require("../middlewares/send_rating_summary_emails/filter_not_a_number_cheeses");

// download_announcement
const categorize_cheeses = require("../middlewares/download_announcement/categorize_cheeses");
const generate_announcement = require("../middlewares/download_announcement/generate_announcement");

// open/close competition
const set_competition_opened = require("../middlewares/open_competition/set_competition_opened");
const set_competition_closed = require("../middlewares/close_competition/set_competition_closed");

// judges
const get_allowed_judges = require("../middlewares/judges/get_allowed_judges");
const get_registered_allowed_judges = require("../middlewares/judges/get_registered_allowed_judges");
const get_table_leader_array_from_body = require("../middlewares/judges/get_table_leader_array_from_body");
const set_table_leaders = require("../middlewares/judges/set_table_leaders");
const set_table_leaders_success_cookie = require("../middlewares/judges/set_table_leaders_success_cookie");
const get_table_arrived_array_from_body = require("../middlewares/judges/get_table_arrived_array_from_body");
const set_table_arrived = require("../middlewares/judges/set_table_arrived");
const set_table_arrived_success_cookie = require("../middlewares/judges/set_table_arrived_success_cookie");

// add allowed judge
const add_allowed_judge = require("../middlewares/add_allowed_judge/add_allowed_judge");
const set_allowed_judge_added_success_cookie = require("../middlewares/add_allowed_judge/set_allowed_judge_added_success_cookie");

// add allowed admin
const add_allowed_admin = require("../middlewares/add_allowed_admin/add_allowed_admin");
const set_allowed_admin_added_success_cookie = require("../middlewares/add_allowed_admin/set_allowed_admin_added_success_cookie");

// admins
const get_allowed_admins = require("../middlewares/admins/get_allowed_admins");
const get_admins = require("../middlewares/admins/get_admins");
const get_registered_allowed_admins = require("../middlewares/admins/get_registered_allowed_admins");

// users
const get_users = require("../middlewares/users/get_users");
const get_registered_cheese_numbers = require("../middlewares/users/get_registered_cheese_numbers");

// take_cheese_email
const send_cheese_taken_email = require("../middlewares/take_cheese_email/send_cheese_taken_email");

// reset competition
const check_entry_closed = require("../middlewares/reset_competition/check_entry_closed");
const check_competition_closed = require("../middlewares/reset_competition/check_competition_closed");
const archive_collections = require("../middlewares/reset_competition/archive_collections");
const set_reset_competition_successful_cookie = require("../middlewares/reset_competition/set_reset_competition_successful_cookie");

// archive/cheeses
const get_archived_cheeses = require("../middlewares/cheeses_archive/get_archived_cheeses");
const get_archived_hand_ins = require("../middlewares/cheeses_archive/get_archived_hand_ins");

// archive/results
const get_archived_scores = require("../middlewares/results_archive/get_archived_scores");

// view_archived_cheese
const get_archived_cheese = require("../middlewares/view_archived_cheese/get_archived_cheese");

// view_archived_ratings
const get_archived_cheese_view_archived_ratings = require("../middlewares/view_archived_ratings/get_archived_cheese_view_archived_ratings");
const get_archived_ratings_of_archived_cheese = require("../middlewares/view_archived_ratings/get_archived_ratings_of_archived_cheese");
const get_judges_of_archived_ratings = require("../middlewares/view_archived_ratings/get_judges_of_archived_ratings");
const get_rating_pictures_view_archived_ratings = require("../middlewares/view_archived_ratings/get_rating_pictures_view_archived_ratings");

// view archived rating
const get_archived_rating = require("../middlewares/view_archived_rating/get_archived_rating");
const get_archived_cheese_view_archived_rating = require("../middlewares/view_archived_rating/get_archived_cheese_view_archived_rating");
const create_category_string_view_archived_rating = require("../middlewares/view_archived_rating/create_category_string_view_archived_rating");
const get_rating_sheet_view_archived_rating = require("../middlewares/view_archived_rating/get_rating_sheet_view_archived_rating");
const get_dictionary_view_archived_rating = require("../middlewares/view_archived_rating/get_dictionary_view_archived_rating");
const get_rating_pictures_view_archived_rating = require("../middlewares/view_archived_rating/get_rating_pictures_view_archived_rating");

// archive/users
const get_registered_archived_cheese_numbers = require("../middlewares/users_archive/get_registered_archived_cheese_numbers");

// cheeses_export_detailed_table
const cheeses_export_detailed_table = require("../middlewares/cheeses_export_detailed_table/cheeses_export_detailed_table");
const get_users_of_cheeses = require("../middlewares/cheeses_export_detailed_table/get_users_of_cheeses");

// association_members
const get_association_member_array_from_body = require("../middlewares/association_members/get_association_member_array_from_body");
const set_association_members = require("../middlewares/association_members/set_association_members");
const set_association_members_set_success_cookie = require("../middlewares/association_members/set_association_members_set_success_cookie");

// cheeses_export_cheese_numbers_by_counties_table
const cheeses_export_cheese_numbers_by_counties_table = require("../middlewares/cheeses_export_cheese_numbers_by_counties_table/cheeses_export_cheese_numbers_by_counties_table");

// view results
const get_medals = require("../middlewares/view_results/get_medals");

// export results
const export_results = require("../middlewares/export_results/export_results");
const get_geolocations = require("../middlewares/export_results/get_geolocations");

// export results by counties
const export_results_by_counties_table = require("../middlewares/export_results_by_counties_table/export_results_by_counties_table");

// export archived_cheeses detailed table
const archived_cheeses_export_detailed_table = require("../middlewares/archived_cheeses_export_detailed_table/archived_cheeses_export_detailed_table");

// archived_cheeses_export_cheese_numbers_by_counties_table
const archived_cheeses_export_cheese_numbers_by_counties_table = require("../middlewares/archived_cheeses_export_cheese_numbers_by_counties_table/archived_cheeses_export_cheese_numbers_by_counties_table");

// export archived results
const export_archived_results = require("../middlewares/export_archived_results/export_archived_results");

// export_archived_results_by_counties_table
const export_archived_results_by_counties_table = require("../middlewares/export_archived_results_by_counties_table/export_archived_results_by_counties_table");

// unpaid_cheeses
const get_unpaid_cheeses = require("../middlewares/unpaid_cheeses/get_unpaid_cheeses");

// view unpaid cheese
const get_cheese_view_unpaid_cheese = require("../middlewares/view_unpaid_cheese/get_unpaid_cheese");

// export_4x10_stickers
const export_4x10_stickers = require("../middlewares/export_4x10_stickers/export_4x10_stickers");

// rating_pictures
const get_rating_pictures = require("../middlewares/rating_pictures/get_rating_pictures");
const send_rating_picture = require("../middlewares/rating_pictures/send_rating_picture");

const set_routes = function (app) {
  app.use(log_method_and_url());

  /*app.post('/association_members',
    check_authenticated(),
    get_association_member_array_from_body(),
    set_association_members(),
    set_association_members_set_success_cookie(),
    redirect('/association_members')
)*/

  app.get(
    "/rating_pictures",
    check_authenticated(),
    get_rating_pictures(),
    send_rating_picture()
  );

  app.post(
    "/judges",
    check_authenticated(),
    get_table_leader_array_from_body(),
    set_table_leaders(),
    get_table_arrived_array_from_body(),
    set_table_arrived(),
    set_table_leaders_success_cookie(),
    set_table_arrived_success_cookie(),
    redirect("/judges")
  );

  app.get(
    "/export_4x10_stickers",
    check_authenticated(),
    //get_cheese_take_cheese(),
    //take_cheese(),
    export_4x10_stickers() //,
    //export_id_pairs()//,
    //redirect('/cheeses')
  );

  app.get(
    "/view_unpaid_cheese",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheese_view_unpaid_cheese(),
    render("view_unpaid_cheese")
  );

  app.get(
    "/unpaid_cheeses",
    check_authenticated(),
    get_message_from_cookie(),
    get_unpaid_cheeses(),
    render("unpaid_cheeses")
  );

  app.get(
    "/export_archived_results_by_counties_table",
    check_authenticated(),
    get_archived_cheeses(),
    get_archived_scores(),
    get_medals(),
    get_users_of_cheeses(),
    export_archived_results_by_counties_table()
  );

  app.get(
    "/export_archived_results",
    check_authenticated(),
    get_archived_cheeses(),
    get_archived_scores(),
    get_medals(),
    get_users_of_cheeses(),
    get_geolocations(),
    export_archived_results() //,
    //redirect('/cheeses')
  );

  app.get(
    "/archived_cheeses_export_cheese_numbers_by_counties_table",
    check_authenticated(),
    get_archived_cheeses(),
    get_users_of_cheeses(),
    archived_cheeses_export_cheese_numbers_by_counties_table()
  );

  app.get(
    "/archived_cheeses_export_detailed_table",
    check_authenticated(),
    get_archived_cheeses(),
    get_users_of_cheeses(),
    archived_cheeses_export_detailed_table()
  );

  app.get(
    "/export_results_by_counties_table",
    check_authenticated(),
    get_cheeses(),
    get_scores(),
    get_medals(),
    get_users_of_cheeses(),
    export_results_by_counties_table()
  );

  app.get(
    "/cheeses_export_cheese_numbers_by_counties_table",
    check_authenticated(),
    get_cheeses(),
    get_users_of_cheeses(),
    cheeses_export_cheese_numbers_by_counties_table()
  );

  app.post(
    "/association_members",
    check_authenticated(),
    get_association_member_array_from_body(),
    set_association_members(),
    set_association_members_set_success_cookie(),
    redirect("/association_members")
  );

  app.get(
    "/association_members",
    check_authenticated(),
    get_message_from_cookie(),
    get_users(),
    render("association_members")
  );

  app.get(
    "/cheeses_export_detailed_table",
    check_authenticated(),
    get_cheeses(),
    get_users_of_cheeses(),
    cheeses_export_detailed_table()
  );

  app.get(
    "/archive/users",
    check_authenticated(),
    get_message_from_cookie(),
    get_users(),
    get_registered_archived_cheese_numbers(),
    render("users_archive")
  );

  app.get(
    "/view_archived_rating",
    check_authenticated(),
    get_message_from_cookie(),
    get_archived_rating(),
    get_rating_pictures_view_archived_rating(),
    get_archived_cheese_view_archived_rating(),
    create_category_string_view_archived_rating(),
    get_rating_sheet_view_archived_rating(),
    get_dictionary_view_archived_rating(),
    render("view_archived_rating")
  );

  app.get(
    "/view_archived_ratings",
    check_authenticated(),
    get_message_from_cookie(),
    get_archived_cheese_view_archived_ratings(),
    get_archived_ratings_of_archived_cheese(),
    get_rating_pictures_view_archived_ratings(),
    get_judges_of_archived_ratings(),
    render("view_archived_ratings")
  );

  app.get(
    "/archive/results",
    check_authenticated(),
    get_message_from_cookie(),
    get_archived_cheeses(),
    get_archived_scores(),
    render("results_archive")
  );

  app.get(
    "/view_archived_cheese",
    check_authenticated(),
    get_message_from_cookie(),
    get_archived_cheese(),
    render("view_archived_cheese")
  );

  app.get(
    "/archive/cheeses",
    check_authenticated(),
    get_message_from_cookie(),
    get_archived_cheeses(),
    get_archived_hand_ins(),
    render("cheeses_archive")
  );

  app.get(
    "/archive",
    check_authenticated(),
    get_message_from_cookie(),
    render("archive")
  );

  app.get(
    "/reset_competition",
    check_authenticated(),
    check_entry_closed(),
    check_competition_closed(),
    archive_collections(),
    set_reset_competition_successful_cookie(),
    redirect("/coordination")
  );

  app.get(
    "/take_cheese_email",
    check_authenticated(),
    get_cheese_take_cheese(),
    take_cheese(),
    send_cheese_taken_email(),
    //generate_receipt()//,
    redirect("/cheeses")
  );

  app.post(
    "/modify_rating",
    check_authenticated(),
    get_message_from_cookie(),

    multer_decode(),

    // kivesszük
    get_rating_modify_rating_post(),

    // módosítjuk
    get_cheese_modify_rating_post(),
    create_category_string(),
    get_rating_sheet_modify_rating(),
    modify_rating_object(),

    // elmentjük
    save_modified_rating(),
    save_modified_pictures(),

    set_modify_rating_successful_cookie(),
    redirect_to_view_ratings()
  );

  app.get(
    "/modify_rating",
    check_authenticated(),
    get_message_from_cookie(),
    get_rating_modify_rating(),
    get_cheese_modify_rating(),
    get_judge_modify_rating(),
    create_category_string(),
    get_rating_sheet_modify_rating(),
    get_number_of_pictures(),
    render("modify_rating")
  );

  app.get(
    "/users",
    check_authenticated(),
    get_message_from_cookie(),
    get_users(),
    get_registered_cheese_numbers(),
    render("users")
  );

  app.get(
    "/admins",
    check_authenticated(),
    get_message_from_cookie(),
    get_allowed_admins(),
    get_admins(),
    get_registered_allowed_admins(),
    render("admins")
  );

  app.post(
    "/add_allowed_admin",
    check_authenticated(),
    add_allowed_admin(),
    set_allowed_admin_added_success_cookie(),
    redirect("admins")
  );

  app.post(
    "/add_allowed_judge",
    check_authenticated(),
    add_allowed_judge(),
    set_allowed_judge_added_success_cookie(),
    redirect("judges")
  );

  app.get(
    "/judges",
    check_authenticated(),
    get_message_from_cookie(),
    get_allowed_judges(),
    get_judges(),
    get_registered_allowed_judges(),
    render("judges")
  );

  app.get(
    "/close_competition",
    check_authenticated(),
    set_competition_closed(),
    redirect("/coordination")
  );

  app.get(
    "/open_competition",
    check_authenticated(),
    set_competition_opened(),
    redirect("/coordination")
  );

  app.get(
    "/download_announcement",
    check_authenticated(),
    get_cheeses(),
    get_scores(),
    filter_certificated_cheeses(),
    categorize_cheeses(),
    generate_announcement()
  );

  app.get(
    "/send_rating_summary_emails",
    check_authenticated(),
    get_cheeses(),
    get_ratings_of_cheeses(),
    filter_not_a_number_cheeses(),
    send_rating_summary_emails(),
    redirect_to_referer()
  );

  app.get(
    "/close_entry",
    check_authenticated(),
    set_entry_closed(),
    redirect("/coordination")
  );

  app.get(
    "/open_entry",
    check_authenticated(),
    set_entry_opened(),
    redirect("/coordination")
  );

  app.get(
    "/coordination",
    check_authenticated(),
    get_message_from_cookie(),
    get_coordination_state(),
    render("coordination")
  );
  //
  app.post(
    "/settings/receipt",
    check_authenticated(),
    get_receipt_settings(),
    save_receipt_settings(),
    redirect("/settings/receipt")
  );

  app.get(
    "/settings/receipt",
    check_authenticated(),
    get_message_from_cookie(),
    get_receipt_settings(),
    render("settings_receipt")
  );

  app.get(
    "/download_certificates",
    check_authenticated(),
    get_cheeses(),
    get_scores(),
    filter_certificated_cheeses(),
    generate_certificates()
  );

  app.get(
    "/announcement_of_results",
    check_authenticated(),
    get_message_from_cookie(),
    render("announcement_of_results")
  );

  app.get(
    "/delete_cheese",
    check_authenticated(),
    remove_cheese(),
    // set_cookie: egységes MW legyen!
    redirect_to_referer()
  );

  app.get(
    "/delete_rating",
    check_authenticated(),
    get_rating(),
    delete_rating(),
    remove_rating_pictures(),
    redirect_to_referer()
  );

  app.get(
    "/view_rating",
    check_authenticated(),
    get_message_from_cookie(),
    get_rating(),
    get_rating_pictures_view_rating(),
    get_cheese_view_rating(),
    create_category_string_view_rating(),
    get_rating_sheet_view_rating(),
    get_dictionary_view_rating(),
    render("view_rating")
  );

  app.get(
    "/view_ratings",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheese_view_ratings(),
    get_ratings_of_cheese(),
    get_rating_pictures_view_ratings(),
    get_judges_of_ratings(),
    render("view_ratings")
  );

  app.get(
    "/view_results",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheeses(),
    get_scores(),
    get_medals(),
    render("view_results")
  );

  app.post(
    "/edit_cheese",
    check_authenticated(),
    get_cheese_post_edit_cheese(),
    //check_cheese_belongs_to_user_post_edit_cheese(),
    create_category_array_edit_cheese(),
    modify_cheese(),
    save_modified_cheese(),
    set_successful_edit_cookie(),
    redirect("/cheeses")
  );

  app.get(
    "/edit_cheese",
    check_authenticated(),
    get_message_from_cookie(),
    //validate_get_edit_cheese(),
    get_cheese_get_edit_cheese(),
    create_category_string(),
    load_product_tree_edit_cheese(),
    render("edit_cheese")
  );

  app.get(
    "/view_cheese",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheese_view_cheese(),
    //check_view_cheese_belongs_to_user(),
    render("view_cheese")
  );

  app.get(
    "/take_cheese",
    check_authenticated(),
    get_cheese_take_cheese(),
    take_cheese(),
    generate_receipt() //,
    //redirect('/cheeses')
  );

  app.get(
    "/export_id_pairs",
    check_authenticated(),
    export_id_pairs() //,
    //redirect('/cheeses')
  );

  app.get(
    "/export_results",
    check_authenticated(),
    get_cheeses(),
    get_scores(),
    get_medals(),
    get_users_of_cheeses(),
    get_geolocations(),
    export_results() //,
    //redirect('/cheeses')
  );

  app.get(
    "/matrix",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheeses(),
    get_judges(),
    get_ratings(),
    do_magic(),
    render("matrix")
  );

  app.get(
    "/results",
    check_authenticated(),
    get_message_from_cookie(),
    render("results")
  );

  app.get(
    "/cheeses",
    check_authenticated(),
    get_message_from_cookie(),
    get_cheeses(),
    get_hand_ins(),
    render("cheeses")
  );

  /*app.get('/modify_rating',
    check_authenticated(),
    get_message_from_cookie(),
    //validate(), //kell
    get_temporary_rating_modify_rating(),
    check_temporary_rating_belongs_to_judge_modify_rating(),
    get_cheese_modify_rating(),
    create_category_string(),
    get_rating_sheet_modify_rating(),
    render('modify_rating')
)*/

  app.post(
    "/settings/password",
    check_authenticated(),
    //validatePasswordSettings(),
    check_original_password_correct(),
    hash_set_password(),
    save_set_password(),
    set_save_password_settings_successful_cookie(),
    redirect("/settings/password")
  );

  app.get(
    "/settings/password",
    check_authenticated(),
    get_message_from_cookie(),
    render("settings_password")
  );

  /*app.post('/settings/general',
    check_authenticated(),
    //validate_general_settings(),
    save_general_settings(),
    set_save_general_settings_successful_cookie(),
    redirect('/settings/general')
)*/

  /*app.get('/settings/general',
    check_authenticated(),
    get_message_from_cookie(),
    get_general_settings(),
    render('settings_general')
)*/

  app.get(
    "/settings",
    check_authenticated(),
    get_message_from_cookie(),
    render("settings")
  );

  app.get(
    "/landing",
    check_authenticated(),
    get_message_from_cookie(),
    render("landing")
  );

  app.get(
    "/authenticated_message",
    check_message_authenticated(),
    get_message_from_cookie(),
    render("authenticated_message")
  );

  app.get(
    "/unauthenticated_message",
    check_message_unauthenticated(),
    get_message_from_cookie(),
    render("unauthenticated_message")
  );

  app.post(
    "/restore_password",
    //validateRestorePassword(),
    check_restore_id_valid(),
    check_user_exists(),
    hash_restore_password(),
    save_restored_password(),
    remove_active_password_reset(),
    set_successful_password_reset_cookie(),
    redirect("/")
  );

  app.get(
    "/restore_password",
    get_message_from_cookie(),
    check_restore_link_valid(),
    render("restore_password")
  );

  app.post(
    "/forget_password",
    check_email_registered_forget_password(),
    generate_restore_id(),
    send_restore_password_email(),
    save_password_reset(),
    set_successful_restore_email_sent(),
    render("forget_password")
  );

  app.get("/logout", check_authenticated(), logout());

  /*app.post('/confirm_rating',
    check_authenticated(),
    get_temporary_rating_post(),
    check_already_rated_confirm_rating(),
    save_rating(),
    remove_temporary_rating(),
    set_successful_rating_cookie(),
    redirect('/')
)*/

  /*app.get('/confirm_rating',
    check_authenticated(),
    get_message_from_cookie(),
    get_temporary_rating(),
    check_temporary_rating_belongs_to_judge(),
    get_cheese_confirm_rating(),
    create_category_string_confirm_rating(),
    get_rating_sheet_confirm_rating(),
    get_dictionary_confirm_rating(),
    render('confirm_rating')
)*/

  /*app.post('/rate_cheese',
    check_authenticated(),
    //validate_rating(),
    check_already_rated(),
    get_cheese_post(),
    create_category_string_post(),
    get_rating_sheet_post(),
    create_rating_object(),
    generate_confirm_rating_link(),
    save_temporary_rating(),
    redirect_to_confirm_rating()
)*/

  /*app.get('/rate_cheese',
    check_authenticated(),
    get_message_from_cookie(),
    //validate_secret_id(),
    uniformize_secret_id(),
    get_cheese(),
    check_already_rated_get(),
    create_category_string(),
    get_rating_sheet(),
    render('rate_cheese')
)*/

  app.post(
    "/login",
    validate_login(),
    check_email_only_temporary(),
    check_email_registered(),
    check_password_correct(),
    passport.authenticate("local", { successRedirect: "/" })
  );

  app.get(
    "/confirm_registration",
    check_link_valid(),
    save_registered_user(),
    delete_user_from_temporary_db(),
    set_successful_registration_cookie(),
    redirect("/login")
  );

  app.post(
    "/registration",
    validate_registration(),
    user_with_email_exists(),
    is_email_allowed_to_register(),
    hash_password(),
    generate_link(),
    save_temporary_registration(),
    send_verification_email(),
    set_confirm_registration_email_sent_cookie(),
    redirect("/unauthenticated_message")
  );

  app.get(
    "/forget_password",
    check_not_authenticated(),
    get_message_from_cookie(),
    render("forget_password")
  );

  app.get(
    "/registration",
    check_not_authenticated(),
    get_message_from_cookie(),
    render("registration")
  );

  app.get(
    "/login",
    check_not_authenticated(),
    get_message_from_cookie(),
    render("login")
  );

  app.get("/", check_authenticated(), redirect("/landing"));
};

module.exports = set_routes;
