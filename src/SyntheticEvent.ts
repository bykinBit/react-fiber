function functionThatReturnsFalse(){
    return false;
}
function functionThatReturnsTrue(){
    return true;
}
function createSyntheticEvent(Interface:any){
    function SyntheticBaseEvent(reactName:any,reactEventType:any,targetInst:any,nativeEvent:any,nativeEventTarget:any){
        this._reactName=reactName;
        this._targetInst=targetInst;
        this.type=reactEventType;
        this.nativeEvent=nativeEvent;
        this.target=nativeEventTarget;
        this.currentTarget=null;
        for(const propName in Interface){
            this[propName]=nativeEvent[propName];
        }
        this.isDefaultPrevented=functionThatReturnsFalse;
        this.isPropagationStoped=functionThatReturnsFalse;
        return this;
    }
    Object.assign(SyntheticBaseEvent.prototype,{
        preventDefault(){
            this.defaultPrevented=true;
            const event=this.nativeEvent;
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue=false;
            }
            this.isDefaultPrevented=functionThatReturnsTrue;
        },
        stopPropagation(){
            this.defaultPrevented=true;
            const event=this.nativeEvent;
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble=false;
            }
            this.isPropagationStoped=functionThatReturnsTrue;
        }
    })
    return SyntheticBaseEvent;
}
const MouseEventInterface={
    clientX:0,
    clientY:0
} as any;
export const SyntheticMouseEvent=createSyntheticEvent(MouseEventInterface);
export const SyntheticEvent=createSyntheticEvent(MouseEventInterface);