import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import * as api from './services/api';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [loading, setLoading] = useState(true);
  const [confirmTask, setConfirmTask] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.getTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    // Check for duplicates (case insensitive)
    const existingTask = tasks.find(
      (task) => task.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (existingTask) {
      if (existingTask.completed) {
        // If it exists and is completed, trigger the custom confirm dialog
        setConfirmTask(existingTask);
        // We will return and wait for the user to click Yes or No in the modal
      } else {
        // If it exists and is NOT completed, show the custom warning modal
        setWarningMessage(`The task "${trimmedTitle}" already exists and is not completed yet!`);
      }
      return;
    }

    try {
      const response = await api.createTask(trimmedTitle, newPriority);
      setTasks([response.data, ...tasks]);
      setNewTitle('');
      setNewPriority('Medium');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleConfirmYes = async () => {
    if (!confirmTask) return;
    try {
      const response = await api.updateTask(confirmTask.id, { completed: false });
      setTasks(tasks.map(t => t.id === confirmTask.id ? response.data : t));
      setNewTitle('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setConfirmTask(null);
  };

  const handleConfirmNo = () => {
    setConfirmTask(null);
  };

  const handleToggle = async (id, completed) => {
    try {
      const response = await api.updateTask(id, { completed: !completed });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handlePriorityUpdate = async (id, nextPriority) => {
    try {
      const response = await api.updateTask(id, { priority: nextPriority });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <div className="header-sticky glass">
        <h1>Todoify</h1>

        <form onSubmit={handleAdd} className="input-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="priority-selector">
            {['Low', 'Medium', 'High'].map((p) => (
              <button
                key={p}
                type="button"
                className={`p-option ${p.toLowerCase()} ${newPriority === p ? 'active' : ''}`}
                onClick={() => setNewPriority(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <button type="submit" className="add-btn">
            <Plus size={20} />
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item glass">
              <div
                className="task-content"
                onClick={() => handleToggle(task.id, task.completed)}
              >
                <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
                  {task.completed && <CheckCircle size={16} color="white" />}
                </div>
                <div className="task-title-group">
                  <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </span>
                </div>
              </div>
              <div className="actions">
                {task.priority && (
                  <select 
                    className={`priority-select-inline priority-${task.priority.toLowerCase()}`}
                    value={task.priority}
                    onChange={(e) => handlePriorityUpdate(task.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent toggling completion
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                  title="Delete Task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginTop: '2rem' }}>
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      )}

      {confirmTask && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h3>Task Already Exists</h3>
            <p>This task was previously added and is currently marked as completed.</p>
            <p>Do you want to mark it as not completed?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmYes} className="btn-yes">Yes</button>
              <button onClick={handleConfirmNo} className="btn-no">No</button>
            </div>
          </div>
        </div>
      )}

      {warningMessage && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h3>Task Already Exists</h3>
            <p>{warningMessage}</p>
            <div className="modal-actions">
              <button 
                onClick={() => setWarningMessage('')} 
                className="btn-no"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
