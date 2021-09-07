trigger AttachmentTriggerDemo on Attachment (before insert) {
 

    List<Account> accountList = new List<Account>();
    accountList =[Select Id, Name from Account];
 

    Set<id> accIds = new Set<id>();
 

    for(Attachment att : trigger.New){
 

         //Check if added attachment is related to Account or not
 

         if(att.ParentId.getSobjectType() == Account.SobjectType){
            att.addError('Sorry, attaching file not allowed on this object');
 

         }
 

    }
 

    
 

}