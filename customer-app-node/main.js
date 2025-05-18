
const express = require('express')
const app = express()

const cb = (req, res) => {
  res.send('Hello World 1234')
}
app.get('/', cb); //GET / 

app.use((req, res,next)=>{
  if(false){
    res.send('Hello About 000000')
  }else{
    next();
  }
  
});

app.get('/about',  (req, res) => {
	res.send('Hello About 01')
  });

app.get('/about',  (req, res) => {
	res.send('Hello About 02')
  });

app.listen(3000)