

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
  Button, TextField, Card, CardContent, Typography, Grid, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar 
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../contexts/AuthContext";
import server from "../environment";
import axios from "axios";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [openSchedule, setOpenSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  
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

  const handleSchedule = async () => {
      if(!scheduleDate) {
          setSnackMsg("Please select a date and time");
          return;
      }
      // You can add backend logic here to save the meeting
      setSnackMsg(`Meeting Scheduled for ${new Date(scheduleDate).toLocaleString()}`);
      setOpenSchedule(false);
      // Optional: Generate a code for them to copy
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100vh", bgcolor: "#121212", overflow: "hidden" }}>
      <AppBar position="static" sx={{ bgcolor: "#1E1E1E", boxShadow: "none", borderBottom: "1px solid #333" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFD600", fontWeight: "bold" }}>
            BeeBark Meet
          </Typography>
          <Button color="inherit" onClick={() => navigate("/history")} startIcon={<RestoreIcon sx={{ color: "#AAA" }} />}>
             <span style={{ color: "#AAA" }}>History</span>
          </Button>
          <Button color="inherit" onClick={() => { localStorage.removeItem("token"); navigate("/auth"); }} startIcon={<LogoutIcon sx={{ color: "#F44336" }} />}>
            <span style={{ color: "#F44336" }}>Logout</span>
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ height: "calc(100vh - 64px)", p: 4 }} spacing={4}>
        <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ color: "white", fontWeight: "800", mb: 2 }}>
            Premium Video Meetings. <br /> <span style={{ color: "#FFD600" }}>Now Free.</span>
          </Typography>
          <Typography variant="h6" sx={{ color: "#AAA", mb: 6 }}>
            Secure, high-quality business meetings. Google Meet quality, BeeBark privacy.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            
            {/* NEW MEETING */}
            <Card sx={{ bgcolor: "#1E1E1E", border: "1px solid #333", borderRadius: 4 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button onClick={handleCreateRandomMeeting} variant="contained" sx={{ bgcolor: "#FFD600", color: "black", fontWeight: "bold", py: 1.5, px: 3 }}>
                        <VideoCallIcon sx={{ mr: 1 }} /> New Meeting
                    </Button>
                    <Button onClick={() => setOpenSchedule(true)} variant="outlined" sx={{ color: "white", borderColor: "#555", py: 1.5 }}>
                        <CalendarMonthIcon sx={{ mr: 1 }} /> Schedule
                    </Button>
                </CardContent>
            </Card>

            {/* JOIN MEETING */}
            <Card sx={{ bgcolor: "#1E1E1E", border: "1px solid #333", borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="body1" sx={{ color: "#888", mb: 1 }}>Join with a code</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            placeholder="abc-def"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ input: { color: "white" }, fieldset: { borderColor: "#555" } }}
                        />
                        <Button onClick={handleJoinVideoCall} variant="text" sx={{ color: "#FFD600", fontWeight: "bold" }}>
                            Join
                        </Button>
                    </Box>
                </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
           <img src="/hero_illustration.png" alt="Connect" style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain" }} />
        </Grid>
      </Grid>

      {/* SCHEDULE MODAL */}
      <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} PaperProps={{ style: { backgroundColor: "#1E1E1E", color: "white", border: "1px solid #333" } }}>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogContent>
            <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>Choose a date and time for your future meeting.</Typography>
            <TextField
                type="datetime-local"
                fullWidth
                variant="outlined"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                sx={{ 
                    input: { color: "white" }, 
                    "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" }, "&:hover fieldset": { borderColor: "#FFD600" } },
                    "& input::-webkit-calendar-picker-indicator": { filter: "invert(1)" }
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenSchedule(false)} sx={{ color: "#aaa" }}>Cancel</Button>
            <Button onClick={handleSchedule} variant="contained" sx={{ bgcolor: "#FFD600", color: "black" }}>Schedule</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snackMsg} autoHideDuration={4000} onClose={() => setSnackMsg("")} message={snackMsg} />
    </Box>
  );
}

export default withAuth(Home);