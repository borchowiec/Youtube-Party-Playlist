let stompClient;
let username;
let userId;
let roomId;
let topic;
let userType;
let filters = new Map();

/**
 * Receives messages and handles it in different ways depending on type of message.
 * @param msgObj
 */
function onMessageReceived(msgObj) {
    const message = JSON.parse(msgObj.body);

    if (message.type === "JOIN") { // add user to users table
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
        addUserToTable(message.username, message.userType, message.userId);
    }
    else if (message.type === "LEAVE") { // remove user from users table because user leaved
        removeUserFromTable(message.userId);
    }
    else if (message.type === "ADD_VIDEO" && userType === "OWNER") { // check if video is correct and add it to playlist
        // filters
        getInfoAboutVideo(message.url).then(videoInfo => {
            if (videoInfo !== null) {
                const error = Array.from(filters.values()).find(filter => filter.filter(videoInfo));
                if (error) {
                    console.log(message);
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

/**
 * Notifies everyone that you are present
 */
function sendImPresent() {
    stompClient.send(`${topic}/present`,
        {},
        JSON.stringify({type: 'PRESENT', username: username, userType: userType, userId: userId})
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