import React, { useState } from "react";
import "./KanbanBoard.css";

const initialData = [
  { id: 1, title: "Eating", desc: "Meal time", status: "ready" },
  { id: 2, title: "Waking up late", desc: "Oversleeping", status: "working" },
  { id: 3, title: "Studying", desc: "Homework", status: "stuck" },
  { id: 4, title: "Reading book", desc: "Reading", status: "stuck" },
  { id: 5, title: "Daily plans completed", desc: "Tasks done", status: "done" },
];

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState({ title: "", desc: "", status: "ready" });
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const id = new Date().getTime();
    const newItem = {
      id,
      title: newTask.title,
      desc: newTask.desc,
      status: newTask.status,
    };
    setData((prevData) => [...prevData, newItem]);
    setNewTask({ title: "", desc: "", status: "ready" });
    setShowModal(false);
  };

  const filterByStatus = (status) => {
    return data
      .filter((el) => el.status === status)
      .map((el) => (
        <div key={el.id} className="kanban__item">
          <p>{el.title}</p>
          <p className="kanban__commit">{el.desc}</p>
          <div className="kanban__status">
            <select
              value={el.status}
              onChange={(e) => handleStatusChange(el.id, e.target.value)}
            >
              <option value="ready">ready</option>
              <option value="working">working</option>
              <option value="stuck">stuck</option>
              <option value="done">done</option>
            </select>
            <span>{new Date().toLocaleTimeString()}</span>
            <button onClick={() => handleDelete(el.id)}>🗑️</button>
          </div>
        </div>
      ));
  };

  const readyItems = filterByStatus("ready");
  const workingItems = filterByStatus("working");
  const stuckItems = filterByStatus("stuck");
  const doneItems = filterByStatus("done");

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn" onClick={() => setShowModal(true)}>Add</button>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal__content">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h2>Add New Task</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTask.desc}
                  onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
                />
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option value="ready">Ready</option>
                  <option value="working">Working</option>
                  <option value="stuck">Stuck</option>
                  <option value="done">Done</option>
                </select>
                <button className="kanban__btn" onClick={handleAdd}>Add Task</button>
              </div>
            </div>
          )}
          <div className="kanban__wrapper">
            <div className="kanban__box ready">
              <div className="kanban__heading">
                <p>Ready to start / {readyItems.length}</p>
              </div>
              <div className="kanban__block">{readyItems}</div>
              <button onClick={() => setShowModal(true)} className="kanban__add_btn">
                Add item
              </button>
            </div>
            <div className="kanban__box working">
              <div className="kanban__heading">
                <p>Working to start / {workingItems.length}</p>
              </div>
              <div className="kanban__block">{workingItems}</div>
              <button onClick={() => setShowModal(true)} className="kanban__add_btn">
                Add item
              </button>
            </div>
            <div className="kanban__box stuck">
              <div className="kanban__heading">
                <p>Stuck to start / {stuckItems.length}</p>
              </div>
              <div className="kanban__block">{stuckItems}</div>
              <button onClick={() => setShowModal(true)} className="kanban__add_btn">
                Add item
              </button>
            </div>
            <div className="kanban__box done">
              <div className="kanban__heading">
                <p>Done to start / {doneItems.length}</p>
              </div>
              <div className="kanban__block">{doneItems}</div>
              <button onClick={() => setShowModal(true)} className="kanban__add_btn">
                Add item
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
