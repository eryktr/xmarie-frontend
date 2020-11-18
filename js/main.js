document.cookie = `token=${Date.now()}`

let runBtn = document.getElementById('runBtn');
let debugBtn = document.getElementById('debugBtn');
let stepBtn = document.getElementById('stepBtn')
let profileBtn = document.getElementById('profileBtn')

runBtn.onclick = e => runCode();
debugBtn.onclick = e => debugCode();
continueBtn.onclick = e => continueDebug();
stepBtn.onclick = e => step();
profileBtn.onclick = e => profile();

function getToken() {
    var name = "token" + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }
