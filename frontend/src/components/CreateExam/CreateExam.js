import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { React, Component } from "react";
import Taxonomy from "../../assets/images/taxonomy.jpeg";

export default class CreateExam extends Component {
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
    examDate: "2021-10-26",
    questionsCount: 0,
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
            // console.log(resp.data);
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
      disableSubmit: false,
    });
  };

  changeExamDate = (e) => {
    this.setState({ examDate: e.target.value });
  };

  handleQuestionsCount = (e) => {
    this.setState({ questionsCount: e.target.value });
  };

  handleSubmit = () => {
    // console.log({
    //   subjectId: this.state.selectedSubjectId,
    //   questionCount: this.state.questionsCount,
    //   examDate: this.state.examDate,
    // });
    axios
      .post("http://localhost:5000/api/admin/createExam", {
        subjectId: this.state.selectedSubjectId,
        questionCount: this.state.questionsCount,
        examDate: this.state.examDate,
      })
      .then((resp) => {
        alert(resp.data.message);
      });
  };

  render() {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <Paper variant="outlined" elevation={3} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Create Exam
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="subject-dropdown">Subject</InputLabel>
                  <Select
                    labelId="subject-dropdown"
                    id="subject-dropdown"
                    value={this.state.selectedSubject}
                    onChange={this.handleSubjectDropdownChange}
                    input={<OutlinedInput label="Subject" />}
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="exam-date"
                  label="Date of Exam"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="datetime-local"
                  value={this.state.examDate}
                  onChange={this.changeExamDate}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-questions-count"
                  label="Questions Count"
                  value={this.state.questionsCount}
                  onChange={this.handleQuestionsCount}
                />
              </Grid>
            </Grid>

            <FormControl fullwidth>
              <Button
                variant="contained"
                disabled={this.state.disableSubmit}
                onClick={this.handleSubmit}
                style={{ marginTop: 5 }}
              >
                Setup Exam
              </Button>
            </FormControl>
          </Paper>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Paper variant="outlined" elevation={3} style={{ padding: 10 }}>
          <img src={Taxonomy} width={750} height={500} alt="taxonomy"/>
          </Paper>
        </Box>
      </>
    );
  }
}
