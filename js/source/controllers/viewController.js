import { boardIndexs, groupIndexes, groups} from "../constants/board.configs";
import mapLoop from "../utils/common";

//import help



class View {

    constructor(domId, cb){
        this.boardContainer = document.getElementById(domId);
        console.log(groupIndexes);        
        this.currentGroupIndex = 0;
        this.buildBoard();
        if(cb){
            cb();
        }
    }

    buildCell(y,x){

        //parent Cell Container
        const cellElem = this.buildEment('span', ['group-cell']);
        //Note Container -< 4 note child elem
        const cellNoteContainer =  this.buildEment('span', ['cell-notes']);
        //Cell Val 
        const cellVal = this.buildEment('span', ['cell-value'],{ "x" : x, "y":y }, `cell-${x}-${y}`);

        for (let i = 0; i < 4; i++ ) {
            let noteEl = this.buildEment('span', ['cell-note-val']);
            cellNoteContainer.appendChild(noteEl);
        }

        cellElem.appendChild(cellNoteContainer);
        cellElem.appendChild(cellVal);

        return cellElem;
    }

    buildGroups() {
        
        let row = this.buildEment('DIV', ['board-row']);
        //build 3 groups 
        for (let i = 0; i < 3; i++) {

            let groupContainerEl = this.buildEment('DIV', ['group-contaier'], {'index': this.currentGroupIndex}, 'group-'+this.currentGroupIndex);
            let { x: xArr, y: yArr } =  groupIndexes[this.currentGroupIndex];

            for (let yIndex = 0; yIndex < yArr.length; yIndex++) {

                let containerRow = this.buildEment('DIV', ['group-contaier-row']);
                let y = yArr[yIndex];
                
                for (let xIndex = 0; xIndex < xArr.length; xIndex++) {
                    let x = xArr[xIndex];
                    let cellElem = this.buildCell(y,x);   
                    containerRow.appendChild(cellElem);                     
                }

                groupContainerEl.appendChild(containerRow);
            }
  
            row.appendChild(groupContainerEl);
            this.currentGroupIndex++;
        }

        return row;
    }


    buildRow(index){

        let row={};
        // 3 Group Containers
        if(index === 0){
            this.currentGroupIndex = (this.currentGroupIndex === 0 ) ? 1 :this.currentGroupIndex;
            row = this.buildGroups();
        }else{
            row = this.buildGroups(row);
        }

        return row;
    }

    buildBoard(){
        //3 rows
        for (let index = 0; index < 3; index++) {
            let row = this.buildRow(index);
            this.boardContainer.appendChild(row);
        }        
    }


    buildEment(ElType, classes, data, id){

        let tempEl = document.createElement(ElType);

        if(classes.length>0){
            //tempEl.setAttribute('class', classes.join(' ')); 
            tempEl.classList.add(classes)           
        }

        if(id !== null && id !== undefined && id !== ""){
            tempEl.setAttribute('id', id);
        }

        if(data !== null && data !== undefined && data !== ""){
            mapLoop(data, (key, val)=>{
                tempEl.setAttribute('data-'+key, val);
            });
        }

        return tempEl;
    }   
}

export default View;