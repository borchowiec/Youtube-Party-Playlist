let stompClient;
let username;
let userId;
let roomId;
let topic;
let userType;
let videoFilters = new Map();
let userFilters = new Map();

/**
 * Receives messages and handles it in different ways depending on type of message.
 * @param msgObj
 */
function onMessageReceived(msgObj) {
    const message = JSON.parse(msgObj.body);

    if (message.type === "ERROR_MESSAGE" && message.receiverId === userId) {
        $("#errorMessage").text(message.messageContent);
        showElement("#errorMessage", 5000);
    }
    else if (message.userId === userId && message.type === "KICK") {
        disconnect();
        $("#errorMessage").show();
        $("#errorMessage").text(message.reason);
        $("#currentTitle").text("");
        $("#playlistBody").empty();
        $("#usersBody").empty();
    }
    else if (message.type === "ANYBODY_THERE") {
        sendImPresent();
    }
    else if (message.type === "JOIN") { // add user to users table
        addUserToTable(message.username, message.userType, message.userId);

        if (userType === "OWNER") { // send updated playlist if new user join
            sendUpdatedPlaylist(videos);
            if (videos.length > 0) {
                sendCurrentVideo(currentVideo, videos[currentVideo]);
            }
        }
        sendImPresent(); // because new user don't know who is present
    }
    else if (message.type === "PRESENT") {
        if (userType === "OWNER" && message.userType === "GUEST") {
            // user filters
            const error = Array.from(userFilters.values()).find(filter => filter.filter(message));

            if (error) {
                sendKickMessage(message.userId, error.errorMessage);
            }
            else {
                addUserToTable(message.username, message.userType, message.userId);
            }
        }
        addUserToTable(message.username, message.userType, message.userId);
    }
    else if (message.type === "LEAVE") { // remove user from users table because user leaved
        removeUserFromTable(message.userId);
    }
    else if (message.type === "ADD_VIDEO" && userType === "OWNER") { // check if video is correct and add it to playlist
        getInfoAboutVideo(message.url).then(videoInfo => {
            if (videoInfo !== null) {
                // filters
                const error = Array.from(videoFilters.values()).find(filter => filter.filter(videoInfo));

                if (error) {
                    sendMessage(message.userId, error.errorMessage, "ERROR_MESSAGE")
                }
                else {
                    addVideo(videoInfo);
                }
            }
        });
    }
    else if (message.type === "UPDATED_PLAYLIST" && userType === "GUEST") { // receive updated playlist
        updatePlaylist(JSON.parse(message.playlist));
    }
    else if (message.type === "CURRENT_VIDEO" && userType === "GUEST") { // receive info about current song
        currentVideo = message.index;
        selectNthPlaylistElement(message.index);
        setCurrentTitle(JSON.parse(message.video).title);
    }
}

/**
 * Subscribe user to specified room. Room id should be given in url.
 */
function onConnected() {
    roomId = playlistId;
    topic = `/app/playlist-ws/${roomId}`;

    axios.get("/user/get-id")
        .then((response) => {
            userId = response.data.userId;

            stompClient.subscribe(`/room/${roomId}`, onMessageReceived);

            stompClient.send(`${topic}/addUser`,
                {},
                JSON.stringify({username: username, type: 'JOIN', userType: userType, userId: userId})
            );
        })
        .catch((error) => {
            console.log(error)
        });
}

function onError(event) {
    console.log(event)
}

function connectToPlaylist(newUserType) {
    userType = newUserType;
    username = Cookies.get("username");
    if (username) {
        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, onConnected, onError);
    }
    else {
        window.open("/", "_self")
    }
}

function disconnect() {
    stompClient.disconnect();
}

/**
 * Sends url of video to OWNER. OWNER will check video and decide if it's correct.
 * @param url Video
 */
function sendUrl(url) {
    stompClient.send(`${topic}/addVideo`,
        {},
        JSON.stringify({userId: userId, type: 'ADD_VIDEO', url: url})
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

/**
 * Notifies everyone that you are present
 */
function sendImPresent() {
    stompClient.send(`${topic}/present`,
        {},
        JSON.stringify({type: 'PRESENT', username: username, userType: userType, userId: userId,
            playlistAuthorization: Cookies.get("playlistAuthorization")})
    );
}

/**
 * Sends info about current video
 * @param index index of current video
 * @param video object of video
 */
function sendCurrentVideo(index, video) {
    stompClient.send(`${topic}/currentVideo`,
        {},
        JSON.stringify({type: 'CURRENT_VIDEO', index: index, video: JSON.stringify(video)})
    );
}

/**
 * Sends message to specific user.
 * @param receiverId User that will receive message
 * @param messageContent content of message
 * @param messageType e.g. ERROR_MESSAGE.
 */
function sendMessage(receiverId, messageContent, messageType) {
    stompClient.send(`${topic}/message`,
        {},
        JSON.stringify({type: messageType, messageContent: messageContent, receiverId: receiverId})
    );
}

function sendAnybodyThereMessage() {
    stompClient.send(`${topic}/anybodyThere`,
        {},
        JSON.stringify({type: "ANYBODY_THERE"})
    );
}

function sendKickMessage(kickedUser, reason) {
    stompClient.send(`${topic}/kick`,
        {},
        JSON.stringify({type: "KICK", userId: kickedUser, reason: reason})
    );
}