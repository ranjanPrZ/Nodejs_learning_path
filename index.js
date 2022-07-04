const express = require('express');
const app = express()
const port = 3000
const path = require('path')

// Following is used with partial path not absolute
// It gives error( such as ``Refused to apply style from the created custom_file.css``) if run server outside from application directory.
// app.use(express.static('public'))

// To make absolute path use following
app.use(express.static(path.join(__dirname, 'public')))

// Set view engine with EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


// First route to check whether server running.
app.listen(port, ()=>{
  console.log("Listing on port 3000!")
})

app.get('/cats', (req, res)=> {
  const cats = ['Blue', 'Red', 'Yello', 'Brown']
  res.render('cats', {cats})
})

app.get('/dogs', (req, res)=> {
  res.send('this is the sound from Dog, Woof!!');
})

app.get('/r/:subreddit/:three', (req, res) => {
  const {subreddit, secondId} = req.params;
  res.send(`<h1>Browsing the subreddit ${subreddit} : ${secondId}`);

})

app.get('/books', (req, res) => {
  res.send('This is the books list')
})

app.get('/search', (req, res) => {
  const q = req.query;
// To do understand why q gets undefined.

  if (!q) {
    console.log('Nothing found if nothing searched!')
  }
  res.send(`<h1>Search results for: ${q} </h1>`)
})

app.get('/home', (req, res) => {
  const route_paths = ['/search', '/cats', '/dogs', '/books', '/r/subreddit']
  res.render('home', {route_paths})
})

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', {num: num})
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.render('subreddit', {subreddit});
})
// This matches every single request.
// app.get('*', (req, res) => {
//   res.send('I dont know the path')
// })