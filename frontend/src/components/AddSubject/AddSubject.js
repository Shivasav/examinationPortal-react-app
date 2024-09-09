import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { React, Component } from "react";

export default class AddSubject extends Component {
  state = {
    courses: [],
    selectedCourse: "",
    selectedSemester: "",
    disableSemDropdown: true,
    courseSemesterCount: [],
    disableSubmit: true,
    disableSubject: true,
    subjectName: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/admin/getCourseDetails")
      .then((resp) => {
        this.setState({ courses: resp.data });
      });
  }

  handleCourseDropdownChange = (event) => {
    this.setState(
      {
        selectedCourse: event.target.value,
        disableSemDropdown: false,
        selectedCourseId: this.state.courses.filter((course) => {
          return course.name === event.target.value;
        })[0].id,
      },
      () => {
        var semesterCount = this.state.courses.filter((el) => {
          return el.name === this.state.selectedCourse;
        })[0].semesterCount;

        var courseSemesterCount = [];
        for (var i = 1; i <= semesterCount; i++) {
          courseSemesterCount.push(i);
        }
        this.setState({ courseSemesterCount: courseSemesterCount });
      }
    );
  };

  handleSemesterDropdownChange = (event) => {
    this.setState({
      selectedSemester: event.target.value,
      disableSubject: false,
    });
  };

  handleSubjectChange = (e) => {
    this.setState({ subjectName: e.target.value, disableSubmit: false });
  };

  handleSubmit = () => {
    console.log({
      courseID: this.state.selectedCourseId,
      subjectName: this.state.subjectName,
      semseter: this.state.selectedSemester,
    });

    axios
      .post("http://localhost:5000/api/admin/addSubject", {
        courseID: this.state.selectedCourseId,
        subjectName: this.state.subjectName,
        semester: this.state.selectedSemester,
      })
      .then((resp) => {
        console.log(resp.data);
        alert(resp.data.message);
      });
  };

  render() {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="course-dropdown">Course</InputLabel>
            <Select
              labelId="course-dropdown"
              id="course-dropdown"
              value={this.state.selectedCourse}
              onChange={this.handleCourseDropdownChange}
              input={<OutlinedInput label="Course" />}
              // MenuProps={MenuProps}
              style={{ width: 250, marginBottom: 10 }}
            >
              {this.state.courses.map((el) => (
                <MenuItem key={el.id} value={el.name}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="semester-dropdown">Semester</InputLabel>
            <Select
              labelId="semester-dropdown"
              id="semester-dropdown"
              value={this.state.selectedSemester}
              onChange={this.handleSemesterDropdownChange}
              input={<OutlinedInput label="Semester" />}
              // MenuProps={MenuProps}
              style={{ width: 250, marginBottom: 10 }}
              disabled={this.state.disableSemDropdown}
            >
              {this.state.courseSemesterCount.map((el) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-required"
              label="Subject Name"
              placeholder="Enter the subject name"
              style={{ width: 350, marginBottom: 10 }}
              disabled={this.state.disableSubject}
              value={this.state.subjectName}
              onChange={this.handleSubjectChange}
            />
          </FormControl>
          <FormControl fullwidth>
            <Button
              variant="contained"
              disabled={this.state.disableSubmit}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </>
    );
  }
}
