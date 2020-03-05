//Arayüz Eklemeleri 

class UI{

    constructor(){
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.userList = document.getElementById("last-users");
        this.nameInput = document.getElementById("githubname");
        this.cardBody = document.querySelector(".card-body");
    }


//Input'u temizleme    
    clearInput(){
        this.nameInput.value = "";
    }


//User Infoları Gösterme
    showUserInfo(user){
        this.profileDiv.innerHTML = `
        <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong> ${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Takipçi  <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen  <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="mail">${user.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
        
        `;

    }

//Repoları Gösterme
    showRepoInfo(repos){

        this.repoDiv.innerHTML = "";

        repos.forEach(repo => {

            this.repoDiv.innerHTML += `
            <div class="mb-2 card-body">
            <div class="row">
                <div class="col-md-2">
                <span></span> 
                <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary">
                        Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                    </button>

                    <button class="btn btn-info">
                        Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                    </button>
            
                </div>
        </div>

        </div>
            `;


        });
    }


//Hata mesajı
    showError(message){

        const error = document.createElement("div");

        error.className = "alert alert-danger";
        error.textContent = message;

        this.cardBody.appendChild(error);

        setTimeout(function(){
            error.remove();
        },2000)

    }


//Aramaları Gösterme
    addSearchedUserToUI(username){
        let users = Storage.getSearchedUserFromStorage();

        if(users.indexOf(username) === -1){
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = "<a href = '#' style='float:right' class ='delete-item'><i class = 'fa fa-remove'></i></a>" + username;
            // li.textContent = username ;
            // li.innerHTML =  "<i class = 'fa fa-remove'></i>";

            this.userList.insertBefore(li,this.userList.firstElementChild);   //Li yi listenin başına ekleme.

        }
    }  


    clearAllSearchUI(){
        
        while(this.userList.firstElementChild !== null){
            this.userList.removeChild(this.userList.firstElementChild);
        }
    }


    //Arayüzden Aramaları Tek Tek Silme
    deleteSearchToUI(hedef){
        hedef.parentElement.parentElement.remove();
        }

}

