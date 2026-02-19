


// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { 
//   Badge, IconButton, TextField, Button, Container, Grid, 
//   Paper, Typography, Box, Card, CardContent 
// } from "@mui/material";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import ScreenShareIcon from "@mui/icons-material/ScreenShare";
// import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
// import ChatIcon from "@mui/icons-material/Chat";
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import server from "../environment";
// import styles from "../styles/VideoComponent.module.css";

// const server_url = server;

// var connections = {};

// const peerConfigConnections = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// export default function VideoMeetComponent() {
//   var socketRef = useRef();
//   let socketIdRef = useRef();

//   let localVideoref = useRef();

//   let [videoAvailable, setVideoAvailable] = useState(true);
//   let [audioAvailable, setAudioAvailable] = useState(true);
//   let [video, setVideo] = useState([]);
//   let [audio, setAudio] = useState();
//   let [screen, setScreen] = useState();
//   let [showModal, setModal] = useState(false); // Default false for chat
//   let [screenAvailable, setScreenAvailable] = useState();
//   let [messages, setMessages] = useState([]);
//   let [message, setMessage] = useState("");
//   let [newMessages, setNewMessages] = useState(0); // Fixed: Start at 0
//   let [askForUsername, setAskForUsername] = useState(true);
//   let [username, setUsername] = useState("");
  
//   const videoRef = useRef([]);
//   let [videos, setVideos] = useState([]);
//   let routeTo = useNavigate();

//   useEffect(() => {
//     getPermissions();
//   }, []);

//   const getPermissions = async () => {
//     try {
//       const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoPermission) setVideoAvailable(true);
//       else setVideoAvailable(false);

//       const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//       if (audioPermission) setAudioAvailable(true);
//       else setAudioAvailable(false);

//       if (navigator.mediaDevices.getDisplayMedia) setScreenAvailable(true);
//       else setScreenAvailable(false);

