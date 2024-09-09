import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { React, Component } from "react";

export default class InviteUser extends Component {
  state = {
    courses: [],
    selectedCourse: "",
    selectedSemester: "",
    disableSemDropdown: true,
    courseSemesterCount: [],
    disableSubmit: true,
    disableSubjectDropdown: true,
    selectedSubject: "",
    subjects: [],
    exams: [],
    disableExamDropdown: true,
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
        this.setState({ courseSemesterCount: courseSemesterCount }, () => {
          axios
            .get(
              "http://localhost:5000/api/admin/getSubjects?courseId=" +
                this.state.selectedCourseId +
                "&semester=" +
                this.state.selectedSemester
            )
            .then((resp) => {
              this.setState({ subjects: resp.data });
              // console.log(resp.data);
            });
        });
      }
    );
  };

  handleSemesterDropdownChange = (event) => {
    this.setState(
      {
        selectedSemester: event.target.value,
        disableSubjectDropdown: false,
      },
      () => {
        axios
          .get(
            "http://localhost:5000/api/admin/getSubjects?courseId=" +
              this.state.selectedCourseId +
              "&semester=" +
              this.state.selectedSemester
          )
          .then((resp) => {
            this.setState({ subjects: resp.data });
          });
      }
    );
  };

  handleSubjectDropdownChange = (e) => {
    this.setState({
      selectedSubject: e.target.value,
      selectedSubjectId: this.state.subjects.filter((subject) => {
        return subject.name === e.target.value;
      })[0].id,
    }, () => {
      axios.get("http://localhost:5000/api/admin/getExams?subjectId=" + this.state.selectedSubjectId)
      .then((resp) => {
        this.setState({exams: resp.data, disableExamDropdown: false})
      })
    });
  };

  handleExamDropdownChange = (e) => {
    this.setState({
      selectedExam: e.target.value,
      selectedExamId: this.state.exams.filter((exam) => {
        return exam.id === e.target.value;
      })[0].id,
    })
  }

  handleFileUpload = (e) => {
    this.setState({ disableSubmit: false });
  };

  selectFile = (event) => {
    this.setState({
      selectedFiles: event.target.files,
    });
  };

  upload = (e) => {
    const data = new FormData();
    // console.log(this.state.selectedFiles[0]);
    data.append("file", this.state.selectedFiles[0]);
    axios
      .post(
        "http://localhost:5000/api/admin/inviteUsers?examId=" +
          this.state.selectedExamId,
        data
      )
      .then((res) => {
        alert("Upload Successful!");
      });
    // console.log(e.target.files);
  };

  handleSubmit = () => {
    // console.log({
    //   courseID: this.state.selectedCourseId,
    //   subjectName: this.state.subjectName,
    //   semseter: this.state.selectedSemester,
    // });
    // axios
    //   .post("http://localhost:5000/api/admin/addSubject", {
    //     courseID: this.state.selectedCourseId,
    //     subjectName: this.state.subjectName,
    //     semester: this.state.selectedSemester,
    //   })
    //   .then((resp) => {
    //     console.log(resp.data);
    //     alert(resp.data.message);
    //   });
  };

  render() {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <Paper variant="outlined" elevation={3} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Invite Users
            </Typography>
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
              <InputLabel id="subject-dropdown">Subject</InputLabel>
              <Select
                labelId="subject-dropdown"
                id="subject-dropdown"
                value={this.state.selectedSubject}
                onChange={this.handleSubjectDropdownChange}
                input={<OutlinedInput label="Subject" />}
                // MenuProps={MenuProps}
                style={{ width: 250, marginBottom: 10 }}
                disabled={this.state.disableSubjectDropdown}
              >
                {this.state.subjects.map((el) => (
                  <MenuItem key={el.id} value={el.name}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="exam-dropdown">Exams</InputLabel>
              <Select
                labelId="exam-dropdown"
                id="exam-dropdown"
                value={this.state.selectedExam}
                onChange={this.handleExamDropdownChange}
                input={<OutlinedInput label="Exams" />}
                // MenuProps={MenuProps}
                style={{ width: 250, marginBottom: 10 }}
                disabled={this.state.disableExamDropdown}
              >
                {this.state.exams.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    Exam: {el.id} to be held on - {new Date(el.examDate).toDateString()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullwidth>
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: "none" }}
                  type="file"
                  multiple={false}
                  onChange={this.selectFile}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  Choose Files
                </Button>
              </label>
              <div className="file-name">
                {this.state.selectedFiles && this.state.selectedFiles.length > 0
                  ? this.state.selectedFiles[0].name
                  : null}
              </div>
              <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!this.state.selectedFiles}
                onClick={this.upload}
              >
                Upload
              </Button>
            </FormControl>
            {/* <FormControl fullwidth>
            <Button
              variant="contained"
              disabled={this.state.disableSubmit}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </FormControl> */}
          </Paper>
        </Box>
      </>
    );
  }
}
