import { Hand } from "./hand";
import { Turn } from "./turn";

export class Player {
    public hand: Hand;
    public isTurn: boolean = false;
    turn: Turn;

    constructor(hand: Hand) { 
        this.hand = hand;
    }

    public isHuman(){ return false; }

    public action() { 
        this.isTurn = true;
        this.endTurn(); 
    }

    public endTurn() { 
        this.isTurn = false;
        this.turn.nextPlayer();
    }
}