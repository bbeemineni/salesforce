import { LightningElement,track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track divdisplay = false;
    @track cityList = ['Bangalore', 'Hyderabad', 'Chennai', 'Mysore', 'Tirupathi']

    showdiv(event){
        this.divdisplay = event.target.checked;
    }

}