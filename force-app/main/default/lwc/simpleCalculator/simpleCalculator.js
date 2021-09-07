import { LightningElement,track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    @track currentresult;
    firstNumber;
    secondNumber;
    @track previousresult = [];
    @track showprevious = false;

    numberchangehandle(event){
        const inputbox = event.target.name;
        if(inputbox === 'firstNumber'){
            this.firstNumber = event.target.value;
        } else if(inputbox === 'secondNumber'){
            this.secondNumber = event.target.value;
        }
    }
    onadd(){
        const fn = parseInt(this.firstNumber);
        const sn = parseInt(this.secondNumber);
        this.currentresult = 'Result of '+fn+'+'+sn+' is '+(fn+sn);
        this.previousresult.push(this.currentresult);
    }
    onsub(){
        const fn = parseInt(this.firstNumber);
        const sn = parseInt(this.secondNumber);
        this.currentresult = 'Result of '+fn+'-'+sn+' is '+(fn-sn);
        this.previousresult.push(this.currentresult);
    }
    onmulti(){
        const fn = parseInt(this.firstNumber);
        const sn = parseInt(this.secondNumber);
        this.currentresult = 'Result of '+fn+'*'+sn+' is '+(fn*sn);
        this.previousresult.push(this.currentresult);
    }
    ondiv(){
        const fn = parseInt(this.firstNumber);
        const sn = parseInt(this.secondNumber);
        this.currentresult = 'Result of '+fn+'/'+sn+' is '+(fn/sn);
        this.previousresult.push(this.currentresult);
        alert(previousresult);  
    }
    checkboxhandle(event){
        this.showprevious = event.target.checked;
    }
}