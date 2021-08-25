const router = require('express').Router();
const InstagramSchema = require('../models/Instagram');

router.post('/PostInstagram', async (req, res) => {
    const newInstagram = new InstagramSchema({
        link:req.body.link
    });
    console.log(newInstagram)
    try{
        const instagram = await newInstagram.save();
        return res.status(201).json(instagram);
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
    
});

router.get('/', async (req, res) => {
    try{
       const posts = await InstagramSchema.find();
        res.send(posts)
   } catch (err) {
       res.status(500).json(err)
   }
})

module.exports = router;