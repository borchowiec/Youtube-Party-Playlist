let stompClient;
let username;
let roomId;
let topic;
let userType;

/**
 * Receives messages and handles it in different ways depending on type of message.
 * @param msgObj
 */
function onMessageReceived(msgObj) {
    const message = JSON.parse(msgObj.body);

    if (message.type === "JOIN") { // add user to users table
        addUserToTable(message.username, message.userType);
    }
    else if (message.type === "LEAVE") { // remove user from users table because user leaved
        removeUserFromTable(message.username);
    }
    else if (message.type === "ADD_VIDEO" && userType === "OWNER") { // check if video is correct and add it to playlist
        getInfoAboutVideo(message.url).then(videoInfo => {
            if (videoInfo !== null) {
                addVideo(videoInfo);
            }
        });
    }
    else if (message.type === "UPDATED_PLAYLIST" && userType === "GUEST") { // receive updated playlist
        updatePlaylist(JSON.parse(message.playlist));
    }
}

/**
 * Subscribe user to specified room. Room id should be given in url.
 */
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

/**
 * Sends url of video to OWNER. OWNER will check video and decide if it's correct.
 * @param url Video
 */
function sendUrl(url) {
    stompClient.send(`${topic}/addVideo`,
        {},
        JSON.stringify({username: username, type: 'ADD_VIDEO', url: url})
    );
}

/**
 * OWNER can send updated playlist to GUESTS.
 * @param playlist
 */
function sendUpdatedPlaylist(playlist) {
    stompClient.send(`${topic}/updatePlaylist`,
        {},
        JSON.stringify({type: 'UPDATED_PLAYLIST', playlist: JSON.stringify(playlist)})
    );
}