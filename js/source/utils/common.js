/* helper functions */

const mapLoop = (object, callbaclk) => {
    if(object !== null && object !== undefined && object !== ""){
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const value = object[key];
            callbaclk(key, value);
          }
        }
    }else{
        console.error('error object must be obejct map');
    }
}

export default mapLoop;