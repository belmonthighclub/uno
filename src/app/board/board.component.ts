import { Component, OnInit } from '@angular/core';
import { Card } from '../deck/card';
import { CardColor } from '../deck/card-color';
import { CardRarity } from '../deck/card-rarity';
import { DeckComponent } from '../deck/deck.component';
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


  deck: DeckComponent;
  turnHand: Hand = undefined;
  cardStack: Array<Card> = new Array;
  turn: Turn;

  constructor() {
  }

  ngOnInit(): void {
    this.deck = new DeckComponent(this);
    this.deck.createHand(6, true);
    this.deck.createHand(6, false);
    
    this.turn = new Turn(this.deck.human, this.deck.ais.concat(this.deck.human));

    this.setTurn(this.deck.human.hand);

    console.log(this.deck.human.hand);
  }

  public setTurn(hand: Hand): void { 
    this.turnHand = hand;
  }

  public playCard(card: Card){ 
    this.cardStack.push(card);
    this.deck.updateHands();
  }

  public getActiveCardFromStack(): Card{ return this.getCardsFromStack(1)[0] }

  public getCardsFromStack(amount: number): Array<Card>{
    return this.cardStack.slice(this.cardStack.length - amount, this.cardStack.length);
  }
}
