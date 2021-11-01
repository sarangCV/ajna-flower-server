const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const Item = require('../model/RMItem');

// ADD ITEMS
router.post('/add-item' ,async (req, res) => {
    console.log(req.body)
    const item = new Item({
        rmParticular: req.body.rmParticular,
        rmPrice: req.body.rmPrice,
        rmQuantity: req.body.rmQuantity,
        rmCommission: req.body.rmCommission,
        rmNote: req.body.rmNote,
        date: req.body.date
    });
    try {
        const savedItem = await item.save()
        res.send({message: 'Item accepted', success: true});
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})

// GET ITEMS
router.get('/', async (req, res) => {
    try {
        const item = await Item.find();        
        res.json(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET A SPECIFIC ITEM
router.get('/:id', async (req, res) => {
    try {        
        const item = await Item.findById(req.params.id)
        res.json(item)
    } catch (error) {
        res.status(400).send(error);
    }
})

// DELETE AN ITEM
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.json({message: 'Item deleted', success: true})
    } catch (error) {
        res.status(400).send(error);        
    }
})

// UPDATE AN ITEM
router.post('/update/:id', async (req, res) => {
    console.log('update api working..')
    try {
        const item = await Item.findById(req.params.id)
        item.rmParticular = req.body.rmParticular;
        item.rmPrice = req.body.rmPrice;
        item.rmQuantity = req.body.rmQuantity;
        item.rmCommission = req.body.rmCommission;
        item.rmNote = req.body.rmNote;
        item.date = req.body.date
        await item.save()
        res.json({message: 'Item updated', success: true})
    } catch (error) {
        res.status(400).send(error);        
    }
})


module.exports = router;