trigger ContentDocumentLiTrigger on ContentDocumentLink (before insert) {
   
    set<Id> opportunityIdSet = new set<Id>();
    
    if(trigger.isBefore){
        if(trigger.isInsert){
            for(ContentDocumentLink conDoc:trigger.new){
                if(conDoc.LinkedEntityId!=null){
                    string s1 = String.valueof(conDoc.LinkedEntityId);
                    if(s1.startsWithIgnoreCase('006')){
                      opportunityIdSet.add(conDoc.LinkedEntityId);  
                    }                   
                }
            }
            
            List<Opportunity> oppList = new List<Opportunity>();
            oppList = [SELECT Id,
                              Name,
                              StageName
                       FROM Opportunity
                       WHERE StageName='Closed Won' 
                       AND Id IN:opportunityIdSet];
            for(ContentDocumentLink conDoc:trigger.new){
                for(Opportunity opp:oppList){
                    if(conDoc.LinkedEntityId == opp.Id){
                      //2. conDoc.addError('u cannot upload doc');
                    }
                }
            }            
        }
    }
    
}