import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { React, Component } from "react";
import emailjs from "emailjs-com";

export default class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    error: "",
    submitDisable: false,
  };

  handleSubmit = (event) => {
    let templateParams = {
      from_name: this.state.name,
      to_name: "Shivasav Bhasin",
      email: this.state.email,
      phone: this.state.phoneNumber,
      message: this.state.message,
    };

    event.preventDefault();
    this.setState({ submitDisable: true });
    emailjs
      .send("gmail", "template1", templateParams, "user_ybbcvho3bAfMqAidpjQtW")
      .then(
        (response) => {
          this.setState({ submitDisable: false }, () => {
            alert("Your message has been sent!!!");
          });
        },
        (err) => {
          alert("Could not send message!");
          this.setState({ error: true });
        }
      );
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" style={{ color: "grey" }}>
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                Fill up the below form to contact the development team.
              </Typography>
              <form id="#contact-form">
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      placeholder="Enter name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      type="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                      type="number"
                      placeholder="Enter phone number"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="message"
                      value={this.state.message}
                      onChange={this.handleChange}
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={this.handleSubmit}
                      disabled={this.state.submitDisable}
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}
