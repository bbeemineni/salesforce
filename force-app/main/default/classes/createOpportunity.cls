public class createOpportunity {
    @AuraEnabled(cacheable=true)
    // This Method used to display the contacts in Ui 
    public static List<Contact> getContactList (Id accId) {
        Set<Id> conId= new Set<Id>();
        set<Id> newId = new Set<Id>();
       List<Contact> conlist = [SELECT Id, Name, Title, Phone, Email FROM Contact Where AccountId =: accId];
        for(Contact con: conlist){
            conId.add(con.Id);
        }
       List<Opportunity> opplist= [Select Id, Name, ContactId from Opportunity Where ContactId In:ConId];
       if(opplist.size() > 0){
            for (Opportunity opp: opplist){
                newid.add(opp.ContactId);
            }
        
        List<Contact> contacts = [SELECT Id, Name, Title,Phone, Email FROM Contact Where Id Not In:newId AND AccountId =: accId];

        return contacts; 
    }
    else {
    return conlist;
    }

    }
    // This Method is used to create the Opportunities
    @AuraEnabled
    public static void createopps(List<Contact> contacts, Id accId){
      List<Opportunity> opplist = new List<Opportunity>();

        for(Contact con: contacts){
            Opportunity opp = new opportunity();
            opp.Name = con.Name;
            opp.CloseDate = System.Today()+60;
            opp.StageName = 'Prospecting';
            opp.AccountId = accId;
            opp.ContactId = con.Id;
            opplist.add(opp);

        }
        // Inserting the Opportunity records
        insert opplist;
    }

}