import {EventEmitter} from 'node:events';
function createDOMElenment(){
    const Emitter = new EventEmitter();
    return {

addEventListener(EventName, callback) {
    Emitter.on(EventName, callback);
},
removeEventListener(EventName, callback) {
    Emitter.off(EventName, callback);
},
dispatchEvent(event){
    Emitter.emit(event.type, event);
}
    };
}
    
const button = createDOMElenment();

function handleClick() {
    console.log("Button clicked");
}
button.addEventListener("click", handleClick);
  
button.dispatchEvent({
        type: "click",  
    
    });

 