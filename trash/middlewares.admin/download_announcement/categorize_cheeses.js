const categorize_cheeses = function () {
  const dictionary = require("../../static/dictionary");

  return function (req, res, next) {
    console.log("categorize_cheeses");

    for (let cheese of res.locals.cheeses) {
      cheese.category_string = create_category_string(
        cheese.product_category_list
      );
      cheese.qualification_string = get_qualification_string_by_score(
        cheese.average_score
      );
    }

    res.locals.cheeses.sort((a, b) =>
      a.category_string.localeCompare(b.category_string)
    );

    let category_strings_with_duplicates = res.locals.cheeses.map(
      (a) => a.category_string
    );

    res.locals.category_strings = [
      ...new Set(category_strings_with_duplicates),
    ];

    res.locals.results_by_categories = res.locals.category_strings.map(
      (category_string) => {
        let category_object = {};
        category_object.category_array = create_category_array(category_string);
        category_object.category_translated = translate_category_array(
          category_object.category_array
        );
        category_object.cheeses = res.locals.cheeses.filter(
          (cheese) => cheese.category_string === category_string
        );
        category_object.cheeses.sort(
          (a, b) => a.average_score - b.average_score
        );
        return category_object;
      }
    );

    //const util = require('util')
    //console.log(util.inspect(results, {showHidden: false, depth: null, colors: true}))

    return next();
  };

  function translate_category_array(product_category_list) {
    let category_string = "";
    product_category_list.forEach((category) => {
      category_string += dictionary[category];
      category_string += " / ";
    });

    category_string = category_string.slice(0, -3);
    return category_string;
  }

  function create_category_string(product_category_list) {
    let category_string = "";
    product_category_list.forEach((category) => {
      category_string += category;
      category_string += "-";
    });

    category_string = category_string.slice(0, -1);
    return category_string;
  }

  function create_category_array(product_category_list) {
    let category_array = product_category_list.split("-");
    return category_array;
  }

  function get_qualification_string_by_score(score) {
    let qualification = "-";

    if (score <= 100 && score >= 94.5) {
      qualification = "ARANY";
    } else if (score < 94.5 && score >= 89.5) {
      qualification = "EZÜST";
    } else if (score < 89.5 && score >= 84.5) {
      qualification = "BRONZ";
    }

    return qualification;
  }
};

module.exports = categorize_cheeses;
