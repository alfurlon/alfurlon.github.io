import { useState } from 'react';
import ViewAgents from "./Agent/ViewAgents";
import ViewSecurityClearance from './SecurityClearance/ViewSecurityClearance';
import './App.css';

function App() {

  const [currentView, setCurrentView] = useState("app");

  const editAgents = () => {
    setCurrentView("agent");
  }

  const editSecurityClearances = () => {
    setCurrentView("sec");
  }

  const goToApp = () => {
    setCurrentView("app");
  }
  

  if (currentView === "agent") {
    return <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-3">
              <h1>Agents</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ViewAgents />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-info" onClick={goToApp}>Main Menu</button>
            </div>
          </div>
        </div>
    </>
  } else if (currentView === "sec") {
    return <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
            <h1>Security Clearances</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <ViewSecurityClearance />
        </div>
      </div>
      <div className="row">
        <div className="col">
            <button className="btn btn-info" onClick={goToApp}>Main Menu</button>
        </div>
      </div>
    </div>
    </>
  }


  return (<>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
            <h1 className="display-1">Field Agents</h1>
        </div>
      </div>
      <div className="row justify-content-evenly">
        <div className="col-3">
            <button className="btn btn-dark" onClick={editAgents}>Agents</button>
        </div>
        <div className="col-3">
            <button className="btn btn-dark" onClick={editSecurityClearances}>Security Clearances</button>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
