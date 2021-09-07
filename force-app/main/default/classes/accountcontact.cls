public class accountcontact
{
    list<AccountWrapper> wraplist=new list<AccountWrapper>();
    public accountcontact()
    {
       Map<Id, AccountWrapper> accMap=new Map<Id, AccountWrapper>();
       list<AccountWrapper> listwrap = new List<AccountWrapper>();
       for(account a:[SELECT CreatedbyID,Name,Phone,Type, (select id, name from contacts) FROM Account])
       {
           AccountWrapper accWrap=accMap.get(a.CreatedByID);
           if (null==accWrap)
           {
              accWrap=new AccountWrapper();
              accMap.put(a.CreatedByID, accWrap);
              accWrap.userId=a.CreatedById;  
           } 

           accWrap.accounts.add(a);
       }

       wrapList=accMap.values();
   }

   public list<AccountWrapper> getaccounts()
   {
        system.debug('-wraplist-'+wraplist);
      return wraplist;
   }

   public class AccountWrapper
   {
      public Id userId {get; set;}
      public List<Account> accounts {get; set;}
      public AccountWrapper()
      {
         accounts=new List<Account>();
      }
   }
}