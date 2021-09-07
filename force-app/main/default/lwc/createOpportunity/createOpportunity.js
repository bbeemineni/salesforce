import { LightningElement,api,wire,track } from 'lwc';
import getContactList from '@salesforce/apex/createOpportunity.getContactList';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title',  },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class CreateOpportunity extends LightningElement {
    @api recordId;
    @track error;
    @track conList ;
    @wire(getContactList, { Id: 'recordId'})
    wiredcontacts({
        error,
        data
    }) {
        if (data) {
            this.conList = data;
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(recordId));
        } else if (error) {
            this.error = error;
        }
    }
}