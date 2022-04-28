const { Vote, Photo } = require('../models');

const countVotes = ( votes = [] ) => {
    
    const data = [];
    
    for (let i = 0; i < votes.length; i++) {
        // for (let x = 0; x < data.length; x++) {
        //     if(){
        //         console.log("Son iguales");
        //     }else{
        //         data.push(votes[i].photo)
        //     }
        // }
        if(data.includes(votes[i].photo)){
            console.log("Son iguales");
        }else{
            
        }
    }

    return data;
}

module.exports = { countVotes }