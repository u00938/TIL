const express = require('express');

// Constants
const PORT = 5000;

// App
const app = express();
const productRoutes = require('./routes')
const mongoose = require('mongoose');

const user = 'databaseuser';
const password = 'young4262';
const db = 'ttd';

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.1weod.mongodb.net/${db}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true, // 경고 문구 뜨지 않게
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongodb Connected...'))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = app;