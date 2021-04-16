const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const users = require("./users");
const User = users.model;
const validUser = users.valid;
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));



app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/wedding-photographers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Upload images to path
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 10000000
    }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async(req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Create a scheme for a type of photographer
const photographerTypeSchema = new mongoose.Schema({
    type: String,
});

// Create a model for types of photographers 
const Type = mongoose.model('Type', photographerTypeSchema);

// Schema for photographers
const photographerSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Type'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    price: String,
    path: String
});

// Model for photographer
const Photographer = mongoose.model('Photographer', photographerSchema);

//Schema for reviews
const reviewsSchema = new mongoose.Schema({
    photographer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photographer'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    text: String,
    star: Number
});

// Model for reviews
const Review = mongoose.model('Review', reviewsSchema);

//Create review for photographer if signed in
app.post('/api/photographers/:photographerID/reviews', validUser, async(req, res) => {
    try {
        let photographer = await Photographer.findOne({ _id: req.params.photographerID });
        // console.log(photographer);
        if (!photographer) {
            res.send(404);
            return;
        }
        let review = new Review({
            photographer: photographer,
            user: req.user,
            text: req.body.text,
            star: req.body.star
        });
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Update Review if signed in
app.put('/api/photographers/:photographerID/reviews/:reviewID', validUser, async(req, res) => {
    try {
        let review = await Review.findOne({ _id: req.params.reviewID, photographer: req.params.photographerID });
        if (!review) {
            res.send(404);
            return;
        }
        review.text = req.body.text;
        review.star = req.body.star;
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Delete Review if signed in
app.delete('/api/photographers/:photographerID/reviews/:reviewID', validUser, async(req, res) => {
    try {
        let review = await Review.findOne({ _id: req.params.reviewID, photographer: req.params.photographerID });
        if (!review) {
            res.send(404);
            return;
        }
        await review.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get a list of reviews for a photographer:
app.get('/api/photographers/:photographerID/reviews', async(req, res) => {
    try {
        let photographer = await Photographer.findOne({ _id: req.params.photographerID });
        console.log(photographer);
        if (!photographer) {
            res.send(404);
            return;
        }
        let reviews = await Review.find({ photographer: photographer }).populate('user');
        console.log(reviews);
        res.send(reviews);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Create a type of photographers if signed in
app.post('/api/type', validUser, async(req, res) => {
    const type = new Type({
        type: req.body.type,
    });
    try {
        await type.save();
        res.send(type);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all types of photographers 
app.get('/api/types', async(req, res) => {
    try {
        let types = await Type.find();
        res.send(types);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Adding photographer to type if signed in
app.post('/api/types/:typeID/photographers', validUser, async(req, res) => {
    try {
        let type = await Type.findOne({ _id: req.params.typeID });
        if (!type) {
            res.send(404);
            return;
        }
        let photographer = new Photographer({
            type: type,
            user: req.user,
            name: req.body.name,
            price: req.body.price,
            path: req.body.path
        });
        await photographer.save();
        res.send(photographer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all photographers 
app.get('/api/photographers', async(req, res) => {
    try {
        let photographers = await Photographer.find().populate('user');
        res.send(photographers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get a list of photographers for a type:
app.get('/api/types/:typeID/photographers', async(req, res) => {
    try {
        let type = await Type.findOne({ _id: req.params.typeID });
        if (!type) {
            res.send(404);
            return;
        }
        let photographers = await Photographer.find({ type: type });
        res.send(photographers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Update Photographer if signed in
app.put('/api/types/:typeID/photographers/:photographerID', validUser, async(req, res) => {
    try {
        let photographer = await Photographer.findOne({ _id: req.params.photographerID, type: req.params.typeID });
        if (!photographer) {
            res.send(404);
            return;
        }
        photographer.name = req.body.name;
        photographer.price = req.body.price;
        await photographer.save();
        res.send(photographer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Delete Photographer if signed in
app.delete('/api/types/:typeID/photographers/:photographerID', validUser, async(req, res) => {
    try {
        let photographer = await Photographer.findOne({ _id: req.params.photographerID, type: req.params.typeID });
        if (!photographer) {
            res.send(404);
            return;
        }
        await photographer.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// import the users module and setup its API path
app.use("/api/users", users.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));