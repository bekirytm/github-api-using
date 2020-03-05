//Github API Kullanımı Projesi

//Elementleri Seçme

const form = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const userList = document.getElementById("last-users");
const clearUsers = document.getElementById("clear-last-users");
const lastSearch = document.getElementById("lastSearch");
const btn = document.getElementById("tikla");

//Diğer class'ları ekleme
const github = new Github();
const ui = new UI();



eventListeners();
function eventListeners(){

    form.addEventListener("submit",getData);
    clearUsers.addEventListener("click",clearAllSearch);
    document.addEventListener("DOMContentLoaded",getAllSearch);

    lastSearch.addEventListener("click",deleteSearch);


}



function getData(e){
    //Butona tıkladığında verileri getirme

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı.");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStroage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
    
        })
        .catch(err => {
            console.log(err);
        })
    }



    ui.clearInput();
    e.preventDefault();
}


function clearAllSearch(){
    //Aramaları silme
    if(confirm("Emin misiniz ?")){

        Storage.clearAllSearch();
        ui.clearAllSearchUI();
        
    }
}

function getAllSearch(){
    //Sayfa yüklendiğinde aramaları getirme.
    let users = Storage.getSearchedUserFromStorage();

    let result = "";
    users.forEach(function(user){                           //Aramaları tek tek silme.
        result += `<li class="list-group-item">${user}             
        <a href = "#" style="float:right" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a></li>`;
    });

    userList.innerHTML = result;
}


//Aramaları Tek Tek Silme
function deleteSearch(e){
    if(e.target.className === "fa fa-remove"){
        ui.deleteSearchToUI(e.target);

        Storage.deleteSearchToStorage(e.target.parentElement.parentElement.textContent);
    }
    

    e.preventDefault();
}