const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;

// video walkthrough: sql schema, npm start, npm run seed

// video walkthrough: Get All categories ( /api/categories )
// video walkthrough: Get All products ( /api/products )
// video walkthrough: Get All tags ( /api/tags )

// video walkthrough: Get single Categories ( /api/categories )
// video walkthrough: Get single product ( /api/product/2 )
// video walkthrough: Get single Tag ( /api/Tag/2 )

// video walkthrough: Delete single Categories ( /api/categories/2 )
// video walkthrough: Delete single product ( /api/product/2 )
// video walkthrough: Delete single tag ( /api/tag/2 )
