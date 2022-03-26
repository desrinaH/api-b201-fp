const router = require('express').Router();
const User = require('../model/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{registerValidation, loginValidation} = require('../validation');
const { restart } = require('nodemon');
const verify = require('./verifytoken');


router.post('/register', async (req, res) => {

    //VALIDATE DATA BEFORE MAKE A USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check iif user have same email
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
    
    //Hash password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);



    //New User
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
 });

 //LOGIN
 router.post('/login', async (req, res) => {
    //VALIDATE DATA BEFORE MAKE A USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //Check if user have same email
     const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(404).send('Email doesnt exist');
     //check password
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).send('Invalid Password');

     //res.send('logged in succeed');

     //Create and assign token
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_sECRET);
     res.header('auth-token', token).send(token);

     
    // res.send('logged in succeed');


 });

 //CHANGE PASSWORD
//  router.patch('/changepass/:username', verify, async (req, res) => {
//     if(!req.body){
//         return res.status(400).send({message: "Content to update can not be empty"});
//     } else{
//     try{
//         const updatePassword = await Post.updateOne({username: req.params.username}, 
//             {$set: {password: hashPassword}}
//             );
//         res.status(200).json(updatePassword);
//     } catch (error){
//         res.status(500).json({message: "Error occured"});
//     }
//     }
// });

module.exports = router;