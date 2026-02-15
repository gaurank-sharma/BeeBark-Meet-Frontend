// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { AuthContext } from "../contexts/AuthContext";
// import { Snackbar, CircularProgress } from "@mui/material";

// const defaultTheme = createTheme();

// export default function Authentiation() {
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [error, setError] = React.useState("");
//   const [message, setMessage] = React.useState("");
//   const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

//   const handleAuth = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       if (formState === 0) {
//         await handleLogin(username, password);
//       } else {
//         let result = await handleRegister(name, username, password);
//         setMessage(result);
//         setOpen(true);
//         setFormState(0);
//         setUsername("");
//         setPassword("");
//         setName("");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>

//             <div>
//               <Button
//                 variant={formState === 0 ? "contained" : "text"}
//                 onClick={() => setFormState(0)}
//               >
//                 Sign In
//               </Button>
//               <Button
//                 variant={formState === 1 ? "contained" : "text"}
//                 onClick={() => setFormState(1)}
//               >
//                 Sign Up
//               </Button>
//             </div>

//             <Box
//               component="form"
//               noValidate
//               sx={{ mt: 1 }}
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAuth();
//               }}
//             >
//               {formState === 1 && (
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="fullname"
//                   label="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               )}

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 id="password"
//               />

//               {error && <p style={{ color: "red" }}>{error}</p>}

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : formState === 0 ? (
//                   "Login"
//                 ) : (
//                   "Register"
//                 )}
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         message={message}
//         onClose={() => setOpen(false)}
//       />
//     </ThemeProvider>
//   );
// }


// import * as React from "react";
// import {
//   Button,
//   CssBaseline,
//   TextField,
//   Paper,
//   Box,
//   Grid,
//   Typography,
//   IconButton,
//   Snackbar,
//   CircularProgress,
//   Stack,
//   Alert,
//   InputAdornment,
// } from "@mui/material";
// import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
// import { AuthContext } from "../contexts/AuthContext";

// // Icons
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import HexagonIcon from "@mui/icons-material/Hexagon"; // Placeholder for BeeBark Logo

// // --- BEEBARK BRAND COLORS ---
// const BRAND = {
//   yellow: "#FFD600", // The signature yellow from your screenshot
//   darkBg: "#121212", // Deep premium black
//   darkPaper: "#1E1E1E", // Slightly lighter card background
//   lightBg: "#F4F6F8",
//   lightPaper: "#FFFFFF",
//   textDark: "#000000",
//   textLight: "#FFFFFF",
// };

// export default function Authentication() {
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [error, setError] = React.useState("");
//   const [message, setMessage] = React.useState("");
//   const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [showPassword, setShowPassword] = React.useState(false);
  
//   // Default to Dark Mode to match your screenshot vibe
//   const [mode, setMode] = React.useState("dark");

//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

//   const toggleColorMode = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // --- CUSTOM THEME ---
//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: {
//             main: BRAND.yellow,
//             contrastText: "#000000", // Black text on yellow button is premium
//           },
//           background: {
//             default: mode === "dark" ? BRAND.darkBg : BRAND.lightBg,
//             paper: mode === "dark" ? BRAND.darkPaper : BRAND.lightPaper,
//           },
//           text: {
//             primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
//             secondary: mode === "dark" ? "#A0A0A0" : "#666666",
//           },
//         },
//         typography: {
//           fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
//           h4: {
//             fontWeight: 800,
//             letterSpacing: "-0.5px",
//           },
//           button: {
//             fontWeight: 700,
//             textTransform: "none", // Remove uppercase for modern look
//             fontSize: "1rem",
//           },
//         },
//         components: {
//           MuiButton: {
//             styleOverrides: {
//               root: {
//                 borderRadius: 12,
//                 padding: "12px 24px",
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: "0 4px 12px rgba(255, 214, 0, 0.4)", // Yellow glow on hover
//                 },
//               },
//               outlined: {
//                 borderColor: mode === "dark" ? "#444" : "#ddd",
//                 color: mode === "dark" ? "#fff" : "#000",
//                 "&:hover": {
//                   borderColor: BRAND.yellow,
//                   backgroundColor: alpha(BRAND.yellow, 0.05),
//                 },
//               },
//             },
//           },
//           MuiTextField: {
//             styleOverrides: {
//               root: {
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 12,
//                   backgroundColor: mode === "dark" ? "#2C2C2C" : "#F9F9F9",
//                   "& fieldset": {
//                     border: "1px solid",
//                     borderColor: mode === "dark" ? "#333" : "#E0E0E0",
//                     transition: "border-color 0.2s",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: mode === "dark" ? "#666" : "#999",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: BRAND.yellow, // Yellow border on focus
//                     borderWidth: 2,
//                   },
//                 },
//                 "& .MuiInputLabel-root.Mui-focused": {
//                   color: BRAND.yellow,
//                 },
//               },
//             },
//           },
//           MuiPaper: {
//             styleOverrides: {
//               root: {
//                 backgroundImage: "none",
//               },
//             },
//           },
//         },
//       }),
//     [mode]
//   );

//   const handleAuth = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       if (formState === 0) {
//         await handleLogin(username, password);
//       } else {
//         let result = await handleRegister(name, username, password);
//         setMessage(result);
//         setOpen(true);
//         setFormState(0);
//         setUsername("");
//         setPassword("");
//         setName("");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
//         <CssBaseline />
        
//         {/* LEFT SIDE: HERO / BRANDING */}
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             background: mode === "dark" 
//               ? "radial-gradient(circle at 10% 20%, #2A2A2A 0%, #000000 90%)" 
//               : "#F0F2F5",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//             p: 4
//           }}
//         >
//           {/* Decorative Elements mimicking the dashboard look */}
//           <Box sx={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
//              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: mode === "dark" ? "#fff" : "#000" }}>
//                 Design. Build.<br />
//                 <span style={{ color: BRAND.yellow }}>Dominate.</span>
//              </Typography>
//              <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 480, lineHeight: 1.6 }}>
//                 Access our elite design team. We craft high-performance websites and marketing funnels specifically for your industry.
//              </Typography>
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE: AUTH FORM */}
//         <Grid 
//           item 
//           xs={12} 
//           sm={8} 
//           md={5} 
//           component={Paper} 
//           elevation={0} 
//           square
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative"
//           }}
//         >
//           {/* Theme Toggle */}
//           <IconButton 
//             onClick={toggleColorMode} 
//             sx={{ position: "absolute", top: 20, right: 20 }}
//           >
//             {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>

