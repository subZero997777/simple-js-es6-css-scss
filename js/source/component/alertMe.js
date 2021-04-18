export class AlertMe {
    constructor(msg){
        this.message = msg || 'Message not set';
    }
    setMsg(msg){
        if(msg){
            this.message = msg;
        }
    }

    get(){
        return this.message;
    }

    show(newMsg){
        const msg = newMsg || this.message;
        alert(msg);
    }

    log(log){
        console.log(log);
    }
}