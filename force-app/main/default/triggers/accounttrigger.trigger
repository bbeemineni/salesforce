trigger accounttrigger on Contact (before insert, before update) {

    for(Contact con:trigger.new){
        system.debug(con.Account.Type);
        if(con.Account.Type == 'Prospect'){
            con.Email = 'bbeemineni@gmail.com';

        }
    }

}