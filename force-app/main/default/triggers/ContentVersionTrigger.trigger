trigger ContentVersionTrigger on ContentVersion (after insert, before delete, before update) {
    system.debug('new--'+trigger.new);
    Schema.DescribeSObjectResult sr = Account.sObjectType.getDescribe();
    String srKeyPrefix = sr.getKeyPrefix();
    Set<Id> contentDocumentIdSet = new Set<Id>();
    Set<Id> linkentityids = new Set<Id>();
    Map<Id, Id> contDocLinkedMap = new Map<Id, Id>();
    for(ContentVersion cv:trigger.new)
    {
        if(cv.ContentDocumentId != null)
        {
            contentDocumentIdSet.add(cv.ContentDocumentId);
        }
    }
    for(ContentDocumentLink cdl : [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE ContentDocumentId IN : contentDocumentIdSet]){
            contDocLinkedMap.put(cdl.ContentDocumentId, cdl.LinkedEntityId);
        }
    
    List<ContentDocumentLink> cdl2 = new List<ContentDocumentLink>();
       cdl2 = [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE ContentDocumentId IN:contentDocumentIdSet ];
    for(ContentDocumentLink cdlk: cdl2){
        linkentityids.add(cdlk.LinkedEntityId);
    }
    List<Account> accList = [SELECT Id, name,Type FROM Account where Id IN: linkentityids and Type = 'Customer - Direct']; 
      for(ContentDocumentLink conDoc: cdl2){
                for(Account acc:accList){
                    if(conDoc.LinkedEntityId == acc.Id){
                      conDoc.addError('u cannot upload doc');
                    }	
                }
            }     
  
    
    

}