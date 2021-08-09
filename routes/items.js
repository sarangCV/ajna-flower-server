const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const Item = require('../model/Item');

router.post('/add-item' ,async (req, res) => {
    const item = new Item({
        items: req.body.items
    });

    try {
        const savedItem = await item.save()
        res.send({message: 'Items accepted', success: true})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    const item = await Item.find().sort({_id:-1}).limit(1)
    res.json(item[0].items)
});

module.exports = router;