require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const { resolve } = require('path');

const app = express();
const port = 3010;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Failed:', err));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection Successful');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});
