const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  // find all categories
  Category.findAll({
    include: [
      {

        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']

      }
    ]
  })
  
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {

  // find a single tag by its id
  Tag.findOne({

    where: {

      id: req.params.id

    },
    include: [

      {

        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],

      }
    ]

  })
    .then(dbTagData => {

      if (!dbTagData) {

        res.status(404).json({ message: 'No tag found with provided id!'});
        return;

      }

      res.json(dbTagData);

    })

    .catch(err => {

      console.log(err);
      res.status(500).json(err);

    });

});

router.post('/', (req, res) => {
  
  // create a new tag
  Tag.create({

    tag_name: req.body.tag_name

  })

    .then(dbTagData => res.json(dbTagData))
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

  });

});

router.put('/:id', (req, res) => {

  // update tag's name by id

  Tag.update(req.body, {

    where: {
        id: req.params.id

    }

  })
    .then(dbTagData => {

        if (!dbTagData[0]) {

            res.status(404).json({ message: 'No tag found with provided id!'});
            return;

        }
        res.json(dbTagData);

  })

    .catch(err => {

        console.log(err); 
        res.status(500).json(err);

  });

});


router.delete('/:id', (req, res) => {

  // delete tag by id

  Tag.destroy({

    where: {
        id: req.params.id
    }

  })
    .then(dbTagData => {

        if (!dbTagData) {

            res.status(404).json({ message: 'No tag found with provided id!'});
            return;

        }

        res.json(dbTagData);

  })
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

  });

});

module.exports = router;
