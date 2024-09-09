import { React, Component } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Box } from "@mui/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import ViewResultsTable from "./ViewResultsTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default class ViewResults extends Component {
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
    showResults: false,
    resultsData: [],
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
    this.setState(
      {
        selectedSubject: e.target.value,
        selectedSubjectId: this.state.subjects.filter((subject) => {
          return subject.name === e.target.value;
        })[0].id,
      },
      () => {
        axios
          .get(
            `http://localhost:5000/api/admin/getExams?subjectId=${this.state.selectedSubjectId}&filter=all`
          )
          .then((resp) => {
            this.setState({ exams: resp.data, disableExamDropdown: false });
          });
      }
    );
  };

  handleExamDropdownChange = (e) => {
    this.setState({
      disableSubmit: false,
      selectedExam: e.target.value,
      selectedExamId: this.state.exams.filter((exam) => {
        return exam.id === e.target.value;
      })[0].id,
    });
  };

  handleSubmit = (e) => {
    axios
      .get(
        `http://localhost:5000/api/admin/getResults?examId=${this.state.selectedExamId}`
      )
      .then((resp) => {
        this.setState({ resultsData: resp.data, showResults: true });
      });
  };

  render() {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <Paper variant="outlined" elevation={3} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Results
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Select Exam</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <>
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
                          Exam: {el.id} to be held on -{" "}
                          {new Date(el.examDate).toDateString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullwidth>
                    <Button
                      variant="contained"
                      disabled={this.state.disableSubmit}
                      onClick={this.handleSubmit}
                    >
                      Get Results
                    </Button>
                  </FormControl>
                </>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>

        {this.state.showResults && (
          <ViewResultsTable resultsData={this.state.resultsData} />
        )}
      </>
    );
  }
}
