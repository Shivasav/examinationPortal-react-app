import { React, Component } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridToolbarContainer,
  gridClasses,
  GridToolbarExport,
} from "@mui/x-data-grid";

export default class ViewResultsTable extends Component {
  state = {
    rows: [],
    columns: [
      { field: "id", headerName: "ID", width: 200 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "subjectName", headerName: "Subject Name", width: 200 },
      { field: "score", headerName: "Score", width: 150 },
      { field: "status", headerName: "Status", width: 200 },
    ],
  };

  componentDidMount() {
    this.setState({ rows: this.props.resultsData });
  }

  customToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1}}>
          <DataGrid
            rows={this.state.rows}
            columns={this.state.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            components={{
              Toolbar: this.customToolbar,
            }}
          />
        </div>
      </div>
    );
  }
}
