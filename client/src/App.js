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
          <div>
            <h1>Agents</h1>
          </div>
          <div>
            <ViewAgents />
          </div>
          <div>
            <button className="btn btn-info" onClick={goToApp}>Main Menu</button>
          </div>
    </>
  } else if (currentView === "sec") {
    return <>
      <div>
        <h1>Security Clearances</h1>
      </div>
      <div>
        <ViewSecurityClearance />
      </div>
      <div>
            <button className="btn btn-info" onClick={goToApp}>Main Menu</button>
      </div>
    </>
  }


  return (<>
    <div className="container">
      <div>
          <h1>Field Agents</h1>
      </div>
      <div>
          <button className="btn btn-dark" onClick={editAgents}>Agents</button>
          <button className="btn btn-dark" onClick={editSecurityClearances}>Security Clearances</button>
      </div>
    </div>
  </>
  );
}

export default App;
