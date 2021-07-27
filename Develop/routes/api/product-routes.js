const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {

  // find all products
  Product.findAll({

    include: [

      {

        model: Category,
        attributes: ['id', 'category_name']

      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']

      }
    ]
  })

    .then(dbData => res.json(dbData))
    .catch(err => {

      console.log(err);
      res.status(500).json(err);

    });

});


// get one product
router.get('/:id', (req, res) => {

  // find a single product by id
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
  
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No product found with this id'}); 
        return; 
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {

  Product.create(req.body)
    .then((product) => {
 
      if (req.body.tagIds.length) {
        const tagArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(tagArray);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {

  Product.update(req.body, {

    where: {
      id: req.params.id,
    },

  })

    .then((product) => {

    
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })

    .then((productTags) => {
  
      const tagIds = productTags.map(({ tag_id }) => tag_id);

     
      const newProduct = req.body.tagIds

        .filter((tag_id) => !tagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });


      const removeProduct = productTags

        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: removeProduct } }),
        ProductTag.bulkCreate(newProduct),
      ]);
    })

    .then((updateTag) => res.json(updateTag))

    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {

  // delete one product by id
  Product.destroy({

    where: {
        id: req.params.id
    }
  })
    .then(dbData => {

        if (!dbData) {

            res.status(404).json({ message: 'No product found with this id'});
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
