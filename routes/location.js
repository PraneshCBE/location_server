const express=require("express")
const {getLocation, insertLocation} = require("../database.js")
const router= express.Router()

router.get("/",async (req, res)=>{
    try{
    const users= await getLocation()
    res.send(users)
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke"})
    }
})

router.post('/', async (req, res) => {
    try {
      const { device_name,latitude, longitude, mapUrl } = req.body;
    
      await insertLocation(device_name,latitude.toString(), longitude.toString(), mapUrl);
      
      res.send({ message: 'Location stored successfully!' });
    } catch (err) {
      console.log(err.stack);
      res.status(500).send({ error: 'Something broke' });
    }
  });

module.exports=router