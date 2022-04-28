const { request, response } = require('express');
const { countVotes } = require('../helpers/countVotes');

const { Vote } = require('../models');

const postVote = async( req = request, res = response )=>{

    const {userIp, photo} = req.body;

        const vote = await Vote.findOne({userIp});

        if (vote){
            res.status(400).json({
                msg: "Error!. Ya votó"
            })
        }else{
            const vote = new Vote({
                userIp,
                photo
            })

            await vote.save();

            res.status(201).json({ 
                vote
            })
        }
}

const getVote = async(req = request, res = response) => {    
    const { id } = req.params;

    const vote = await Vote.findById(id);

    if (vote) {
        res.json({
            vote
        })
    }else{
        res.status(404).json({
            msg: "Este voto no existe"
        })
    }
}

const getVoteUser = async(req = request, res = response ) => {
    const { user } = req.params;

    const vote = await Vote.findOne({userIp: user});

    if (vote) {
        res.json({
            vote
        })
    }else{
        res.status(404).json({
            msg: "El usuario no ha votado"
        })
    }
}

const getVotesPhoto = async(req = request, res = response ) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { photo: req.params.photo };

    const [ total, votes ] = await Promise.all([
        Vote.countDocuments(query),
        Vote.find(query)
            .skip( Number( skip ))
            .limit(Number( limit ))
            .populate('photo')
    ]);

    if(!votes) return res.status(404).json({
        msg: "No se encontró registro"
    })

    res.json({
        total,
        votes
    });
}

const getVotes = async( req = request, res = response ) =>{

    const { limit = 5, skip = 0 } = req.query;

    const [ total, votes ] = await Promise.all([
        Vote.countDocuments(),
        Vote.find()
            .skip( Number( skip ))
            .limit(Number( limit ))
            .populate('photo')
    ]);

    if(!votes) return res.status(404).json({
        msg: "No hay votos"
    })

    res.json({
        total,
        votes
    });
}

const getResults = async( req = request, res = response ) =>{

    const [ total, votes ] = await Promise.all([
        Vote.countDocuments(),
        Vote.find()
    ])
    
    const data = [];

    for (let i = 0; i < votes.length; i++) {
        if(!data.includes(votes[i].photo)){
            console.log(
                await Vote.countDocuments({ photo: votes.photo})
            );
        }else{
            data.push(votes[i].photo);
        }
    }

}

module.exports = {
    postVote,
    getVote,
    getVotes,
    getVoteUser,
    getVotesPhoto,
    getResults
}