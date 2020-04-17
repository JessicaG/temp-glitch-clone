var express = require('express')

var app = express()

//app.use(express.static(__dirname + '/public'))
app.use('/static', express.static('public'))


app.listen(8001, () => console.log('sanity on 8001'))
