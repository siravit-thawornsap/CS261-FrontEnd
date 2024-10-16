// const { response } = require("express");

function call_RESTAPI() {
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    if(document.getElementById("Info").style.display != "none"){
        document.getElementById("Info").style.display = "none";
    }
    // console.log(name);
    if(!Empty(name,pass,role)){
        fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify",{
            method : "POST",
            body : JSON.stringify({
                UserName : name,
                PassWord : pass
            }),
            headers : {
                "Content-type" : "application/json; charset=UTF-8",
                "Application-Key" : "API key"
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
                document.getElementById("Name").innerText = "Hello!! "+json.displayname_th;
                document.getElementById("ID").innerText = "ID : "+json.username;
                document.getElementById("Department").innerText = "Department : "+json.faculty;
            }
            
        })
        .catch(error => console.error("Error : ", error));
    }
    }
    
function Empty(name,pass,role) {
    // var user_name = document.getElementById("username").value;
    // var user_pass = document.getElementById("password").value;
    if(name == ""){
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "UserName is empty!";
        return true;
    }
    else if(pass == ""){
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "Password is empty!";
        return true;
    }else if(role == "teacher"){
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerText = "Role must be student!";
        return true;
    }
}

//############################################ Old Function #########################################################

// function call_RESTAPI() {
//     const name = document.getElementById("username").value;
//     const pass = document.getElementById("password").value;

//     const url = (
//         'http://localhost:8080/hello?' +
//         new URLSearchParams({ myName: name, lastName: pass }).toString()
//     );

//     fetch(url)
//         .then(response => response.text())
//         .then(text => {
//             console.log("Rest api text" + text);
//             document.getElementById("output").innerText = text;
//         })
//         .catch(error => console.error("Error : ", error))

// }