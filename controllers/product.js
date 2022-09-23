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

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    UpdateProductDetails
}