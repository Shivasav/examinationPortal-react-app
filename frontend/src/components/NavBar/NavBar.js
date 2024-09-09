import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { AppContext } from "../../Context/AppContext";
import CreateExam from "../CreateExam/CreateExam";
import AddQuestionSet from "../AddQuestionSet/AddQuestionSet";
import AddSubject from "../AddSubject/AddSubject";
import InviteUser from "../InviteUser/InviteUser";
import ViewResults from "../ViewResults/ViewResults";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";

const drawerWidth = 240;

function NavBar(props) {
  //   const context = React.useContext(AppContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [view, setView] = React.useState("About");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   function stringToColor(string) {
  //     let hash = 0;
  //     let i;

  //     /* eslint-disable no-bitwise */
  //     for (i = 0; i < string.length; i += 1) {
  //       hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //     }

  //     let color = "#";

  //     for (i = 0; i < 3; i += 1) {
  //       const value = (hash >> (i * 8)) & 0xff;
  //       color += `00${value.toString(16)}`.substr(-2);
  //     }
  //     /* eslint-enable no-bitwise */

  //     return color;
  //   }

  //   function stringAvatar(name) {
  //     return {
  //       sx: {
  //         bgcolor: stringToColor(name),
  //       },
  //       children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  //     };
  //   }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          "Create Exam",
          "Add Question Set",
          "Add Subjects",
          "Invite Users",
          "View Exam Results",
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => setView(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["About", "Contact Us"].map((text, index) => (
          <ListItem button key={text} onClick={() => setView(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EXAMine
          </Typography>
        </Toolbar>
        {/* <Avatar {...stringAvatar(context.name)} /> */}
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {view === "Create Exam" && <CreateExam />}
        {view === "Add Question Set" && <AddQuestionSet />}
        {view === "Add Subjects" && <AddSubject />}
        {view === "Invite Users" && <InviteUser />}
        {view === "View Exam Results" && <ViewResults />}
        {view === "Contact Us" && <ContactUs />}
        {view === "About" && <AboutUs />}
      </Box>
    </Box>
  );
}

export default NavBar;
