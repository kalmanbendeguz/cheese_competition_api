const load_product_tree = function (req, res, next) {
  try {
    //console.log('load_product_tree')
    const create_element = require("create-element");

    res.locals.milk_types = req.app.locals.product_tree.map((milk_type) => {
      let wrapper = {};
      wrapper.id = Object.keys(milk_type)[0];
      wrapper.name = req.app.locals.dict[res.locals.lang][wrapper.id];
      if (typeof wrapper.name === "undefined")
        throw new Error(
          `${wrapper.id}: ${
            req.app.locals.dict[res.locals.lang].no_field_in_dictionary
          }`
        );
      return wrapper;
    });

    const select_groups = req.app.locals.product_tree.map((milk_type) =>
      create_select_group(
        0,
        Object.keys(milk_type)[0],
        Object.values(milk_type)[0],
        null,
        req.app.locals.dict[res.locals.lang],
        res.locals.category_string
      )
    );

    res.locals.select_group_htmls = select_groups.map((select_group) =>
      select_group.map((option) =>
        create_element(option.type, option.attributes, option.content)
      )
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

function create_select_group(
  depth,
  current_id,
  list,
  options,
  dictionary,
  category_string
) {
  if (!options) options = [];
  const space = "&nbsp;";
  for (let element of list) {
    if (typeof element === "string") {
      options.push({
        type: "option",
        attributes: {
          class: "cheese_category_option",
          depth: depth,
          id: `${current_id}-${element}`,
          value: `${current_id}-${element}`,
          selected:
            `${current_id}-${element}` === category_string ? {} : undefined,
        },
        content:
          `${current_id}-${element}` === category_string
            ? dictionary[element]
            : `${space.repeat(depth * 3 + 1)}${dictionary[element]}`,
      });
    } else if (typeof element === "object") {
      options.push({
        type: "optgroup",
        attributes: {
          label: `${space.repeat(depth * 3)}${
            dictionary[Object.keys(element)[0]]
          }`,
        },
      });

      create_select_group(
        depth + 1,
        `${current_id}-${Object.keys(element)[0]}`,
        Object.values(element)[0],
        options,
        dictionary,
        category_string
      );
    }
  }
  return options;
}

module.exports = load_product_tree;
