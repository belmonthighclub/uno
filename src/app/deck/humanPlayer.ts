import { Hand } from "./hand";
import { Player } from "./player";

export class HumanPlayer extends Player{
    public override isHuman(){ return true; }
}