//       if (videoAvailable || audioAvailable) {
//         const userMediaStream = await navigator.mediaDevices.getUserMedia({
//           video: videoAvailable,
//           audio: audioAvailable,
//         });
//         if (userMediaStream) {
//           window.localStream = userMediaStream;
//           if (localVideoref.current) {
//             localVideoref.current.srcObject = userMediaStream;
//           }
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (video !== undefined && audio !== undefined) {
//       getUserMedia();
//     }
//   }, [video, audio]);

//   let getMedia = () => {
//     setVideo(videoAvailable);
//     setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   let getUserMediaSuccess = (stream) => {
//     try {
//       window.localStream.getTracks().forEach((track) => track.stop());
//     } catch (e) { console.log(e); }

//     window.localStream = stream;
//     localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       connections[id].addStream(window.localStream);
//       connections[id].createOffer().then((description) => {
//         connections[id].setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit("signal", id, JSON.stringify({ sdp: connections[id].localDescription }));
//           }).catch((e) => console.log(e));
//       });
//     }

//     stream.getTracks().forEach((track) => track.onended = () => {
//       setVideo(false);
//       setAudio(false);
//       try {
//         let tracks = localVideoref.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       } catch (e) { console.log(e); }

//       let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//       window.localStream = blackSilence();
//       localVideoref.current.srcObject = window.localStream;

//       for (let id in connections) {
//         connections[id].addStream(window.localStream);
//         connections[id].createOffer().then((description) => {
//           connections[id].setLocalDescription(description)
//             .then(() => {
//               socketRef.current.emit("signal", id, JSON.stringify({ sdp: connections[id].localDescription }));
//             }).catch((e) => console.log(e));
//         });
//       }
//     });
//   };

//   let getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//         .then(getUserMediaSuccess)
//         .catch((e) => console.log(e));
//     } else {
//       try {
//         let tracks = localVideoref.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       } catch (e) {}
//     }
//   };

//   let getDislayMediaSuccess = (stream) => {
//     try {
//       window.localStream.getTracks().forEach((track) => track.stop());
//     } catch (e) { console.log(e); }

//     window.localStream = stream;
//     localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       connections[id].addStream(window.localStream);
//       connections[id].createOffer().then((description) => {
//         connections[id].setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit("signal", id, JSON.stringify({ sdp: connections[id].localDescription }));
//           }).catch((e) => console.log(e));
//       });
//     }

//     stream.getTracks().forEach((track) => track.onended = () => {
//       setScreen(false);
//       try {
//         let tracks = localVideoref.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       } catch (e) { console.log(e); }

//       let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//       window.localStream = blackSilence();
//       localVideoref.current.srcObject = window.localStream;
//       getUserMedia();
//     });
//   };

//   let getDislayMedia = () => {
//     if (screen) {
//       if (navigator.mediaDevices.getDisplayMedia) {
//         navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//           .then(getDislayMediaSuccess)
//           .catch((e) => console.log(e));
//       }
//     }
//   };

//   useEffect(() => {
//     if (screen !== undefined) {
//       getDislayMedia();
//     }
//   }, [screen]);

//   let gotMessageFromServer = (fromId, message) => {
//     var signal = JSON.parse(message);
//     if (fromId !== socketIdRef.current) {
//       if (signal.sdp) {
//         connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
//           .then(() => {
//             if (signal.sdp.type === "offer") {
//               connections[fromId].createAnswer()
//                 .then((description) => {
//                   connections[fromId].setLocalDescription(description)
//                     .then(() => {
//                       socketRef.current.emit("signal", fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//                     }).catch((e) => console.log(e));
//                 }).catch((e) => console.log(e));
//             }
//           }).catch((e) => console.log(e));
//       }
//       if (signal.ice) {
//         connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) => console.log(e));
//       }
//     }
//   };

//   let connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on("signal", gotMessageFromServer);
//     socketRef.current.on("connect", () => {
//       // socketRef.current.emit("join-call", window.location.href);
//       socketRef.current.emit("join-call", window.location.pathname);
//       socketIdRef.current = socketRef.current.id;
      
//       socketRef.current.on("chat-message", addMessage);
      
//       socketRef.current.on("user-left", (id) => {
//         setVideos((videos) => videos.filter((video) => video.socketId !== id));
//       });

//       socketRef.current.on("user-joined", (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
//           connections[socketListId].onicecandidate = function (event) {
//             if (event.candidate != null) {
//               socketRef.current.emit("signal", socketListId, JSON.stringify({ ice: event.candidate }));
//             }
//           };
//           connections[socketListId].onaddstream = (event) => {
//             let videoExists = videoRef.current.find((video) => video.socketId === socketListId);
//             if (videoExists) {
//               setVideos((videos) => {
//                 const updatedVideos = videos.map((video) =>
//                   video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                 );
//                 videoRef.current = updatedVideos;
//                 return updatedVideos;
//               });
//             } else {
//               let newVideo = {
//                 socketId: socketListId,
//                 stream: event.stream,
//                 autoplay: true,
//                 playsinline: true,
//               };
//               setVideos((videos) => {
//                 const updatedVideos = [...videos, newVideo];
//                 videoRef.current = updatedVideos;
//                 return updatedVideos;
//               });
//             }
//           };
//           if (window.localStream !== undefined && window.localStream !== null) {
//             connections[socketListId].addStream(window.localStream);
//           } else {
//             let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//             window.localStream = blackSilence();
//             connections[socketListId].addStream(window.localStream);
//           }
//         });
//         if (id === socketIdRef.current) {
//           for (let id2 in connections) {
//             if (id2 === socketIdRef.current) continue;
//             try { connections[id2].addStream(window.localStream); } catch (e) {}
//             connections[id2].createOffer().then((description) => {
//               connections[id2].setLocalDescription(description)
//                 .then(() => {
//                   socketRef.current.emit("signal", id2, JSON.stringify({ sdp: connections[id2].localDescription }));
//                 }).catch((e) => console.log(e));
//             });
//           }
//         }
//       });
//     });
//   };

//   let silence = () => {
//     let ctx = new AudioContext();
//     let oscillator = ctx.createOscillator();
//     let dst = oscillator.connect(ctx.createMediaStreamDestination());
//     oscillator.start();
//     ctx.resume();
//     return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
//   };
  
//   let black = ({ width = 640, height = 480 } = {}) => {
//     let canvas = Object.assign(document.createElement("canvas"), { width, height });
//     canvas.getContext("2d").fillRect(0, 0, width, height);
//     let stream = canvas.captureStream();
//     return Object.assign(stream.getVideoTracks()[0], { enabled: false });
//   };

//   let handleVideo = () => {
//     setVideo(!video);
//     // getUserMedia(); // Triggered by useEffect
//   };
//   let handleAudio = () => {
//     setAudio(!audio);
//     // getUserMedia(); // Triggered by useEffect
//   };
//   let handleScreen = () => setScreen(!screen);
  
//   let handleEndCall = () => {
//     try {
//       let tracks = localVideoref.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//     } catch (e) {}
//     routeTo("/home");
//   };

//   let openChat = () => {
//     setModal(true);
//     setNewMessages(0);
//   };
//   let closeChat = () => setModal(false);

//   let handleMessage = (e) => setMessage(e.target.value);

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prevMessages) => [...prevMessages, { sender: sender, data: data }]);
//     if (socketIdSender !== socketIdRef.current) {
//       setNewMessages((prevNewMessages) => prevNewMessages + 1);
//     }
//   };

