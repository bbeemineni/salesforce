import { LightningElement,api } from 'lwc';

export default class DisplayFieldsConditionally extends LightningElement {
    @api recordId;
    @api objectApiName; 
    showFields = true;
    
    toggleFields() {
      this.showFields = !this.showFields;
    }
}