const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories and associated Products
router.get('/',  (req, res) => {
      Category.findAll({
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        ]
    })
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(500).json(err))
});


// find one category by its `id` value and its associated Products
  
router.get('/:id', (req, res) => {
   Category.findOne({
       where: {
           id: req.params.id
        },
        include: [
                {
                    model: Product,
                    attributes: ['id', 'product_name', 'price', 'stock']
                }
            ]
        })
        .then(category => {
            if (!category) {
                res.status(404).json({ message: 'No category found with this id' });
                return;
            }
            res.status(200).json(category);
        })
        .catch(err => res.status(500).json(err));

});

// create a new category
router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
        .then(category => res.status(200).json(category))
        .catch(err => res.status(500).json(err))
     
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
   Category.update(req.body, {
            where: {
                id: req.params.id,
              },
            })
        .then(category => {
            if (!category) {
                res.status(404).json({ message: 'No category found with this id' });
                    return;
            }
            res.status(200).json(category);
        })
        .catch(err => res.status(500).json(err));
});

// delete a category by its `id` value
router.delete('/:id',(req, res) => {
    Category.destroy({
          where: { 
              id: req.params.id 
            },
        })
        .then(category => {
            if (!category) {
                res.status(404).json({ message: 'No category found with this id' });
                    return;
            }
            res.status(200).json(category);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
