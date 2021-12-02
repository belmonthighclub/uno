import { Component, OnInit } from '@angular/core';
import { Card } from './card';
import { CardColor } from './card-color';
import { CardRarity } from './card-rarity';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  public staticCards: Array<[CardRarity, Array<CardColor>, number]> = [
    [CardRarity.NORMAL, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 19],
    [CardRarity.REVERSE, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.DRAW_TWO, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.SKIP, [CardColor.GREEN, CardColor.RED, CardColor.YELLOW, CardColor.BLUE], 2],
    [CardRarity.DRAW_FOUR_WILD, [CardColor.SPECIAL], 4],
    [CardRarity.WILD, [CardColor.SPECIAL], 4],
  ]

  public cards: Array<Card> = new Array; 

  constructor() {  
    this.cards = this.createDeck();

    console.log(this.cards);
    console.log(this.cards[0]);
  }

  ngOnInit(): void {
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

    return this.shuffle(this.shuffle(cardDeck));
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
}
