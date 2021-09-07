import { LightningElement,api,track } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';


export default class Contactupdate extends LightningElement {
    @api recordId;
 //   @track showeditform = true;
    @track showdata = false

    btn(){
     //this.showeditform = false;
     this.showdata = true;

    }
    btn2(){
        this.dispatchEvent(new CloseActionScreenEvent());

    }
}