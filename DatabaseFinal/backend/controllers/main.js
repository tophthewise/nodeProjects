const getTableData = (req, res, db) => {
  // request will have table
  const table = "shoes";
  db(table)
    .join(
      "description",
      table + ".description",
      "=",
      "description.description_id"
    )
    .join("article", "article.article_id", "=", table + ".article")
    .join("type", "type.type_id", "=", table + ".type")
    .join("clothing", "clothing.type", "=", "type.type_id")
    .join("sex", "clothing.sex", "=", "sex.sex_id")
    .join("fashion", "fashion.fashion_id", "=", "clothing.fashion")
    .join("color", "color_id", "=", "description.color")
    .join("brand", "brand_id", "=", "description.brand")
    .join("material", "material_id", "=", "description.material")
    .select(
      "color.color",
      "fashion.fashion",
      "article.article_name",
      "brand.brand",
      "sex.sex",
      "description.price",
      "material.material"
    )
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error:" + err }));
};
const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body;
  console.log(first, last, email, phone, location, hobby);
  const added = new Date();
  db("testtable1")
    .insert({ first, last, email, phone, location, hobby, added })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error:" + err }));
};
const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body;
  db("testtable1")
    .where({ id })
    .update({ first, last, email, phone, location, hobby })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error:" + err }));
};
const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db("testtable1")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch((err) => res.status(400).json({ dbError: "db error:" + err }));
};
module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
};
