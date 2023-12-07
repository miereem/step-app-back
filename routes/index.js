const express = require('express');
const cors = require('cors');
const {Sequelize} = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Place = require("../models/Place")
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');


const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const jwtSecret = ('sdlkkjdfgksjlkl');
const bcryptSalt = bcrypt.genSaltSync(10);


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('/Users/home/step-app/api/uploads'));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.get('/', async (req, res) => {
  try {
      await sequelize.authenticate();
      res.json('Connection to db has been established successfully.');
  } catch (err) {
      console.error('Unable to connect to the database:', err);
      res.status(500).send('Internal Server Error');
  }
});


app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username: username}});
    if(user) {
        if(bcrypt.compare(password, user.password)) {
            jwt.sign({username: user.username, id: user.id}, jwtSecret, {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                });
        } else {
            res.status(422).json('pass wrong');
        }

    } else {
        res.json('not found');
    }
});


app.post('/register', async (req, res) => {
    const {name, email, username, password} = req.body;
    await User.sync();
    try {
        const user = await User.create({
            name,
            email,
            username,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
        res.json({user});
    } catch (e) {
        res.status(422).json(e);
    }
});


app.get('/profile',  (req, res) =>
{
    const{token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if(err) throw err;
            const {name, email, username, id} = await User.findByPk(user.id);
            res.json({name, email, username, id});
        });
    } else {
        res.json(null);
    }

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

const PhotosMiddleWare = multer({dest:'../uploads/'});
app.post('/upload', PhotosMiddleWare.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const newPath = path + '.' + parts[parts.length-1];
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('../uploads/',''));
    }
    console.log(uploadedFiles);
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, opensAt, closesAt, description} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        await Place.sync();
        const placeDoc = await Place.create({
            owner:userData.id,
            title: title, address, photos:addedPhotos,
            openingTime:opensAt, closingTime:closesAt, description
        });
        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    //sequelize.authenticate();
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        const resp = await Place.findAll({where: {owner:id}});
        res.json(resp);

    });
})


app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findByPk(id));
});

app.put('/places', async (req, res) =>{
    const {token} = req.cookies;
    const {id, title, address, addedPhotos, opensAt, closesAt, description} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findByPk(id);
        if (userData.id === placeDoc.owner) {
            placeDoc.set({
                title:title, address:address, photos: addedPhotos, openingTime:opensAt, closingTime:closesAt, description:description
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});


app.get('/places', async (req, res) => {
   res.json( await Place.findAll());
});

app.listen(3000, () => { console.log('Server running on port 3000');});



