class Storage{


    static getSearchedUserFromStorage(){
        //Storage'a array oluşturma veya tanımlama.

        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }


    static addSearchedUserToStroage(username){
        let users = this.getSearchedUserFromStorage();

        if(users.indexOf(username) === -1){  //Olmadığı durum
            users.unshift(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }


    static clearAllSearch(){
        //Tüm Aramaları Silme
        localStorage.removeItem("searched");
    }



    //Tek tek silme Storage'dan
    static deleteSearchToStorage(userText){
        let users = this.getSearchedUserFromStorage();
        const textUser = userText.trim();

        
        users.forEach(function(user,index){
            if(user === textUser){
                users.splice(index,1);
            }
            localStorage.setItem("searched",JSON.stringify(users));
        });
    }

}

