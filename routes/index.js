var express = require('express');
var router = express.Router();
const Message = require("../models/message");

let allTxt = new Array();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.post('/chat', async (req, res) => {
  if(req.body.user && req.body.say){
    // 從req.body中取出資料
    let mag = new Message({
        name: req.body.user,
        say: req.body.say,
        date: new Date().toLocaleString()
    });
    allTxt.push(mag);    
  }
  res.send({data:JSON.stringify(allTxt)});
});

router.get('/chat/clear', async (req, res) => {
  allTxt = [];
  res.send({data:JSON.stringify(allTxt)});
});

router.get('/chat/reload', async (req, res) => {
  try {
    let msg = await Message.find();
    for(let i=0; i<msg.length; i++) allTxt.push(msg[i]);    
    res.send({data:JSON.stringify(allTxt)});
    //res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.get('/chat/save', async (req, res) => {
  for(let i=0; i<allTxt.length; i++){
    // 從req.body中取出資料
    const msg = new Message({
      name: allTxt[i].name,
      say: allTxt[i].say,
      date: allTxt[i].date
    });
    try {
      const newMsg = await msg.save();
      res.send({data:JSON.stringify(newMsg)});
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
});

module.exports = router;
