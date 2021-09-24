const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const kittenSchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittenSchema);




app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res) => {
  res.send('Bye for now!')
})

app.route('/testdb')
.get((req,res) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const silence = new Kitten({ name: 'Silence' });
    silence.save()
	.then((result)=>{
	    console.log('saved.');
	    res.send('saved.');
	});
});

async function getKittens(req,res) {
  mongoose.connect('mongodb://localhost:27017/test');
  try {
    const results = await Kitten.find({});
    console.log(results);
    res.json(results);
  } catch (err) {
    throw err;
  }
}
app.route('/kittens')
.get((req,res) => {
  getKittens(req,res)
  .then(()=>{ console.log("kittens gotten!"); })
});

app.route('/add/:x/:y')
   .get((req, res) => {
  ctr += 1;
  let x = JSON.parse(req.params['x']);
  let y = JSON.parse(req.params['y']);
  let z = Number(x) + Number(y);
  let obj = { 'ctr' : ctr , 'x': x, 'y': y, 'z': z};
  console.log("/add: " + JSON.stringify(obj));
  res.json(obj);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
