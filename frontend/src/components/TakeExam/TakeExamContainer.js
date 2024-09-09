import React, { Component } from "react";
import TakeExam from "./TakeExam";
import Timer from "./Timer";
import {
    Button,
    Divider,
    Grid,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/system";

export default class TakeExamContainer extends Component {
  state = {
    hoursMinSecs: { hours: 1, minutes: 0, seconds: 5 },
    update: false,
    showModal: true,
    userName: ""
  };

  componentDidMount() {
    if (!sessionStorage.getItem("timer")) {
      sessionStorage.setItem("timer", JSON.stringify(this.state.hoursMinSecs));
      this.setState({ update: true });
    }
  }

  handleChange = (event) => {
    switch (event.target.id) {
      case "outlined-name":
        this.setState({ userName: event.target.value });
        break;
      default:
        this.setState({ userName: "" });
    }
  };

  handleLogin = (e) => {
      this.setState({showModal: false})
  }

  render() {
    const styles = {
        centeredFields: {
          margin: "5px 0px 5px 0px",
          width: "100%",
        },
        modal: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          border: "2px solid #000",
          boxShadow: "24px",
          p: 4,
        },
      };
    return this.state.showModal ? (
      <Modal
        open={this.state.showModal}
        onClose={this.handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableBackdropClick
      >
        <Box sx={styles.modal}>
          <Grid container spacing={2}>
            <Typography variant="h4" style={{ width: "100%" }}>
              Sign In
            </Typography>
            <Divider />
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Email ID"
                value={this.state.userName}
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
                Start Test
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    ) : sessionStorage.getItem("timer") ? (
      <>
        <Timer hoursMinSecs={JSON.parse(sessionStorage.getItem("timer"))} />
        <TakeExam invitationId={this.props.match.params.invitationId} emailId={this.state.userName} />
      </>
    ) : (
      <></>
    );
  }
}
