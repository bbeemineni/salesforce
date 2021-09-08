public with sharing class fileuploadcontroller {
    public fileuploadcontroller() {}
    @AuraEnabled
       public static void deletedocument(Id docId){
        System.debug('Id--'+docId); 
        ContentDocument cd = [SELECT Id From ContentDocument where Id =: docId];
        delete cd;
    }
}
