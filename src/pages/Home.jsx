

// import React, { useContext, useState, useEffect } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
// import "../styles/Home.css";
// import { 
//   Button, IconButton, TextField, Dialog, DialogTitle, 
//   DialogContent, DialogActions, Autocomplete, Grid, Card, CardContent, Typography 
// } from "@mui/material";
// import RestoreIcon from "@mui/icons-material/Restore";
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import KeyboardIcon from '@mui/icons-material/Keyboard';
// import { AuthContext } from "../contexts/AuthContext";
// import axios from "axios";

// // Helper to generate random 6-character code
// const generateRandomCode = () => {
//     return Math.random().toString(36).substring(2, 8);
// }

// function Home() {
//   let navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const [open, setOpen] = useState(false); // Modal state
//   const [allUsers, setAllUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [scheduleDate, setScheduleDate] = useState("");

//   const { addToUserHistory } = useContext(AuthContext);

//   // Fetch users for the dropdown
//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/v1/users/get_all_users");
//             setAllUsers(response.data);
//         } catch (e) {
//             console.log(e);
//         }
//     }
//     fetchUsers();
//   }, []);

//   let handleJoinVideoCall = async () => {
//     if(meetingCode.trim() === "") return;
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   let handleCreateRandomMeeting = async () => {
//       const randomCode = generateRandomCode();
//       await addToUserHistory(randomCode);
//       navigate(`/${randomCode}`);
//   }

//   const handleScheduleMeeting = async () => {
//       const randomCode = generateRandomCode();
//       const token = localStorage.getItem("token");
      
//       try {
//           await axios.post("http://localhost:8000/api/v1/users/schedule_meeting", {
//               token: token,
//               meetingCode: randomCode,
//               date: scheduleDate,
//               invitedUsers: selectedUsers.map(u => u.email) // sending emails
//           });
//           alert("Meeting Scheduled & Emails Sent!");
//           setOpen(false);
//       } catch (e) {
//           console.log(e);
//           alert("Error scheduling meeting");
//       }
//   }

//   return (
//     <>
//       <div className="navBar">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2>Video Call</h2>
//         </div>

//         <div style={{ display: "flex", alignItems: "center" }}>
//           <IconButton onClick={() => navigate("/history")}>
//             <RestoreIcon />
//           </IconButton>
//           <p>History</p>

//           <Button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/auth");
//             }}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>

//       <div className="meetContainer">
//         <div className="leftPanel">
//           <div style={{marginBottom: "40px"}}>
//             <h1>Quality Video Calls for Everyone</h1>
//             <p>Connect, collaborate, and celebrate from anywhere with secure video calling.</p>
//           </div>

//             <Grid container spacing={3}>
//                 {/* Option 1: Instant Meeting */}
//                 <Grid item xs={12} md={6}>
//                     <Card variant="outlined" style={{height: '100%'}}>
//                         <CardContent>
//                              <div style={{display:'flex', alignItems:'center', gap: '10px', marginBottom: '15px'}}>
//                                 <VideoCallIcon fontSize="large" color="primary"/>
//                                 <Typography variant="h6">New Meeting</Typography>
//                              </div>
//                              <Typography variant="body2" color="textSecondary" style={{marginBottom: '15px'}}>
//                                 Create a new meeting instantly and share the link.
//                              </Typography>
//                              <div style={{display:'flex', gap:'10px'}}>
//                                 <Button onClick={handleCreateRandomMeeting} variant="contained" fullWidth>
//                                     Start Instant
//                                 </Button>
//                                 <Button onClick={() => setOpen(true)} variant="outlined" fullWidth>
//                                     Schedule
//                                 </Button>
//                              </div>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Option 2: Join Meeting */}
//                 <Grid item xs={12} md={6}>
//                      <Card variant="outlined" style={{height: '100%'}}>
//                         <CardContent>
//                             <div style={{display:'flex', alignItems:'center', gap: '10px', marginBottom: '15px'}}>
//                                 <KeyboardIcon fontSize="large" color="secondary"/>
//                                 <Typography variant="h6">Join Meeting</Typography>
//                              </div>
//                              <Typography variant="body2" color="textSecondary" style={{marginBottom: '15px'}}>
//                                 Enter the code shared by the organizer.
//                              </Typography>
//                             <div style={{ display: "flex", gap: "10px" }}>
//                             <TextField
//                                 onChange={(e) => setMeetingCode(e.target.value)}
//                                 id="outlined-basic"
//                                 label="Enter Code"
//                                 variant="outlined"
//                                 size="small"
//                                 fullWidth
//                             />
//                             <Button onClick={handleJoinVideoCall} variant="contained" color="secondary">
//                                 Join
//                             </Button>
//                             </div>
//                         </CardContent>
//                      </Card>
//                 </Grid>
//             </Grid>
//         </div>

//         <div className="rightPanel">
//           <img srcSet="/logo3.png" alt="" style={{maxWidth: '100%'}} />
//         </div>
//       </div>

//       {/* Scheduling Modal */}
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Schedule a Meeting</DialogTitle>
//         <DialogContent>
//             <div style={{display:'flex', flexDirection:'column', gap: '20px', marginTop:'10px'}}>
//                 <TextField 
//                     label="Meeting Date & Time"
//                     type="datetime-local"
//                     InputLabelProps={{ shrink: true }}
//                     onChange={(e) => setScheduleDate(e.target.value)}
//                     fullWidth
//                 />

//                 <Autocomplete
//                     multiple
//                     options={allUsers}
//                     getOptionLabel={(option) => option.name + ` (${option.username})`}
//                     onChange={(event, newValue) => setSelectedUsers(newValue)}
//                     renderInput={(params) => (
//                     <TextField {...params} label="Select Participants" placeholder="Users" />
//                     )}
//                 />
//             </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleScheduleMeeting} variant="contained">Schedule & Send Email</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default withAuth(Home);




import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { 
  Button, IconButton, TextField, Card, CardContent, Typography, Grid, Box, AppBar, Toolbar 
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../contexts/AuthContext";

import "../App.css"; // Ensure you have basic resets here

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    if(meetingCode.trim() === "") return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  let handleCreateRandomMeeting = async () => {
      const randomCode = Math.random().toString(36).substring(2, 8);
      await addToUserHistory(randomCode);
      navigate(`/${randomCode}`);
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100vh", bgcolor: "#121212", overflow: "hidden" }}>
      {/* APP BAR */}
      <AppBar position="static" sx={{ bgcolor: "#1E1E1E", boxShadow: "none", borderBottom: "1px solid #333" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFD600", fontWeight: "bold" }}>
            BeeBark Meet
          </Typography>
          
          <Button color="inherit" onClick={() => navigate("/history")} startIcon={<RestoreIcon sx={{ color: "#AAA" }} />}>
             <span style={{ color: "#AAA" }}>History</span>
          </Button>
          
          <Button 
            color="inherit" 
            onClick={() => { localStorage.removeItem("token"); navigate("/auth"); }}
            startIcon={<LogoutIcon sx={{ color: "#F44336" }} />}
          >
            <span style={{ color: "#F44336" }}>Logout</span>
          </Button>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Grid container sx={{ height: "calc(100vh - 64px)" }}>
        
        {/* LEFT PANEL */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 8 }}>
          <Typography variant="h3" sx={{ color: "white", fontWeight: "800", mb: 2 }}>
            Premium Video Meetings. <br />
            <span style={{ color: "#FFD600" }}>Now Free.</span>
          </Typography>
          <Typography variant="h6" sx={{ color: "#AAA", mb: 6, maxWidth: "500px" }}>
            We engineered the service for secure, high-quality business meetings. 
            Google Meet quality, BeeBark privacy.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {/* NEW MEETING CARD */}
            <Card sx={{ bgcolor: "#1E1E1E", border: "1px solid #333", minWidth: 250, borderRadius: 4 }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box sx={{ bgcolor: "#FFD600", p: 1, borderRadius: 2, display: "flex" }}>
                            <VideoCallIcon sx={{ color: "black" }} />
                        </Box>
                        <Typography variant="h6" color="white">New Meeting</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#888", mb: 3 }}>
                        Start an instant meeting and invite others via link.
                    </Typography>
                    <Button 
                        onClick={handleCreateRandomMeeting} 
                        fullWidth 
                        variant="contained" 
                        sx={{ bgcolor: "#FFD600", color: "black", fontWeight: "bold", '&:hover': { bgcolor: "#FFEA00" } }}
                    >
                        Start Instant
                    </Button>
                </CardContent>
            </Card>

            {/* JOIN MEETING CARD */}
            <Card sx={{ bgcolor: "#1E1E1E", border: "1px solid #333", minWidth: 250, borderRadius: 4 }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box sx={{ bgcolor: "#333", p: 1, borderRadius: 2, display: "flex" }}>
                            <KeyboardIcon sx={{ color: "white" }} />
                        </Box>
                        <Typography variant="h6" color="white">Join Meeting</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#888", mb: 3 }}>
                        Have a code? Enter it below to join instantly.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            placeholder="abc-def"
                            variant="outlined"
                            size="small"
                            sx={{ input: { color: "white" }, fieldset: { borderColor: "#555" } }}
                        />
                        <Button 
                            onClick={handleJoinVideoCall} 
                            variant="outlined" 
                            sx={{ color: "white", borderColor: "#555", '&:hover': { borderColor: "#FFD600", color: "#FFD600" } }}
                        >
                            Join
                        </Button>
                    </Box>
                </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* RIGHT PANEL (IMAGE) */}
        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#000" }}>
           <img 
            src="/hero_illustration.png" // Put a nice transparent PNG here
            alt="Video Call" 
            style={{ maxWidth: "80%", opacity: 0.8 }} 
           />
        </Grid>

      </Grid>
    </Box>
  );
}

export default withAuth(Home);