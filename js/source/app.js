import View from "./controllers/viewController";
import Utils from  "./utils/utils";


class App {

    constructor(){
        //this.selections = {};
        Ts.ReCall.create('BuildComplete');
        Ts.ReCall.create('AddEventsComplete');
        Ts.ReCall.create('AddLogicComplete');
      
        const removeIndex = Ts.ReCall.listen('BuildComplete', ()=>{
            alert('Build Complete!!!');
            //doen dit as ruben hier is...
            //this.logic = new Logic();
        });
        //

        //this.events = new this.events();
        this.view = new View('boardTwo', ()=>{
            Ts.ReCall.notify('BuildComplete');
        });
        //this.doSelections();
        //this.bindEvents();
        
    }

    doSelections(){
        this.selections.body = document.body;
        this.activeElem = null;
        this.selections.cells = document.querySelectorAll('.group-cell');
        this.selections.hiddenInput = document.getElementById('hiddenInput');
    }

    bindEvents(){


        for(let cell of this.selections.cells) {
            cell.addEventListener('click', this.handleCellClick )
        }

        this.selections.body.addEventListener('click', this.clearFocus);
        this.selections.hiddenInput.addEventListener('keypress', this.handleKeyPress);
    }

    clearFocus = (e) => {
        this.clearAllActiveCells();
    }

    handleCellClick =(e) =>{
        
        e.stopImmediatePropagation();

        const cellElem = e.target;
    
        if(!cellElem.classList.contains('active')){
            this.clearAllActiveCells();
            cellElem.classList.add('active');
            this.activeElem = cellElem;
            this.selections.valueEl = this.activeElem.querySelector('.cell-value');
            this.selections.notesWrapper = this.activeElem.querySelector('.cell-notes');
            //get value from cell
            let val = this.selections.valueEl.innerText;
            //set input value to cell val
            this.selections.hiddenInput.val = val;
            this.selections.hiddenInput.focus();
        }
    }

    handleKeyPress = (e) => {
        // Only handle key input when a cell is active
        if (!this.activeElem || !this.selections.valueEl) {
            return;
        }

        const key = e.key;

        // Digits 1–9
        if (/^[1-9]$/.test(key)) {
            this.selections.valueEl.innerText = key;
            // keep hidden input value in sync
            if (this.selections.hiddenInput) {
                this.selections.hiddenInput.value = key;
            }
        }
        // Backspace/Delete: clear cell
        else if (e.key === 'Backspace' || e.key === 'Delete' || e.which === 8) {
            this.selections.valueEl.innerText = '';
            if (this.selections.hiddenInput) {
                this.selections.hiddenInput.value = '';
            }
        }
        // Ignore everything else for now
        else {
            return;
        }
    }

    createNote = () => {
        const noteEl = document.createElement('span');
        noteEl.setAttribute('class', 'cell-note-val');
        return noteEl;
    }
    

    clearAllActiveCells(){
        if(this.activeElem !== null){
            this.activeElem.classList.remove('active');
        }
    }
}

const Ts = new Utils();
const app = new App();


//build layout 
//9x9









