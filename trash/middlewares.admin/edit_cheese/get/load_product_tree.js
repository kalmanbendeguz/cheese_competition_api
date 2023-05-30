const load_product_tree = function () {
  const create_element = require("create-element");

  return function (req, res, next) {
    console.log("load_product_tree");
    let product_tree = require("../../../static/products");

    res.locals.milk_types = product_tree.map((milk_type) => {
      let wrapper = {};
      wrapper.id = Object.keys(milk_type)[0];
      wrapper.name =
        req.app.locals.dictionary[wrapper.id] ?? "NOT IN DICTIONARY";
      return wrapper;
    });

    let select_groups = product_tree.map((milk_type) =>
      create_select_group(
        Object.values(milk_type)[0],
        0,
        null,
        Object.keys(milk_type)[0],
        req.app.locals.dictionary,
        res.locals.category_string
      )
    );

    res.locals.select_group_HTMLs = select_groups.map((select_group) =>
      select_group.map((option) =>
        create_element(option.type, option.attributes, option.content)
      )
    );

    return next();
  };

  function create_select_group(
    list,
    depth,
    options,
    current_id,
    dictionary,
    category_string
  ) {
    if (!options) options = [];
    const space = "&nbsp;";
    list.forEach((element) => {
      if (typeof element === "string") {
        options.push({
          type: "option",
          attributes: {
            class: "cheese_category_option",
            depth: depth,
            id: current_id + "-" + element,
            selected:
              `${current_id}-${element}` === category_string ? {} : undefined,
            value: current_id + "-" + element,
          },
          content:
            `${current_id}-${element}` === category_string
              ? dictionary[element]
              : space.repeat(depth * 3 + 1) + dictionary[element],
        });
      } else {
        options.push({
          type: "optgroup",
          attributes: {
            label:
              space.repeat(depth * 3) + dictionary[Object.keys(element)[0]],
          },
        });

        create_select_group(
          Object.values(element)[0],
          depth + 1,
          options,
          current_id + "-" + Object.keys(element)[0],
          dictionary,
          category_string
        );
      }
    });
    return options;
  }
};

module.exports = load_product_tree;
