public class AccountJSON {
    
    public String getaccounts() {
        List<Account> accList = [SELECT Id, Name,Phone, AccountNumber, Industry 
                                 From Account 
                                 WHERE Phone != null and  Industry != null 
                                 LIMIT 10];
        String jsonData;
        List<Contact> conlist = [Select Id,Name,Email,AccountId from Contact Where AccountID In: acclist];
        if(!accList.isEmpty()){
            JSONGenerator jsongen = JSON.createGenerator(true);
            jsongen.writeStartObject();     
            jsongen.writeFieldName('Accounts');
            jsongen.writeStartArray();
            for(Account acc :accList){
                jsongen.writeStartObject();
                jsongen.writeStringField('Id', acc.Id);
                jsongen.writeStringField('Name', acc.Name);
                jsongen.writeStringField('Phone', acc.Phone);
                jsongen.writeStringField('Industry', acc.Industry);
                jsongen.writeEndObject();
                jsongen.writeStartObject();     
                jsongen.writeFieldName('Contacts');
                jsongen.writeStartArray();
                for(Contact con :conlist){
                     if(con.AccountId == acc.Id){
                        jsongen.writeStartObject();
                        jsongen.writeStringField('Id', con.Id);
                        jsongen.writeStringField('Name', con.Name);
                        jsongen.writeStringField('Email', con.Email);
                        jsongen.writeEndObject();
                   }
                }
                jsongen.writeEndArray();
                jsongen.writeEndObject();
            }
            jsongen.writeEndArray();
            jsongen.writeEndObject();
            jsonData = jsongen.getAsString();
        }
        System.debug('jsonData-' + JSON.deserializeUntyped(jsonData));
        System.debug('jsonData2-' + jsonData);
        return jsonData;
    }
    
}