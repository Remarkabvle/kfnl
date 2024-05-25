import React, { useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [showKanban, setShowKanban] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  const handleGetStarted = () => {
    setShowKanban(true);
  };

  const addStatus = () => {
    if (statuses.length >= 4) {
      alert('Subscribe to Premium for more statuses.');
      return;
    }
    if (newStatus.trim() === '') {
      alert('Status cannot be empty');
      return;
    }
    if (statuses.includes(newStatus)) {
      alert('Status must be unique');
      return;
    }
    setStatuses([...statuses, newStatus]);
    setNewStatus('');
  };

  const removeStatus = (statusToRemove) => {
    setStatuses(statuses.filter(status => status !== statusToRemove));
  };

  return (
    <div className="App">
      {showKanban ? (
        <div className="kanban-board">
          <h2>Kanban Board</h2>
          <div className="add-status">
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Add new status"
            />
            <button onClick={addStatus}>Add</button>
          </div>
          <div className="status-columns">
            {statuses.map(status => (
              <StatusColumn key={status} status={status} removeStatus={removeStatus} />
            ))}
          </div>
        </div>
      ) : (
        <div className="initial-view">
          <h1>Kanban Board</h1>
          <button className="btn" onClick={handleGetStarted}>Get started</button>
        </div>
      )}
    </div>
  );
};

const StatusColumn = ({ status, removeStatus }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    const task = { text: newTask, createdAt: new Date().toLocaleString() };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const removeTask = (taskToRemove) => {
    setTasks(tasks.filter(task => task.text !== taskToRemove.text));
  };

  return (
    <div className="status-column">
      <div className="status-header">
        <h3>{status}</h3>
        {tasks.length === 0 && <button onClick={() => removeStatus(status)}>Remove</button>}
      </div>
      <div className="tasks">
        {tasks.map(task => (
          <div key={task.text} className="task">
            <div className="task-info">
              {task.text}
              <span className="task-time">{task.createdAt}</span>
            </div>
            <button onClick={() => removeTask(task)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default KanbanBoard;
