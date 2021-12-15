import { Player } from "./player";

export class Turn {
    public player: Player;
    players: Array<Player>;
    currentPlayerID: number;
    totalTimesRun: number = 0;

    constructor(player: Player, players: Array<Player>) { 
        this.player = player;
        this.players = players;

        this.players.forEach(element => {
            element.turn = this;
        });

        this.currentPlayerID = players.indexOf(player) - 1;
        this.nextPlayer();
    }

    public nextPlayer(){
        if(this.totalTimesRun > 5) return;
        this.totalTimesRun++;
        this.currentPlayerID++;
        if(this.currentPlayerID >= this.players.length) this.currentPlayerID = 0
        this.player = this.players[this.currentPlayerID];
        this.player.action();
    }
}