import { LightningElement,api,track } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';


export default class Fileuploader extends LightningElement {
    @api recordId;  // Record Id
    @track items = [];
    showpill = false;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        console.log(JSON.stringify(uploadedFiles[0].name));
        this.items = uploadedFiles;
        this.showpill = true;
        console.log(JSON.stringify(this.items[0].label));
    }
    handleItemRemove (event) {
       
        alert(' pill was removed!');
      
    }
    
    // closing the quick Action after updating
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());

    }
}