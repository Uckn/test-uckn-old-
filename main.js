
window.addEventListener('DOMContentLoaded', deleteOldItems(), false);

var messagesRef = firebase.database();

var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#messages');

// ENTERキーを押した時に発動する
messageField.keypress(function (e) {
    if (e.keyCode == 13) {
        //フォームに入力された情報
        var username = nameField.val();
        var message = messageField.val();
        var timestamp = new Date().getTime();

        //データベースに保存する
        messagesRef.ref('/').push({time: timestamp, name:username, text:message});
        messageField.val('');

        $('#scroller').scrollTop($('#messages').height());
    }
});

// データベースにデータが追加されたときに発動する
messagesRef.ref('/').on('child_added', function (snapshot) {
    //取得したデータ
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //取得したデータの名前が自分の名前なら右側に吹き出しを出す
    if ( username == nameField.val() ) {

        var messageElement = $("<li><p class='sender_name me'>" + username + "</p><p class='right_balloon'>" + message + "</p><p class='clear_balloon'></p></li>");

    } else {

        var messageElement = $("<li><p class='sender_name'>" + username + "</p><p class='left_balloon'>" + message + "</p><p class='clear_balloon'></p></li>");

    }
    //HTMLに取得したデータを追加する
    messageList.append(messageElement);

    //一番下にスクロールする
    messageList[0].scrollTop = messageList[0].scrollHeight;
});
