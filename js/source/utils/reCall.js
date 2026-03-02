
/**
 *  Athor: CB 
 */

/* How to use */
// create new event
// ReCall.create('eventName');

// listen or subscribe to event
/*
    const removeIndex = ReCall.listen('eventName', ()=>{
        //doen dit as ruben hier is...
    });
*/
// Remove lister
/*
    ReCall.remove('eventName', removeIndex);
*/

class ReCall {

    constructor(){

        this.listers = {};

        this.removedcb={}
    }

    notify(eventName) {

        if(eventName in this.listers){
            
            const calllBacks = this.listers[eventName].cbs;
            const removedCallBacks = (this.removedcb[eventName] === null || this.removedcb[eventName] === undefined)
                                        ? [] 
                                        : this.removedcb[eventName];

            calllBacks.forEach((cb, index ) => {
                if(cb && !removedCallBacks.includes(index)){
                    cb();
                }
            });
        }
    }

    listen(eventName, cb){
        if(eventName in this.listers){
            this.listers[eventName].cbs.push(cb);
            return this.listers[eventName].cbs.length -1;
        }else{
            console.error(`Event:"${eventName}" ...was not found. please first create an event before listing.`)
        }
    }

    create(eventName){
        
        if(eventName in this.listers){
            console.error("The event name already exists, please specify a diffrent event name");
        }else{

            this.listers[eventName] =  {
                //event name
                name:eventName,
                //call backs
                cbs:[],
            };
        }
    }

    remove(eventName, index ){
        if(eventName in this.remove){
            this.removedcb[eventName] = [];
        }else{
            this.removedcb.eventName.push(index);
        }
    }
}

export default ReCall;