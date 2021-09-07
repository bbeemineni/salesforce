import { LightningElement,track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track dynamicgreet = 'WORLD'
    dynamicgreethandle(event){
        this.dynamicgreet = event.target.value;
    }
}