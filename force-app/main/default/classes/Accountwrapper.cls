public class Accountwrapper {
     public List<WrapperClasse> getWrapperData(){
        List<WrapperClasse> wrap = new List<WrapperClasse>();
        List<wrappercontacts> wrapcon = new List<wrappercontacts>();
        List<Account> accList = [select Id,Name,Phone,Industry from account Limit 5];
        List<Contact> contactlist = [select id, Name, Email, AccountID From Contact Where AccountId In: acclist];
        for(Account acc: accList){
            WrapperClasse wr=new WrapperClasse();
            Wr.Name = acc.Name;
            wr.Phone = acc.Phone;
            wr.Industry = acc.Industry;
            for(Contact con:contactlist){
                if(con.AccountId == acc.Id){
                    wrappercontacts wc = new wrappercontacts();
                    wc.Name = con.Name;
                    wc.Email = con.Email;
                   	wrapcon.add(wc);
                }
               
            }
           wr.contacts = wrapcon;
            wrap.add(wr);
        }
        system.debug('-return-'+wrap);
         system.debug('---'+JSON.serializePretty(wrap));
        return wrap;
        
    }
    Public class WrapperClasse{
            Public string Name;
            Public string Phone;
            Public string Industry;
            public List<wrappercontacts> contacts;
    }
    public class wrappercontacts{
        Public string Name;
        Public string Email;
    }

}