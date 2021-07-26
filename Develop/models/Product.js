// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true
    },

      // defines product_name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      
      // defines price column 
    price: {
      type: DataTypes.DECIMAL, 
      allowNull: false,
      validate: {
       isDecimal: true
      }  
    },
      // defintes stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },

      // defines category id column
    category_id: {
      type: DataTypes.INTEGER,
      // references Category model's id
      references: {
        model: 'category',
        key: 'id'
      }
    },

  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
 