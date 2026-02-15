// import { useContext, useState } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
// import "../styles/Home.css";
// import { Button, IconButton, TextField } from "@mui/material";
// import RestoreIcon from "@mui/icons-material/Restore";
// import { AuthContext } from "../contexts/AuthContext";

// function Home() {
//   let navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");

//   const { addToUserHistory } = useContext(AuthContext);
//   let handleJoinVideoCall = async () => {
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   return (
//     <>
//       <div className="navBar">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2>Video Call</h2>
//         </div>

//         <div style={{ display: "flex", alignItems: "center" }}>
//           <IconButton
//             onClick={() => {
//               navigate("/history");
//             }}
//           >
//             <RestoreIcon />
//           <p>History</p>
//           </IconButton>

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
//           <div>
//             <h2>Providing Quality Video Call</h2>

//             <div style={{ display: "flex", gap: "10px", marginTop: "10px"}}>
//               <TextField
//                 onChange={(e) => setMeetingCode(e.target.value)}
//                 id="outlined-basic"
//                 label="Meeting Code"
//                 variant="outlined"
//               />
//               <Button onClick={handleJoinVideoCall} variant="contained">
//                 Join
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="rightPanel">
//           <img srcSet="/logo3.png" alt="" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default withAuth(Home);



import React, { useContext, useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { 
  Button, IconButton, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Autocomplete, Grid, Card, CardContent, Typography 
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

// Helper to generate random 6-character code
const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8);
}

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [open, setOpen] = useState(false); // Modal state
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [scheduleDate, setScheduleDate] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/users/get_all_users");
            setAllUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    fetchUsers();
  }, []);

  let handleJoinVideoCall = async () => {
    if(meetingCode.trim() === "") return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  let handleCreateRandomMeeting = async () => {
      const randomCode = generateRandomCode();
      await addToUserHistory(randomCode);
      navigate(`/${randomCode}`);
  }

  const handleScheduleMeeting = async () => {
      const randomCode = generateRandomCode();
      const token = localStorage.getItem("token");
      
      try {
          await axios.post("http://localhost:8000/api/v1/users/schedule_meeting", {
              token: token,
              meetingCode: randomCode,
              date: scheduleDate,
              invitedUsers: selectedUsers.map(u => u.email) // sending emails
          });
          alert("Meeting Scheduled & Emails Sent!");
          setOpen(false);
      } catch (e) {
          console.log(e);
          alert("Error scheduling meeting");
      }
  }

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div style={{marginBottom: "40px"}}>
            <h1>Quality Video Calls for Everyone</h1>
            <p>Connect, collaborate, and celebrate from anywhere with secure video calling.</p>
          </div>

            <Grid container spacing={3}>
                {/* Option 1: Instant Meeting */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" style={{height: '100%'}}>
                        <CardContent>
                             <div style={{display:'flex', alignItems:'center', gap: '10px', marginBottom: '15px'}}>
                                <VideoCallIcon fontSize="large" color="primary"/>
                                <Typography variant="h6">New Meeting</Typography>
                             </div>
                             <Typography variant="body2" color="textSecondary" style={{marginBottom: '15px'}}>
                                Create a new meeting instantly and share the link.
                             </Typography>
                             <div style={{display:'flex', gap:'10px'}}>
                                <Button onClick={handleCreateRandomMeeting} variant="contained" fullWidth>
                                    Start Instant
                                </Button>
                                <Button onClick={() => setOpen(true)} variant="outlined" fullWidth>
                                    Schedule
                                </Button>
                             </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Option 2: Join Meeting */}
                <Grid item xs={12} md={6}>
                     <Card variant="outlined" style={{height: '100%'}}>
                        <CardContent>
                            <div style={{display:'flex', alignItems:'center', gap: '10px', marginBottom: '15px'}}>
                                <KeyboardIcon fontSize="large" color="secondary"/>
                                <Typography variant="h6">Join Meeting</Typography>
                             </div>
                             <Typography variant="body2" color="textSecondary" style={{marginBottom: '15px'}}>
                                Enter the code shared by the organizer.
                             </Typography>
                            <div style={{ display: "flex", gap: "10px" }}>
                            <TextField
                                onChange={(e) => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Enter Code"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                            <Button onClick={handleJoinVideoCall} variant="contained" color="secondary">
                                Join
                            </Button>
                            </div>
                        </CardContent>
                     </Card>
                </Grid>
            </Grid>
        </div>

        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" style={{maxWidth: '100%'}} />
        </div>
      </div>

      {/* Scheduling Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogContent>
            <div style={{display:'flex', flexDirection:'column', gap: '20px', marginTop:'10px'}}>
                <TextField 
                    label="Meeting Date & Time"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    fullWidth
                />

                <Autocomplete
                    multiple
                    options={allUsers}
                    getOptionLabel={(option) => option.name + ` (${option.username})`}
                    onChange={(event, newValue) => setSelectedUsers(newValue)}
                    renderInput={(params) => (
                    <TextField {...params} label="Select Participants" placeholder="Users" />
                    )}
                />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleScheduleMeeting} variant="contained">Schedule & Send Email</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withAuth(Home);