//   let sendMessage = () => {
//     socketRef.current.emit("chat-message", message, username);
//     setMessage("");
//   };

//   let connect = () => {
//     setAskForUsername(false);
//     getMedia();
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     alert("Meeting link copied to clipboard!");
//   }

//   return (
//     <div className={styles.container}>
//       {askForUsername ? (
//         <div className={styles.lobbyContainer}>
//           <Card className={styles.lobbyCard}>
//             <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
//               <Typography variant="h5" style={{color: "white"}}>Join Meeting</Typography>
//               <div className={styles.videoPreview}>
//                 <video ref={localVideoref} autoPlay muted className={styles.previewVideo}></video>
//               </div>
//               <TextField
//                 className={styles.textField}
//                 label="Enter Display Name"
//                 variant="outlined"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 InputLabelProps={{ style: { color: 'white' } }}
//                 InputProps={{ style: { color: 'white', borderColor: 'white' } }}
//                 fullWidth
//               />
//               <Button variant="contained" color="primary" onClick={connect} fullWidth>
//                 Connect
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       ) : (
//         <div className={styles.meetContainer}>
//           {/* Main Video Area */}
//           <div className={`${styles.videoGrid} ${showModal ? styles.shrinkVideo : ''}`}>
            
//             {/* Local Video */}
//             <div className={styles.videoWrapper}>
//                 <video className={styles.mainVideo} ref={localVideoref} autoPlay muted></video>
//                 <div className={styles.nameTag}>You</div>
//             </div>

//             {/* Remote Videos */}
//             {videos.map((video) => (
//               <div key={video.socketId} className={styles.videoWrapper}>
//                 <video
//                   data-socket={video.socketId}
//                   ref={(ref) => {
//                     if (ref && video.stream) ref.srcObject = video.stream;
//                   }}
//                   autoPlay
//                   className={styles.mainVideo}
//                 ></video>
//               </div>
//             ))}
//           </div>

//           {/* Chat Side Drawer */}
//           {showModal && (
//             <div className={styles.chatContainer}>
//               <div className={styles.chatHeader}>
//                   <Typography variant="h6">Chat Room</Typography>
//                   <IconButton onClick={() => setModal(false)} style={{color: "white"}}>
//                     <span style={{fontSize: "20px"}}>×</span>
//                   </IconButton>
//               </div>
              
//               <div className={styles.chatMessages}>
//                   {messages.length > 0 ? (
//                       messages.map((item, index) => (
//                           <div key={index} className={styles.messageBubble}>
//                               <Typography variant="subtitle2" style={{fontWeight: 'bold', color: '#90caf9'}}>{item.sender}</Typography>
//                               <Typography variant="body2">{item.data}</Typography>
//                           </div>
//                       ))
//                   ) : (
//                       <Typography variant="body2" style={{color: "#888", textAlign: "center", marginTop: "20px"}}>No messages yet</Typography>
//                   )}
//               </div>

//               <div className={styles.chatInputArea}>
//                   <TextField 
//                       variant="outlined" 
//                       placeholder="Type a message..." 
//                       value={message} 
//                       onChange={(e) => setMessage(e.target.value)}
//                       size="small"
//                       fullWidth
//                       InputProps={{ style: { color: 'white' } }}
//                       style={{backgroundColor: "#2c2c2c", borderRadius: "5px"}}
//                   />
//                   <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
//               </div>
//             </div>
//           )}

//           {/* Bottom Control Bar */}
//           <div className={styles.controlsContainer}>
//             <div className={styles.controlsLeft}>
//                 <Button 
//                     startIcon={<ContentCopyIcon />} 
//                     variant="outlined" 
//                     style={{color: "white", borderColor: "#555"}}
//                     onClick={handleCopyLink}
//                 >
//                     Copy Invite
//                 </Button>
//             </div>
            
//             <div className={styles.controlsCenter}>
//                 <IconButton onClick={handleVideo} style={{ backgroundColor: video ? "#333" : "#f44336", color: "white" }}>
//                     {video ? <VideocamIcon /> : <VideocamOffIcon />}
//                 </IconButton>
//                 <IconButton onClick={handleAudio} style={{ backgroundColor: audio ? "#333" : "#f44336", color: "white" }}>
//                     {audio ? <MicIcon /> : <MicOffIcon />}
//                 </IconButton>
//                 {screenAvailable && (
//                     <IconButton onClick={handleScreen} style={{ backgroundColor: screen ? "#2196f3" : "#333", color: "white" }}>
//                         {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
//                     </IconButton>
//                 )}
//                  <IconButton onClick={handleEndCall} style={{ backgroundColor: "#f44336", color: "white" }}>
//                     <CallEndIcon />
//                 </IconButton>
//             </div>

//             <div className={styles.controlsRight}>
//                  <IconButton onClick={() => {setModal(!showModal); setNewMessages(0)}} style={{color: "white"}}>
//                     <Badge badgeContent={newMessages} color="error">
//                         <ChatIcon />
//                     </Badge>
//                  </IconButton>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { Badge, IconButton, TextField, Button, Typography } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from '@mui/icons-material/Send';
import styles from "../styles/VideoComponent.module.css";
import server from "../environment";

const server_url = server;

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  const navigate = useNavigate();
  const { url: meetingCode } = useParams(); 

  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoref = useRef();

  let [video, setVideo] = useState(true);
  let [audio, setAudio] = useState(true);
  let [screen, setScreen] = useState(false);
  let [showModal, setModal] = useState(false);
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");
  
  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  // 1. Initial Load & Restore Username
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if(savedName) setUsername(savedName);
    getPermissions();
  }, []);

  // 2. Permission Handling
  const getPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      window.localStream = stream;
      if (localVideoref.current) {
        localVideoref.current.srcObject = stream;
      }
    } catch (error) {
      console.log("Error getting permissions", error);
    }
  };

  // 3. Hardware Toggle Logic (The Fix for 'Still Visible')
  useEffect(() => {
    if (window.localStream) {
        const videoTrack = window.localStream.getVideoTracks()[0];
        const audioTrack = window.localStream.getAudioTracks()[0];
        if (videoTrack) videoTrack.enabled = video;
        if (audioTrack) audioTrack.enabled = audio;
    }
  }, [video, audio]);


  const connect = () => {
    if (!username.trim()) return alert("Please enter a name");
    localStorage.setItem("username", username); // Save for refresh
    setAskForUsername(false);
    connectToSocketServer();
  };

  const connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", meetingCode);
      socketIdRef.current = socketRef.current.id;
      
      // Re-attach local stream if element exists (since DOM changed from Lobby to Room)
      setTimeout(() => {
          if (localVideoref.current && window.localStream) {
            localVideoref.current.srcObject = window.localStream;
          }
      }, 100);
    });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("chat-message", (data, sender, socketIdSender) => {
      setMessages((prev) => [...prev, { sender, data }]);
      if (socketIdSender !== socketIdRef.current) {
        setNewMessages((prev) => prev + 1);
      }
    });

    socketRef.current.on("user-left", (id) => {
      setVideos((prev) => prev.filter((v) => v.socketId !== id));
      if(connections[id]) {
          connections[id].close();
          delete connections[id];
      }
    });

    socketRef.current.on("user-joined", (id, clients) => {
      clients.forEach((socketListId) => {
        connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
        
        connections[socketListId].onicecandidate = (event) => {
          if (event.candidate != null) {
            socketRef.current.emit("signal", socketListId, JSON.stringify({ ice: event.candidate }));
          }
        };

        connections[socketListId].ontrack = (event) => {
          let videoExists = videoRef.current.find((v) => v.socketId === socketListId);

          if (!videoExists) {
            let newVideo = {
              socketId: socketListId,
              stream: event.streams[0],
              autoplay: true,
              playsinline: true,
            };
            setVideos((videos) => {
              const updated = [...videos, newVideo];
              videoRef.current = updated;
              return updated;
            });
          }
        };

        if (window.localStream) {
            window.localStream.getTracks().forEach(track => {
                connections[socketListId].addTrack(track, window.localStream);
            });
        }
      });

      if (id === socketIdRef.current) {
        for (let id2 in connections) {
          if (id2 === socketIdRef.current) continue;
          
          connections[id2].createOffer().then((description) => {
            connections[id2].setLocalDescription(description)
              .then(() => {
                socketRef.current.emit("signal", id2, JSON.stringify({ sdp: connections[id2].localDescription }));
              });
          });
        }
      }
    });
  };

  const gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId].createAnswer()
                .then((description) => {
                  connections[fromId].setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit("signal", fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
                    });
                });
            }
          }).catch((e) => console.log(e));
      }
      if (signal.ice) {
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) => console.log(e));
      }
    }
  };

  const handleEndCall = () => {
    if(window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop());
    }
    Object.keys(connections).forEach(key => connections[key].close());
    connections = {};
    navigate("/home");
  };

  const handleScreen = async () => {
    // Basic screen share implementation... (Keep existing logic or use simple replaceTrack)
    // For simplicity in this fix, I'll toggle video off to indicate screen share start
    if(!screen) {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
            const screenTrack = stream.getVideoTracks()[0];
            
            Object.keys(connections).forEach(key => {
                const sender = connections[key].getSenders().find(s => s.track.kind === "video");
                if(sender) sender.replaceTrack(screenTrack);
            });
            
            screenTrack.onended = () => {
               // Revert
               const camTrack = window.localStream.getVideoTracks()[0];
               Object.keys(connections).forEach(key => {
                const sender = connections[key].getSenders().find(s => s.track.kind === "video");
                if(sender) sender.replaceTrack(camTrack);
               });
               setScreen(false);
            }
            setScreen(true);
        } catch(e) { console.log(e); }
    }
  }

  const sendMessage = () => {
    if (message.trim() !== "") {
        socketRef.current.emit("chat-message", message, username);
        setMessage("");
    }
  };

  if (askForUsername) {
    return (
      <div className={styles.lobbyBackground}>
         <div className={styles.lobbyContainer}>
            <Typography variant="h4" style={{color: '#FFD600', fontWeight: 'bold', marginBottom: '20px'}}>
                Join Meeting
            </Typography>
            
            <div className={styles.videoPreviewContainer}>
                {/* LOBBY VIDEO PREVIEW */}
                <video ref={localVideoref} autoPlay muted className={styles.videoPreview}></video>
                
                {/* BLACK OVERLAY IF VIDEO OFF */}
                {!video && (
                    <div className={styles.blackOverlay}>
                        <Typography variant="h6" style={{color: 'white'}}>Camera Off</Typography>
                    </div>
                )}

                <div className={styles.previewControls}>
                     <IconButton onClick={() => setAudio(!audio)} style={{color: audio ? 'white' : '#f44336'}}>
                        {audio ? <MicIcon /> : <MicOffIcon />}
                     </IconButton>
                     <IconButton onClick={() => setVideo(!video)} style={{color: video ? 'white' : '#f44336'}}>
                        {video ? <VideocamIcon /> : <VideocamOffIcon />}
                     </IconButton>
                </div>
            </div>

            <TextField 
                variant="outlined" 
                label="Display Name" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{style: {color: '#aaa'}}}
                InputProps={{style: {color: 'white', borderColor: '#333'}}}
                fullWidth
                style={{marginBottom: '20px'}}
            />

            <Button variant="contained" onClick={connect} fullWidth style={{backgroundColor: '#FFD600', color: 'black', fontWeight: 'bold'}}>
                Join Now
            </Button>
         </div>
      </div>
    );
  }

  return (
    <div className={styles.meetContainer}>
        {/* VIDEO GRID - Now Dynamic */}
        <div className={`${styles.videoGrid} ${showModal ? styles.gridWithChat : ''}`}>
             
             {/* LOCAL VIDEO */}
             <div className={styles.videoCard}>
                <video ref={localVideoref} autoPlay muted style={{ opacity: video ? 1 : 0 }}></video>
                {!video && (
                    <div className={styles.avatarPlaceholder}>
                         <Typography variant="h4">{username.charAt(0).toUpperCase()}</Typography>
                    </div>
                )}
                <div className={styles.nameTag}>You</div>
             </div>
             
             {/* REMOTE VIDEOS */}
             {videos.map((v) => (
                <div key={v.socketId} className={styles.videoCard}>
                    <video 
                        ref={(el) => { if(el) el.srcObject = v.stream }} 
                        autoPlay 
                    />
                    <div className={styles.nameTag}>Participant</div>
                </div>
             ))}
        </div>

        {/* CONTROLS */}
        <div className={styles.controlsBar}>
            <Typography variant="subtitle1" style={{color: '#aaa', marginRight: '20px'}}>{meetingCode}</Typography>
            
            <IconButton onClick={() => setAudio(!audio)} className={audio ? styles.btnActive : styles.btnDanger}>
                {audio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton onClick={() => setVideo(!video)} className={video ? styles.btnActive : styles.btnDanger}>
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={handleScreen} className={screen ? styles.btnScreenActive : styles.btnActive}>
                {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
            <IconButton onClick={handleEndCall} className={styles.btnDanger}>
                <CallEndIcon />
            </IconButton>
            <IconButton onClick={() => { setModal(!showModal); setNewMessages(0); }} className={styles.btnActive}>
                <Badge badgeContent={newMessages} color="error">
                    <ChatIcon />
                </Badge>
            </IconButton>
        </div>

        {/* CHAT */}
        {showModal && (
            <div className={styles.chatDrawer}>
                <div className={styles.chatHeader}>
                    <Typography variant="h6">Chat</Typography>
                    <IconButton onClick={() => setModal(false)} style={{color: 'white'}}>×</IconButton>
                </div>
                <div className={styles.chatBody}>
                    {messages.map((msg, i) => (
                        <div key={i} className={styles.chatBubble}>
                            <Typography variant="caption" style={{color: '#FFD600'}}>{msg.sender}</Typography>
                            <Typography variant="body2">{msg.data}</Typography>
                        </div>
                    ))}
                </div>
                <div className={styles.chatInput}>
                    <TextField 
                        variant="standard" placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} fullWidth InputProps={{ disableUnderline: true, style: {color: 'white'} }}
                    />
                    <IconButton onClick={sendMessage} style={{color: '#FFD600'}}><SendIcon /></IconButton>
                </div>
            </div>
        )}
    </div>
  );
}