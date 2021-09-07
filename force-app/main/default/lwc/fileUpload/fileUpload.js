import { LightningElement,api,track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deletedocument from '@salesforce/apex/fileuploadcontroller.deletedocument';
import { CloseActionScreenEvent } from 'lightning/actions';


export default class Fileupload extends LightningElement {
    @api recordId;
    @track items = [];
    showpill = false;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        for(let i = 0; i<uploadedFiles.length; i++){
            uploadedFiles[i].label = uploadedFiles[i].name;
             
        }
        this.items = uploadedFiles;
        this.showpill = true;
    }
    handleItemRemove (event) {
        const docId = event.detail.item.documentId;
        const name = even.detail.item.name;
      //  deletedocument({docId: docId})
      deleteRecord(docId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: name+' has been deleted',
                        variant: 'success'
                    })
                );
               
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
      const index = event.detail.index;
      let items = this.items;
      items.splice(index,1);
      this.items = items;
    }
    
    // closing the quick Action after updating
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());

    }
}