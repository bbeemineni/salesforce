import { LightningElement,api,wire,track } from 'lwc';
import getContactList from '@salesforce/apex/createOpportunity.getContactList';
import createopps from '@salesforce/apex/createOpportunity.createopps';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title',  },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];


export default class Createopp extends LightningElement {
    @api recordId;
    @track error;
    @track data ;
    @track selectedcontacts;
    columns = columns;
    @wire(getContactList, { accId: '$recordId'} )
    wiredcontacts({
        error,
        data
    }) {
        if (data) {
            this.data = data;
            console.log(JSON.stringify(data));
        } else if (error) {
            this.error = error;
        }
    }
    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedcontacts = selectedRows;
        console.log(JSON.stringify(this.selectedcontacts));
        
    }

    createopportunity(){
        let accid = this.recordId;
        createopps({contacts :this.selectedcontacts , accId: accid})
        .then(() => {
                     })
          .catch(error => {
          })
        this.dispatchEvent(new CloseActionScreenEvent());
      }
}