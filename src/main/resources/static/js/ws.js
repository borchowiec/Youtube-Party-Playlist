let stompClient;
let username;
let roomId;
let topic;
let userType;

function onMessageReceived(msgObj) {
    const message = JSON.parse(msgObj.body);

    if (message.type === "JOIN") {
        addUserToTable(message.username, message.userType);
    }
    else if (message.type === "LEAVE") {
        removeUserFromTable(message.username);
    }
    else if (message.type === "ADD_VIDEO" && userType === "OWNER") {
        getInfoAboutVideo(message.url).then(videoInfo => {
            if (videoInfo !== null) {
                addVideo(videoInfo);
            }
        });
    }
}

function onConnected() {
    roomId = playlistId;
    topic = `/app/playlist-ws/${roomId}`;

    stompClient.subscribe(`/room/${roomId}`, onMessageReceived);

    stompClient.send(`${topic}/addUser`,
        {},
        JSON.stringify({username: username, type: 'JOIN', userType: userType})
    );
}

function onError() {
    // todo on error
}

function connectToPlaylist(newUserType) {
    userType = newUserType;
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

function sendUrl(url) {
    stompClient.send(`${topic}/addVideo`,
        {},
        JSON.stringify({username: username, type: 'ADD_VIDEO', url: url})
    );
}