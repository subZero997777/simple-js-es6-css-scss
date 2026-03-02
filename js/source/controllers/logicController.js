import { groupIndexes, boardIndexs, xYIndexes } from "../constants/board.configs";


class Logic {

    constructor(){
        //clone board indexes
        this.boardIndexs = {...boardIndexs};
        //set defaults for X
        this.defaultXs = [1,2,3,4,5,6,7,8,9];
        this.availableXs = [];
        this.usedXs = [];
        this.currentY = 'a';
        this.currentX = 1;
    }

    setValues(){

    }

    pupulateRows(){
        
    }

    rowOne(){

    }

    rowTwo(){

    }

    validateCol(rowNumber){
        const Ys = [...xYIndexes.y];
        const currentYIndex =  Ys.indexOf(this.currentY);
        Ys.forEach( (y, index) => {


            if(currentYIndex > index){
                break;
            }else{
                let colCellVal = 
            }
        });

    }

    validateGroup(){

    }

    getRandomVal(){

    }

}

export default Logic;