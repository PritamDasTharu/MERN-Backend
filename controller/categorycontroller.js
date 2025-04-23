const Category = require("../model/CategoryModel");

exports.addcategory = async (req, res) => {
  try {
    category = await Category.findOne({
      category_name: req.body.category_name,
    });

    // this is  model: Category.findOne({ category_`name: req.body.category_name });
    // this is variable: category

    if (!category) {
      let categoryadd = new Category({
        category_name: req.body.category_name,
      });
      categoryadd = await categoryadd.save();

      // These statements execute only after save is completed
      // res.status(200).json(categoryadd);
      res.send(categoryadd);
    } else {
      res.status(201).json({
        error: "Category already exists!",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message, Message: "Category not added!!!" });
  }
};

exports.getcategory = async (req, res) => {
  let category = await Category.find(); //returns array
  if (!category) {
    res.status(404).json({ error: "No category found" });
  }
  res.send(category);
};
exports.getCategoryById = async (req, res) => {
  let category = await Category.findById(req.params.id); //returns json
  if (!category) {
    res.status(404).json({ error: "No category found" });
  }
  res.send(category); //see only what is available or needed
  // res.status(200).json({ category }, error: "yoyo hey hey")//syntax is wrong, but customized way ma message herna man xa vane
};

exports.updateCategory = async (req, res) => {
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { category_name: req.body.category_name },
    { new: true }
  );
  // request.body.category_name chai hamile postman bata put, ani url halesi body ma {"category_name": "WomenAbibas"} dine

  if (!category) {
    res.status(400).json({ error: "Category Not Found" });
  }
  res.status(200).json({ category, success: "Category Updated" });
};

exports.deleteCategory = async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404).json({ error: "No category found" });
  }
  res.status(200).json({ category, success: "Category Deleted Successfully!" });
};

// 1. req.body: form bata input line kam garxa
// 2. req.params: where name = 'australia', database bata request garna chai request.params, eg. 1, 2, ..., 6, index haru le access garne
// id tanne kam params bata
// req.params: url bata aune data

// 3. req.query

// followed by question mark ?
// eg. on google or youtube search
// in url you see, youtube.com/results?search_query-chatgpt
// after using filters
// in url you see, youtube.com/results?search_query-chatgpt&sp=2342
// pagination

// What is async and await?

// await: wait to execute some instructions until loading is complete.
// eg. body ma some text save vayesi matra some statements execute garna parne hunxa
// it takes time to perform some operations,

// eg. body = 'req'.body.cat_name
// console.log(body)

// jaba samma body audaina, maybe due to network issues or large files, then await le chai console.log ko kura chai sab data retrieve vayesi matra display garaune

// // unrelated kura about use of ?.
// // data = {
// name: "Satish",
//     lastname: {
//     a: "bjgn",
//     b: "asdf",
//     c: {
//         abc: "asdf"
//     }
// }
// }
// To access data.lastname.c.abc, sometimes while refreshing, it won't load directly as it can take a lot of time
// so instead we use data?.lastname?.c?.abc, then it will wait for some time before it loads, then it loads the data successfully
