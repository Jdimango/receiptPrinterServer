$( document ).ready(function() {
    console.log( "ready!" );
    if (localStorage.getItem("username") != null) {
        location.href = '/';
    }
});


$("#loginButton").click(async function(e){
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
      
    let result = await fetch('/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({username,password}) // body data type must match "Content-Type" header
    }).then(returned => returned.json());

    if(result.status == 'correct'){
        localStorage.setItem('username', username.toLowerCase());
        location.href = '/';
    }else{
        alert('wrong username or password');
    }

});