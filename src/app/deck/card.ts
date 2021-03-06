import { CardColor } from "./card-color";
import { CardRarity } from "./card-rarity";
import { Hand } from "./hand";

export class Card {

    public cardRarity: CardRarity = 0;
    public cardColor: CardColor = 0;
    private cardModel: number = 0;
    public cardNumber: number;
    public hand: Hand = undefined;
    public cardString = "";

    constructor(rarity: CardRarity, color: CardColor, value: number) { 
        this.cardRarity = rarity;
        this.cardColor = color;
        this.cardModel = value;
        this.updateCardNumber();
    }
  
    private updateCardNumber(){
        if(this.cardRarity == CardRarity.NORMAL){
            if(this.cardModel == 0) this.cardNumber = 0;
            else if(this.cardModel >= 1 && this.cardModel <= 9) this.cardNumber = this.cardModel;
            else if(this.cardModel >= 10 && this.cardModel <= 18) this.cardNumber = (this.cardModel - 9);
        }
        else this.cardNumber = -1;

        this.cardString = "../../assets/images/" + this.cardRarity + "_" + this.cardColor + "_" + this.cardNumber + ".png"
    }
}