const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const categories = await Category.findAll({
      include: Product //Ask tutor
      
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: Product
    })
    if(!categoryById) {
      res.status(404).json({message: 'Could not find this id'})
      return
    }
    res.status(200).json(categoryById)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // req.body because there is no third parameter
    const categoryPost = await Category.create(req.body)

    res.status(201).json(categoryPost)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryPut = await Category.update({
      category_name: req.body.category_name,

    },
    {
      where: {
        id: req.params.id
      }
    })
    if(!categoryPut) {
      res.status(404).json({message: 'Could not find this id'})
      return
    }
    res.status(200).json(categoryPut)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryDelete) {
      res.status(404).json({message: 'Could not find this id'})
      return
    }
    res.status(200).json(categoryDelete)
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
