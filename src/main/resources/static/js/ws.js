let stompClient;
let username;
let roomId;
let topic;

function onMessageReceived(msgObj) {
    const message = JSON.parse(msgObj.body);

    if (message.type === "JOIN") {
        addUserToTable(message.username);
    }
    console.log(message);
}

function onConnected() {
    roomId = playlistId;
    topic = `/app/playlist-ws/${roomId}`;

    stompClient.subscribe(`/room/${roomId}`, onMessageReceived);

    stompClient.send(`${topic}/addUser`,
        {},
        JSON.stringify({username: username, type: 'JOIN'})
    );
}

function onError() {
    // todo on error
}

function connectToPlaylist() {
    username = Cookies.get("username");
    if (username) {
        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
    else {
        window.open("/", "_self")
    }
}

$(document).ready(function() {
    connectToPlaylist();
});