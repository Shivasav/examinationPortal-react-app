import { React, Component } from "react";
import {
  TextField,
  Grid,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Modal,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styles } from "./loginCss.js";
import { AppContext } from "../../Context/AppContext.js";
import Footer from "../Footer/Footer.js";
import Home from "../Home/Home.js";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    open: false,
    showAlert: false,
  };

  static contextType = AppContext;

  constructor(props) {
    super(props);
    console.log("Constructor called");
  }

  handleChange = (event) => {
    switch (event.target.id) {
      case "outlined-name":
        this.setState({ userName: event.target.value });
        break;
      case "outlined-password":
        this.setState({ password: event.target.value });
        break;
      default:
        this.setState({ userName: "", password: "" });
    }
  };

  handleLogin = () => {
    var authObj = {
      username: this.state.userName,
      password: this.state.password,
    };

    this.context.login(authObj, (callback) => {
      if (callback) {
        this.props.history.push("/home");
      } else {
        this.setState({ showAlert: true });
      }
    });
  };

  handleModal = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} style={{zIndex: 1, position: "relative"}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                EXAMine
              </Typography>
              <Button color="inherit" onClick={this.handleModal}>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Modal
          open={this.state.open}
          onClose={this.handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Grid container spacing={2}>
              <Typography variant="h4" style={{ width: "100%", color: "black" }}>
                Sign In
              </Typography>
              <Divider />
              {this.state.showAlert && (
                <Alert
                  severity="error"
                  onClose={() => {
                    this.setState({ showAlert: false });
                  }}
                  style={{ width: "100%" }}
                >
                  <AlertTitle>Sign In Failed!</AlertTitle>
                  Please check your credentials!
                </Alert>
              )}
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Username"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  style={styles.centeredFields}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-password"
                  type="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  style={styles.centeredFields}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={this.handleLogin}
                  style={styles.centeredFields}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        {/* <LoginHome /> */}
        <Home />

        <Footer />
      </>
    );
  }
}

export default Login;
