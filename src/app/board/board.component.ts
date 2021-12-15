import { Component, OnInit } from '@angular/core';
import { Card } from '../deck/card';
import { CardColor } from '../deck/card-color';
import { CardRarity } from '../deck/card-rarity';
import { Deck } from '../deck/deck';
import { Hand } from '../deck/hand';
import { Turn } from '../deck/turn';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // Add wrapper for cardStack, using splice(length - amount, length)
  // Add playCard() method to BoardComponent that adds card to cardStack
  // Add playCard() method to Hand that removes card from hand and calls playCard() of board
  // Change number variable of Card class, and change it to modelNumber? 
  // and add new number variable that is parsed and turned into a card number 
  // (special cards have -1 = no number, normal cards have 1 zero, and 1-9 twice)


  public deck: Deck;
  turnHand: Hand = undefined;
  cardStack: Array<Card> = new Array;
  turn: Turn;
  public playerAmount: number;
  public activeCardImageString: String;

  constructor() {
  }

  ngOnInit(): void {
    this.deck = new Deck(this);

    this.deck.createHand(6, true);
    this.deck.createHand(6, false);

    let playingCard: Card = this.deck.cards.pop();

    this.playCard(playingCard);
    
    this.playerAmount = this.deck.ais.concat(this.deck.human).length;

    this.turn = new Turn(this.deck.human, this.deck.ais.concat(this.deck.human));

    this.setTurn(this.turn.player.hand);
  }

  public setTurn(hand: Hand): void { 
    this.turnHand = hand;
  }

  public playCard(card: Card){ 
    if(card.cardRarity != CardRarity.NORMAL && card.cardRarity != CardRarity.WILD){
      if(card.cardRarity == CardRarity.REVERSE) {
        // TODO DO REVERSE CARD
      }
      else{
        this.turn.players[this.turn.currentPlayerID++].hand.cards.push(this.deck.drawCard());
        this.turn.players[this.turn.currentPlayerID++].hand.cards.push(this.deck.drawCard());
        this.turn.nextPlayer();
        this.turn.nextPlayer();
      }
    }
    
    this.cardStack.push(card);
    this.update();
    this.deck.updateHands();
  }

  private update(){
    let activeCard: Card = this.getActiveCardFromStack();
    this.activeCardImageString = "../../assets/images/" + activeCard.cardRarity + "_" + activeCard.cardColor + "_" + activeCard.cardNumber + ".png";
    console.log(this.activeCardImageString);
  }

  public getActiveCardFromStack(): Card{ return this.cardStack[this.cardStack.length - 1] }

  public getCardsFromStack(amount: number): Array<Card>{
    return this.cardStack.slice(this.cardStack.length - amount, this.cardStack.length);
  }
}
