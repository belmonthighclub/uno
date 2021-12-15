import { Card } from "./card";
import { Hand } from "./hand";
import { Player } from "./player";

export class AIPlayer extends Player{
    public override isHuman(){ return false; }

    public override action(){
        this.isTurn = true;

        if(this.hand.useableCards.length <= 0){
            while(true){
                this.hand.cards.push(this.hand.board.deck.drawCard());
                this.hand.update();
                console.log("drawing: " + this.hand.useableCards.length);
                if(this.hand.useableCards.length > 0) break;
            }
        }
        else{
            let randomIndex = Math.floor(Math.random() * this.hand.useableCards.length);
            let playeableCard: Card = this.hand.useableCards[randomIndex];
            this.hand.playCard(playeableCard);
        }

        this.endTurn(); 
    }
}