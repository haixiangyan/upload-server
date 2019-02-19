const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const p = require('path')

const app = express()

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), function (req, res, next) {
  res.json({key: req.file.filename})
})
app.get('/preview/:key', cors(), function(req, res, next){
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers:{
      'Content-Type': 'image/jpeg',
    },
  }, (error)=>{
    if(error){
      res.status(404).send('Not found')
    }
  })
})

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})