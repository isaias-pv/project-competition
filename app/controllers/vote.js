const { request, response } = require('express');

const { Vote } = require('../models');

const postVote = async( req = request, res = response )=>{

    const {user, photo} = req.body;

    if(!user || !photo){
        res.status(400).json({
            msg:"Error. User or Photo id is necesary"
        })
    }else{
        const vote = await Vote.findOne({userIp: user});
        if (vote){
            res.status(400).json({
                msg: "Error!. this ip has already voted"
            })
        }else{
            const vote = new Vote({
                userIp: user,
                photo
            })

            await vote.save();

            res.status(201).json({ 
                vote
            })
        }
    }
    
}

const getVote = async(req = request, res = response) => {    
    const { user } = req.params;

    const vote = Vote.findOne({userIp: user});

    if(vote) res.json({msg: "¡Error!, This ip already voted"})
}


const getVotes = async( req = request, res = response ) =>{
    const [total, votes] = new Promise([
        Vote.countDocuments()        
    ])
}

module.exports = {
    postVote,
    getVote
}