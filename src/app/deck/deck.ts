import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { AIPlayer } from './aiPlayer';
import { Card } from './card';
import { CardColor } from './card-color';
import { CardRarity } from './card-rarity';
import { Hand } from './hand';
import { HumanPlayer } from './humanPlayer';

export class Deck {

  public staticCards: Array<[CardRarity, Array<CardColor>, number]> = [
    [CardRarity.NORMAL, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 19],
    [CardRarity.DRAW_TWO, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.REVERSE, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.SKIP, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.DRAW_FOUR_WILD, [CardColor.SPECIAL], 4],
    [CardRarity.WILD, [CardColor.SPECIAL], 4],
  ]

  public cards: Array<Card> = new Array;
  public ais: Array<AIPlayer> = new Array;
  public human: HumanPlayer = undefined;
  public board: BoardComponent;

  constructor(board: BoardComponent) {  
    this.board = board;
    this.cards = this.createDeck();
  }

  public createHand(size: number, isPlayer: boolean): Hand {
    let hand: Hand;
    let handCards: Array<Card> = new Array;

    for (let index = 0; index < size; index++) {
      let card = this.drawCard();
      if(card === undefined) return undefined;
      handCards.push(card);
    }
    
    hand = new Hand(handCards, this.board);
    
    if(isPlayer){
      hand.isHuman = true;
      this.human = new HumanPlayer(hand);
    }
    else{
      hand.isHuman = false;
      this.ais.push(new AIPlayer(hand));
    }
    
    handCards.forEach(function(card: Card){
      card.hand = hand;
    })

    return hand;
  }

  public createDeck(): Array<Card>{
    let cardDeck: Array<Card> = new Array;

    this.staticCards.forEach(function(cardData: [CardRarity, Array<CardColor>, number]){
      for (let cardNumber = 0; cardNumber <= cardData[2] - 1; cardNumber++) {
        cardData[1].forEach(function(cardColor: CardColor){
          cardDeck.push(new Card(cardData[0], cardColor, cardNumber));
        })
      }
    })

    cardDeck = this.shuffle(cardDeck);

    return cardDeck;
  }

  public shuffle(array: Array<any>) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  public drawCard(): Card {
    return this.cards.pop();
  }

  public updateHands(){
    if(this.human.hand !== undefined) this.human.hand.update();
    
    this.ais.forEach(function(element: AIPlayer){
        if(element.hand !== undefined) element.hand.update();
    });
  }
}
