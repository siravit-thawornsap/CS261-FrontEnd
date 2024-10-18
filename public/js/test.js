// const { response } = require("express");

function call_RESTAPI() {
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    if(document.getElementById("Info").style.display != "none"){
        document.getElementById("Info").style.display = "none";
    }
    if(!Empty(name,pass,role)){
        fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify",{
            method : "POST",
            body : JSON.stringify({
                UserName : name,
                PassWord : pass
            }),
            headers : {
                "Content-type" : "application/json; charset=UTF-8",
                "Application-Key" : "Your API Keys"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("role").value = "";
            if(json.status == false){
                document.getElementById("output").style.color = "red" ;
                document.getElementById("output").innerText = json.message;
            }else{
                document.getElementById("output").innerText = "";
                document.getElementById("Info").style.display = "flex";
                document.getElementById("Login_Status").innerText = "Login "+json.message;
                document.getElementById("Name").innerText = "Name : "+json.displayname_th;
                document.getElementById("ID").innerText = "ID : "+json.username;
                document.getElementById("Department").innerText = "Department : "+json.faculty;
            }
            
        })
        .catch(error => console.error("Error : ", error));
    }
    }
    
function Empty(name,pass,role) {
    if(name == ""){
        document.getElementById("username").style.border = "5px solid red";
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "UserName is empty!";
        return true;
    }
    else if(pass == ""){
        document.getElementById("username").style.border = "1px solid #ccc";
        document.getElementById("password").style.border = "5px solid red";
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "Password is empty!";
        return true;
    }else if(role != "student"){
        document.getElementById("username").style.border = "1px solid #ccc";
        document.getElementById("password").style.border = "1px solid #ccc";
        document.getElementById("role").style.border = "5px solid red";
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "Role must be student!";
        return true;
    }else{
        document.getElementById("username").style.border = "1px solid #ccc";
        document.getElementById("password").style.border = "1px solid #ccc";
        document.getElementById("role").style.border = "1px solid #ccc";
        return false;
    }
}

function HidePass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }