var URL = 'http://localhost:5000/amigos';

let showFriends = function () {
    $('#lista').empty();
    $.get(`${URL}`, function(friends){
         friends.forEach(element => {
        //     let li = document.createElement('li');
        //     li.id = element.id;
        //     li.innerText = element.name;
        //     let list = document.getElementById('lista');
        //     list.appendChild(li);
        // });
    $('#lista').append(`<li id = "${element.id}">${element.name} X </li>`)
    })
 }) 
};
$('#boton').click(showFriends);

$('#search').click(function(){
    let id = $('#input').val();
    if(id){
        $.get(`${URL}/${id}`, function (friend){
            console.log(friend);
            $('#amigo').text(`${friend.name} ${friend.age} ${friend.email}`);
            $('#input').value("");
        })
    }
});

let deleteFriend = function (){
    let id = $('#inputDelete').val();
    if(id){
        $.ajax({
            url: `${URL}/${id}`,
            type: "DELETE",
            success: function(){
                $('#success').text('Tu amigo fue eliminado correctamente')
                $('#inputDelete').val('');
                showFriends();
            }
        })
    }else {
        $('#success').text('Tenes que ingresar un ID')
    }
}
$('#delete').click(deleteFriend);