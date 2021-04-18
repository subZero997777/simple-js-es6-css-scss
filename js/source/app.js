import { AlertMe } from './component/alertMe.js';
import { Config } from './component/config.js';

const doLog = (msg) => {
    console.log(msg);
    const myAlertObj = new AlertMe();
    const configs = new Config();
    myAlertObj.log(configs);
    myAlertObj.show('Import export working.. Watch is working now?');
    //get configs
    setTimeout(function(){
        myAlertObj.show("Done!!!!");
    },3000);

}

console.log('Javascript file App.js are included.');
doLog();