//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               maxWidth: 400,
//             }}
//           >
//             {/* LOGO */}
//             <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 6 }}>
//                 <HexagonIcon sx={{ color: BRAND.yellow, fontSize: 40 }} />
//                 <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
//                     BeeBark
//                 </Typography>
//             </Stack>

//             <Typography variant="h4" gutterBottom>
//               {formState === 0 ? "Welcome back" : "Create account"}
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//               {formState === 0 
//                 ? "Please enter your details to sign in." 
//                 : "Enter your details to get started."}
//             </Typography>

//             <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
              
//               {formState === 1 && (
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="fullname"
//                   label="Full Name"
//                   name="fullname"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="e.g. Gaurank Sharma"
//                   InputLabelProps={{ shrink: true }}
//                 />
//               )}

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 InputLabelProps={{ shrink: true }}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {error && (
//                 <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 disabled={loading}
//                 sx={{ mt: 4, mb: 3, height: 50, fontSize: "1.1rem" }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : (formState === 0 ? "Sign In" : "Sign Up")}
//               </Button>

//               <Stack direction="row" justifyContent="center" spacing={1}>
//                 <Typography color="text.secondary">
//                   {formState === 0 ? "Don't have an account?" : "Already have an account?"}
//                 </Typography>
//                 <Typography 
//                   onClick={() => { setFormState(formState === 0 ? 1 : 0); setError(""); }}
//                   sx={{ 
//                     color: "text.primary", 
//                     fontWeight: 600, 
//                     cursor: "pointer",
//                     "&:hover": { textDecoration: "underline" }
//                   }}
//                 >
//                   {formState === 0 ? "Sign up" : "Sign in"}
//                 </Typography>
//               </Stack>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         message={message}
//         onClose={() => setOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       />
//     </ThemeProvider>
//   );
// }



import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  CircularProgress,
  Stack,
  Alert,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HexagonIcon from "@mui/icons-material/Hexagon"; 

// --- BEEBARK BRAND COLORS ---
const BRAND = {
  yellow: "#FFD600", 
  darkBg: "#121212", 
  darkPaper: "#1E1E1E", 
  lightBg: "#F4F6F8",
  lightPaper: "#FFFFFF",
  textDark: "#000000",
  textLight: "#FFFFFF",
};

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState(""); // Added Email State
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const [mode, setMode] = React.useState("dark");

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: BRAND.yellow,
            contrastText: "#000000",
          },
          background: {
            default: mode === "dark" ? BRAND.darkBg : BRAND.lightBg,
            paper: mode === "dark" ? BRAND.darkPaper : BRAND.lightPaper,
          },
          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
            secondary: mode === "dark" ? "#A0A0A0" : "#666666",
          },
        },
        typography: {
          fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
          h4: { fontWeight: 800, letterSpacing: "-0.5px" },
          button: { fontWeight: 700, textTransform: "none", fontSize: "1rem" },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                padding: "12px 24px",
                boxShadow: "none",
                "&:hover": { boxShadow: "0 4px 12px rgba(255, 214, 0, 0.4)" },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 12,
                  backgroundColor: mode === "dark" ? "#2C2C2C" : "#F9F9F9",
                  "& fieldset": {
                    border: "1px solid",
                    borderColor: mode === "dark" ? "#333" : "#E0E0E0",
                    transition: "border-color 0.2s",
                  },
                  "&:hover fieldset": { borderColor: mode === "dark" ? "#666" : "#999" },
                  "&.Mui-focused fieldset": {
                    borderColor: BRAND.yellow,
                    borderWidth: 2,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: BRAND.yellow },
              },
            },
          },
        },
      }),
    [mode]
  );

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        // Updated to include email in the register call
        let result = await handleRegister(name, username, password, email);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        
        // Reset fields
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
        <CssBaseline />
        
        {/* LEFT SIDE: HERO / BRANDING */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: mode === "dark" 
              ? "radial-gradient(circle at 10% 20%, #2A2A2A 0%, #000000 90%)" 
              : "#F0F2F5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            p: 4
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
             <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: mode === "dark" ? "#fff" : "#000" }}>
                Design. Build.<br />
                <span style={{ color: BRAND.yellow }}>Dominate.</span>
             </Typography>
             <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 480, lineHeight: 1.6 }}>
                Access our elite design team. We craft high-performance websites and marketing funnels specifically for your industry.
             </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE: AUTH FORM */}
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={0} 
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <IconButton 
            onClick={toggleColorMode} 
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 6 }}>
                <HexagonIcon sx={{ color: BRAND.yellow, fontSize: 40 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                    BeeBark
                </Typography>
            </Stack>

            <Typography variant="h4" gutterBottom>
              {formState === 0 ? "Welcome back" : "Create account"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {formState === 0 
                ? "Please enter your details to sign in." 
                : "Enter your details to get started."}
            </Typography>

            <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
              
              {formState === 1 && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    name="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gaurank Sharma"
                    InputLabelProps={{ shrink: true }}
                  />
                  
                  {/* Added Email Input Field */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. gaurank@example.com"
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 4, mb: 3, height: 50, fontSize: "1.1rem" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (formState === 0 ? "Sign In" : "Sign Up")}
              </Button>

              <Stack direction="row" justifyContent="center" spacing={1}>
                <Typography color="text.secondary">
                  {formState === 0 ? "Don't have an account?" : "Already have an account?"}
                </Typography>
                <Typography 
                  onClick={() => { setFormState(formState === 0 ? 1 : 0); setError(""); }}
                  sx={{ 
                    color: "text.primary", 
                    fontWeight: 600, 
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {formState === 0 ? "Sign up" : "Sign in"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </ThemeProvider>
  );
}