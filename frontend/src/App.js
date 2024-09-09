// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Context/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import TakeExamContainer from "./components/TakeExam/TakeExamContainer";
import ThankYou from "./components/TakeExam/ThankYou";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/home" component={NavBar} />
        <Route path="/takeExam/:invitationId" component={TakeExamContainer} />
        <Route path="/thankyou" component={ThankYou} />
      </Switch>
      {/* <Login /> */}
    </div>
  );
}

export default App;
