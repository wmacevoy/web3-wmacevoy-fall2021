const express = require('express')
const app = express()
const port = 3000

let ctr = 0

app.use(express.json());
app.use((req, res, next) => {
  // res.setHeader('Content-Security-Policy', "style-src 'unsafe-inline'"); // INSECURE
  res.setHeader('Access-Control-Allow-Origin',"*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res) => {
  res.send('Bye for now!')
})

app.get('/add', (req, res) => {
  ctr += 1;
  let x = JSON.parse(req.query.x);
  let y = JSON.parse(req.query.y);
  let z = Number(x) + Number(y);

  res.json({ 'ctr' : ctr , 'x': x, 'y': y, 'z': z});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})