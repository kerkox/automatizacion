const express = require('express');
const path = require('path');

const app = express(); 

app.use(express.static(__dirname+'/../dist/automatizacion-front'));
app.get('*', (req, res)  => {
  res.sendFile(path.join(__dirname + '/../dist/automatizacion-front/index.html'));
})



const port = process.env.PORT || 3010;
app.listen(port, ()=> {
  console.log(`Escuchando en el puerto: ${port}`);
})