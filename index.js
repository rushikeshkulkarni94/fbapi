// main document ready function to check if dom is loaded fully or not

let myFacebookToken;

$(document).ready(() => {

    myFacebookToken = prompt("Please enter your Facebook Token:", "");

    if (myFacebookToken == null || myFacebookToken == "") {

        alert("No usr Token found");

    } else {

        getAllDetails();
        getHomeDetails();

    } // end if condition

}); // end document.ready function

let getAllDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,quotes,cover,picture.type(large),bio,birthday,email,gender,hometown,link,location,timezone,website,work&access_token=' + myFacebookToken,

        success: (response) => {

            $('#dataSection').css('display', 'block');

            console.log(response);

            $('#userName').append(response.name);

         

            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');

$('#myBirthday').append(response.birthday);

$('#myEmail').append(response.email);
$('#myLocation').append(response.location.name);
$('#myHometown').append(response.hometown.name);
$('#myGender').append(response.gender);

$('#myLink').append(response.link);
$('#myTimezone').append(response.timezone);


        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}



let getHomeDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/v2.12/me?fields=feed.limit(3)&access_token=' + myFacebookToken,

        success: (response) => {

        let allposts=response.feed.data;


            console.log(response);

            
            for(posts of allposts){

                 let tempRow = ` <div class="row">
                                     <div class="col"><p>${posts.story}</p></div>
                                     <div class="col"><p>${posts.message}<p></div>
                                </div>`

                 $("#showData").append(tempRow); // placing data in division with id - 'showData'
            }

        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}