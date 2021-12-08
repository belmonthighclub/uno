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
                if(this.hand.useableCards.length > 0) break;
            }
        }
        else{
            let randomIndex = Math.floor(Math.random() * this.hand.useableCards.length);
            this.hand.playCard(this.hand.useableCards[randomIndex]);
        }

        this.endTurn(); 
    }
}