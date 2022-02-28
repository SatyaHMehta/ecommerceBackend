const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
    include: { model: Product },
  });
  return res.json(allTags);
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const singTag = await Tag.findOne({
    where: { id: req.params.id },
    include: { model: Product, attributes: ['product_name', 'price', 'stock'] },
    exclude: { model: Product, attributes: ['product_tag']}
  });
  return res.json(singTag);
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {id: req.params.id}
  }).then(tagData => res.json(`Updated name to ${req.body.tag_name}`))
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}}).then(tagData=>res.json(`Delted id ${req.params.id}`))
});

module.exports = router;
