import { BoardComponent } from "../board/board.component";
import { Card } from "./card";
import { CardRarity } from "./card-rarity";

export class Hand {

    public cards: Array<Card> = new Array;
    public useableCards: Array<Card> = new Array;
    public board: BoardComponent;
    public isHuman = false;
    public activeCard: Card;

    constructor(cards: Array<Card>, board: BoardComponent) { 
        this.cards = cards;
        this.useableCards = [];
        this.board = board;
    }

    public playCard(card: Card): boolean{
        if(!this.cards.includes(card)) return false;
        if(!this.useableCards.includes(card)) return false;
        this.removeCard(card);

        this.board.playCard(card);

        return true;
    }

    public removeCard(card: Card){
        let cardsIndex = this.cards.indexOf(card);
        if(cardsIndex != -1) this.cards.splice(cardsIndex, 1);

        cardsIndex = this.useableCards.indexOf(card);
        if(cardsIndex != -1) this.useableCards.splice(cardsIndex, 1);
    }

    public update(){
        this.activeCard = this.board.getActiveCardFromStack();
        this.useableCards = [];
        
        for (let index = 0; index < this.cards.length; index++) {
            let card: Card = this.cards[index];
            if(card.cardRarity == CardRarity.WILD || card.cardRarity == CardRarity.DRAW_FOUR_WILD) this.useableCards.push(card);
            else if(card.cardRarity == CardRarity.DRAW_TWO || card.cardRarity == CardRarity.REVERSE || card.cardRarity == CardRarity.SKIP || card.cardRarity == CardRarity.NORMAL){
                if(this.activeCard.cardColor == card.cardColor) this.useableCards.push(card);
            }
        }
    }
}