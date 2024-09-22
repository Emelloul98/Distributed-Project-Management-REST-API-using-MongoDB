const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ex4',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true   
});

