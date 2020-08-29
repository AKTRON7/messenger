// sign in for new user
function signup() {
    // authentication process for new user:----
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#new-password').value;
    // authentication by creating new id and password
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
    }).then(() => {
        writeDataOfNewUser();
    });
}
function writeDataOfNewUser() {
    // collecting data for writing into database:---
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let dob = document.querySelector('#dob').value;
    let userId = firebase.auth().currentUser.uid;
    let gender = 'male';
    if (document.getElementById('male').checked == true) {
        gender = 'male';
    }
    else if (document.getElementById('female').checked == true) {
        gender = 'female';
    }
    else if (document.getElementById('others').checked == true) {
        gender = 'others';
    }
    // let p_node=email.replace(/[@&\/\\#,^+()$~%.'":*?<>{}]/gi, '');

    // writing operation:--
    // firebase.database().ref('emails/' + p_node).set({
    //     fname,
    //     email
    // });
    firebase.database().ref('users/' + userId).set({
        fname,
        lname,
        email,
        dob,
        gender,
        'uname': 'not',
        'profileImageUrl':'https://firebasestorage.googleapis.com/v0/b/webchat-5c2e5.appspot.com/o/defaultImage%2FProfilePicture?alt=media&token=5e923250-5d35-4abc-b70f-2565df5a09ac'
    }).then(() => {
        checklogin();
    });
}

// function that send logged in or signed in user to the home page
function checklogin() {
    let user = firebase.auth().currentUser;
    if (user) {
        location.href = "home.html";
    }
}

// log in for user
function login() {
    // collecting data for sign in:--
    let email = document.querySelector('#pre-email').value;
    let password = document.querySelector('#pre-password').value;

    // sign in process:--
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        if (errorCode === 'auth/invalid-email') {
            document.querySelector('#wrong-id').style.visibility = 'visible';
            let x = setTimeout(() => {
                document.querySelector('#wrong-id').style.visibility = 'hidden';
                clearTimeout(x);
            }, 3000);
        }
        else {
            document.querySelector('#wrong-pass').style.visibility = 'visible';
            let x = setTimeout(() => {
                document.querySelector('#wrong-pass').style.visibility = 'hidden';
                clearTimeout(x);
            }, 3000);
        }
    }).then(() => {
        checklogin();
    });
}



