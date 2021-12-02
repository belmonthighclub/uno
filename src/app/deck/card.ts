import { CardColor } from "./card-color";
import { CardRarity } from "./card-rarity";

export class Card {

    public cardRarity: CardRarity = 0;
    public cardColor: CardColor = 0;
    public cardValue: number = 0;

    constructor(rarity: CardRarity, color: CardColor, value: number) { 
        this.cardRarity = rarity;
        this.cardColor = color;
        this.cardValue = value;
    }
  
}