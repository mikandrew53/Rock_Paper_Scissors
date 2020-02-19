class RockPaperScissors{
    constructor(p1, p2){
        this.players = [p1, p2];
        this.turns = [null, null];

        this.sendToPlayers('Rock Paper Scissors Game Has Started!');
        this.players.forEach((player, index) => {
            player.on('turn', (turn) => {
                this.onTurn(index, turn);
            });
        });
    
    }

    sendToPlayer(playerIndex, msg){
        this.players[playerIndex].emit('message', msg);
    }


    sendToPlayers(msg){
        this.players.forEach((player) => player.emit('message', msg))
    }

    onTurn(playerIndex, turn){
        this.turns[playerIndex] = turn;
        sendToPlayer(playerIndex, `You selected ${turn}`);
    }
}

module.exports = RockPaperScissors;