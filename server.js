require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
db.on('open', () => {
    console.log('Mongo is Connected');
});

/* Middleware */
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}

app.use(/\.[0-9a-z]+$/i, express.static('public'));

/* Controller Goes Here Remove the tes*/
app.use('/api/invoices', require('./controllers/invoices')) //you can require items inline instead of assigning to variable at top. industry practice.
// app.use('/api/items', require('./controllers/items'))

app.get('/test', (req, res)=>{
	res.status(200).json({
		website: 'My Website',
		info: 'Not that much'
	})
})

/* Controller Ends here */
//LISTENER

app.listen(PORT, () => {
    console.log(`API Listening on port ${PORT}`);
});
