

function toggleLoader(show) {
    if (show) {
        document.getElementById("content").style.display = "none";
        document.getElementById("loader").style.display = "block";
    }
    else {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }
}

function validatePasswords() {
    // Check if passwords match
    var form = document.forms["signupForm"];
    var pass1 = form["pass"].value;
    var pass2 = form["confirmPass"].value;

    console.log("HELLLLLO");

    if (pass1 !== pass2) {
        alert("Passwords do not match");
        return false;
    }
    return true;
}

function onFormSubmit() {
    console.log("TESTING");

    if (validatePasswords()) {
        var form = document.forms["signupForm"];
        var pass = form["pass"].value;
        var username = form["user"].value;

        toggleLoader(true);
        postNewUser(username, pass);
        return false;
    }
    else {
        return false;
    }

}

function postNewUser(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"username":username,"password":password});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://dcs-backend.herokuapp.com/users", requestOptions)
        .then(response => {
            if (response.status === 201) {
                toggleLoader(false);
                alert("Account created successfully");
                window.history.back();
            }
            else if (response.status === 400) {
                toggleLoader(false);
                alert("Username already taken. Please try a different username.");
            }
            else {
                toggleLoader(false);
                alert("Error " + response.status + ": Something went wrong");
            }
        })
        .catch(error => console.log('error', error));
}