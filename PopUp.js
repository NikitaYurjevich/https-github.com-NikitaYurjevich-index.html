let button = document.querySelector(".login-link");
let popUp = document.querySelector(".modal");
let close = document.querySelector(".modal-close");
let login = popUp.querySelector("[name=login]");
let form = popUp.querySelector("form");
let password = popUp.querySelector("[name=password]");
let storage = "";
let isStorageSupport = true;


try{
  storage = localStorage.getItem("login");
}
catch(err){
  isStorageSupport = false;
}

button.addEventListener("click", function(evt) {
  evt.preventDefault();
  popUp.classList.add("modal-show");
  if(storage){
    login.value = storage;
    password.focus();
  }
  else{
    login.focus();
  }
});
close.addEventListener("click", function(evt) {
  evt.preventDefault();
  popUp.classList.remove("modal-show");
  popUp.classList.remove("modal-error");
});
form.addEventListener("submit", function(evt) {

  if(!login.value || !password.value)
  {
    evt.preventDefault();
    popUp.classList.remove("modal-error");
    popUp.offsetWidth = popUp.offsetWidth;
    popUp.classList.add("modal-error");
  }
  else{
    if(isStorageSupport == true){
    localStorage.setItem("login", login.value);
    }
  }
});
window.addEventListener("keydown", function(evt){
  if(evt.keyCode === 27)
  {
    evt.preventDefault();
    if(popUp.classList.contains("modal-show"))
    {
      popUp.classList.remove("modal-show");
      popUp.classList.remove("modal-error");
    }
  }
});
