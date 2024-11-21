import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import { TaskProvider } from "./context/TaskContext";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/task" />} />
          <Route path="/task" element={<TaskPage />} />
          {/* 404  */}
          <Route path="*" element={<Navigate to="/task" />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
