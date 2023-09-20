
const express = require('express');
const app = express();
const UserModel = require('./schemas/user-schema');
const Confessions = require('./schemas/confession-schema')
const bcrypt = require('bcrypt')



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type, Accept, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    next();
})

app.use(express.json())

//create all the endpoints required here!!
//such as logging in/out user,
//creating/getting/updating confessions

app.post('/signup',(req,res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,10)
    .then(hashedPwd => {
        const usermodel = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPwd
        })

        usermodel.save()
        .then(result =>{
            return res.status(200).json({
                message: 'User Successfully Registered!!',
                result: result
            })
        })
        .catch(err =>{
            return res.status(500).json({
                message: 'An Error Occurred while registering the user',
                error: err
            })
        })
        
    })
})

app.post('/login',(req,res)=>{
    let userFound;
    console.log(req.body);
    UserModel.findOne({username: req.body.username})
    .then((user)=>{
        if(!user){
            return res.status(500).json({
                message: 'User not found!'
            })
        }

        userFound = user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result){
            return res.status(500).json({
                message: 'Password is incorrect'
            })
        }

        return res.status(200).json({
            message: 'LoggedIn Successfully',
            user: userFound
        })
    })
    .catch(err=>{
        return res.status(404),json({
            message: 'An error Occurred!',
            error: err
        })
    })
    
})

app.get('/getConfessions',(req,res)=>{
    Confessions.find().then(response=>{
        return res.json({
            confessions: response
        })
    })
})

app.post('/postConfession',(req,res)=>{
    const confession = new Confessions({
        title : req.body.title,
        description: req.body.description,
        likes: 0,
        comments: []
    })

    confession.save().then(result=>{
        return res.status(200).json({
            message:"Successfully Posted!!",
            result: result
        })
    }).catch(err=>{
        return res.status(500).json({
            message:"An Error Occurred!",
            error:err
        })
    })
})

app.patch('/like',(req,res)=>{
    let cid = req.body.cid;
    let userid = req.body.uid;
    Confessions.findOneAndUpdate({_id: cid},{$inc : {likes : 1}},{returnOriginal: false}).then(value=>{
        if(value){
            console.log(value);
            UserModel.findOneAndUpdate({_id: userid}, {$push: {likedConfessions: cid}},{returnOriginal: false}).then(result=>{
                console.log(result);
                if(!result){
                    return res.status(500).json({
                        message: "Unable to like the confession",
                    })
                }
                return res.status(200).json({
                    message: "Successfully Liked the Confession",
                    result: value
                })
            })
        }else{
            return res.status(500).json({
                message: "Unable to like the Confession"
            })
        }
    })
})

app.patch('/dislike',(req,res)=>{
    let cid = req.body.cid;
    let userid = req.body.uid;
    Confessions.findOneAndUpdate({_id: cid},{$inc : {likes : -1}},{returnOriginal: false}).then(value=>{
        if(value){
            console.log(value);
            UserModel.findOneAndUpdate({_id: userid}, {$pull: {likedConfessions: cid}},{returnOriginal: false}).then(result=>{
                console.log(result);
                if(!result){
                    return res.status(500).json({
                        message: "Unable to dislike the confession",
                    })
                }
                return res.status(200).json({
                    message: "Successfully disliked the Confession",
                    result: value
                })
            })
        }else{
            return res.status(500).json({
                message: "Unable to like the Confession"
            })
        }
    })
})

app.patch('/comment',(req,res)=>{
    let cid = req.body.cid;
    let userid = req.body.uid;

    let data = {
        userid: userid,
        comment: req.body.comment
    }
    
    Confessions.findOneAndUpdate({_id: cid},{$push: {comments: data}},{returnOriginal: false})
    .then(result=>{
        if(result){
            return res.status(200).json({
                message:"Successfully added the comment",
                result: result
            })
        }

        return res.status(500).json({
            message: "Failed to add the comment"
        })
    })
})



module.exports = app;


