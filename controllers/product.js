const createProduct = (req, res, knex) => {
    const { name, description } = req.body;

    if( !name || !description ) {
        res.status(404).json("You Can't Leave Fields Empty")
    } else {
        knex('products')
            .insert({
                name: name,
                description: description,
                created_at: new Date()
            })
            .returning('*')
            .then(data => {
                return res.send(data[0]);
            })
            .catch(err => {
                return res.status(400).json('A error occurred while creating product');
            })
    }
}


//GETS ALL PRODUCTS
//ROUTE /api/products/
//TYPE  GET
const getAllProducts = (req, res, knex) => {

    knex.select('*')
        .from('products')
        .then(data => {
            if(data.length) {
                return res.send(data)
            } else {
                return res.status(400).json('A error occurred while gettting products');
            }
        })
        .catch(err => {
            return res.status(404).json('Unable to select products');
        })
}


//GETS A PRODUCT BY ID
//ROUTE /api/products/:id
//TYPE  GET
const getProduct = (req, res, knex) => {
    const { id } = req.params;

    knex.select('*')
        .from('products')
        .where('id', '=', id)
        .returning('*')
        .then(data => {
            if(data.length) {
               return res.send(data[0]);
            } else {
                return res.status(400).json('A error occurred while gettting product')
            }
        })
        .catch(err => {
            return res.status(404).json('Unable to select product');
        })
}


//UPDATE PRODUCT
//ROUTE /api/products/:id
//TYPE  PUT
const UpdateProductDetails = (req, res, knex) => {
    const { id } = req.params;

    const { name, description } = req.body;

    if(!name && !description) {
        res.status(404).json("You Can't Leave Fields Empty")
    } else {
        knex('products')
            .where('id', '=', id)
            .update({
                name: name,
                description: description
            })
            .returning('*')
            .then(data => {
                if(data.length) {
                    return res.send(data[0]);
                } else {
                    return res.status(400).json('A error occurred while updating product details');
                }
            })
            .catch(err => {
                return res.status(404).json('Unable to edit product');
            })
    }
}


//DELETES PRODUCT
//ROUTE /api/products/:id
//TYPE  DELETE
const deleteProduct = (req, res, knex) => {
    const { id } = req.params;

    knex('products')
        .where('id', '=', id)
        .del()
        // .returning('*')
        .then(data => {
            // console.log(data)
            if(data.length) {
                res.json(data);
            } else {
                res.json('Product Successfully Deleted');
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Error While Deleting Product')
        })
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    UpdateProductDetails,
    deleteProduct
}