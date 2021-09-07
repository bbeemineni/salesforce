import { LightningElement, wire, api, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpps from '@salesforce/apex/OpportunityController.getOpps';
const columns = [
    { label: 'Name',fieldName: 'OppName',type: 'url', sortable: false, typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
    { label: 'Stage', fieldName: 'StageName', sortable: true},
  //  { label: 'Account Name', fieldName: 'Accountname', sortable: true},
    {label: 'Close Date',fieldName: 'CloseDate',sortable: true}
];


export default class Opportunitypagination extends LightningElement {
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 10; 
    @track totalRecountCount = 0;
    @track totalPage = 0;
  
    @wire(getOpps, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})
    wiredAccounts({ error, data }) {
        if (data) {
        
            // console.log(JSON.stringify(data));
            
            // for(var i =0; i<data.length; i++){
            //     for(var j=0; j<data[i].Account.length; i++){   
            //     data[i].Accountname = data[i].Account[j].Name;
            // }
                
            // }
            // console.log(JSON.stringify(data.Accountname));

            // This for loop is for hyperlink to the record
            let tempOppList = []; 
            data.forEach((record) => {
                let tempoppRec = Object.assign({}, record);  
                tempoppRec.OppName = '/' + tempoppRec.Id;
                tempOppList.push(tempoppRec);
                
            });
            this.items = tempOppList;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            
            this.data = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.columns = columns;

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //clicking on previous button this method will be called
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }             
    }

    //this method displays records page by page
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 

        this.data = this.items.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }    
    
    sortColumns( event ) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        return refreshApex(this.result);
        
    }
  
    handleKeyChange( event ) {
        this.searchKey = event.target.value;
        return refreshApex(this.result);
    }

  
}