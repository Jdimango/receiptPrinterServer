

$( document ).ready(function() {
    console.log( "ready!" );
    if (localStorage.getItem("username") === null) {
        location.href = '/login';
    }
    else {
        $("#username").val(localStorage.getItem("username"));
    }
});

$("#ex1-tab-1").click(function(){
    $("#ex1-tab-1").addClass("active");
    $("#ex1-tab-2").removeClass("active");
    // $("#ex1-tab-3").removeClass("active");

    $("#content-2").hide();
    // $("#content-3").hide();
    $("#content-1").delay(100).show();
});


$("#ex1-tab-2").click(function(){
    $("#ex1-tab-2").addClass("active");
    $("#ex1-tab-1").removeClass("active");
    // $("#ex1-tab-3").removeClass("active");

    $("#content-1").hide();
    // $("#content-3").hide();
    $("#content-2").delay(100).show();
});

$("#text_upload_button").click(async function(e){
    e.preventDefault();
    var text = $("#textToPrint").val();
    var username = $("#username").val();
      
    let result = await fetch('/upload_text', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({text,username}) // body data type must match "Content-Type" header
    }).then(returned => returned.json());

    if(result.status == 'success'){
        alert('uploaded successfully');

    }else{
        alert('upload failed');
    }
});

// $("#ex1-tab-3").click(function(){
//     $("#ex1-tab-3").addClass("active");
//     $("#ex1-tab-2,#ex1-tab-1").removeClass("active");
//     $("#content-2").hide();
//     $("#content-1").hide();
//     $("#content-3").delay(100).show();
// });


