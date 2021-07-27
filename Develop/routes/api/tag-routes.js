const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The /api/tags endpoint

router.get('/', (req, res) => {

  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {

  // find a single tag by id

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

    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No tag found with provided id.'});
        return;
      }
      res.json(dbData);
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

    .then(dbData => res.json(dbData))
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

  });
});

router.put('/:id', (req, res) => {

  // update a tag's name by id
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbData => {
        if (!dbData[0]) {

            res.status(404).json({ message: 'No tag found with provided id.'});
            return;
        }
        res.json(dbData);
  })
  
    .catch(err => {

        console.log(err); 
        res.status(500).json(err);
  });

});


router.delete('/:id', (req, res) => {

  // delete on tag by id
  Tag.destroy({

    where: {
        id: req.params.id
    }
  })

    .then(dbData => {

        if (!dbData) {

            res.status(404).json({ message: 'No tag found with provided id.'});
            return;
        }

        res.json(dbData);
  })
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

  });
});


module.exports = router;