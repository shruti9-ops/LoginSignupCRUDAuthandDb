import React, { useEffect, useState } from "react";
import "./Todo.css";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { ref, set, push, onValue, remove, update } from "firebase/database";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewtodo] = useState("");
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const user = auth.currentUser;
  const uid = user?.uid;

  useEffect(() => {
    if (!uid) return;

    onValue(ref(db, `users/${uid}`), (snap) => {
      const d = snap.val();
      if (d) setUsername(`${d.firstName} ${d.lastName}`);
    });

    onValue(ref(db, `users/${uid}/todos`), (snap) => {
      const data = snap.val();
      if (data) {
        setTodos(Object.entries(data).map(([id, v]) => ({ id, ...v })));
      } else setTodos([]);
    });
  }, [uid]);

  const addTask = async () => {
    if (!newtodo.trim()) return;
    const todoRef = push(ref(db, `users/${uid}/todos`));
    await set(todoRef, { task: newtodo, isdone: false });
    setNewtodo("");
  };

  const saveEdit = async (id) => {
    await update(ref(db, `users/${uid}/todos/${id}`), { task: editText });
    setEditId(null);
  };

  return (
    <div className="todo-bg">
      <div className="todo-card">
        {/* HEADER */}
        <div className="todo-header">
          <div>
            <h2>Welcome 👋</h2>
            <p>{username}</p>
          </div>
          <button className="logout" onClick={() => signOut(auth)}>Sign Out</button>
        </div>

        {/* ADD */}
        <div className="add-box">
          <input
            placeholder="Add a new task…"
            value={newtodo}
            onChange={(e) => setNewtodo(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        {/* LIST */}
        <ul>
          {todos.map(td => (
            <li key={td.id} className={td.isdone ? "done" : ""}>
              {editId === td.id ? (
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>{td.task}</span>
              )}

              <div className="actions">
                {editId === td.id ? (
                  <>
                    <button className="save" onClick={() => saveEdit(td.id)}>Save</button>
                    <button className="cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {!td.isdone && (
                      <button
                        className="done-btn"
                        onClick={() => update(ref(db, `users/${uid}/todos/${td.id}`), { isdone: true })}
                      >
                        Done
                      </button>
                    )}
                    <button className="edit" onClick={() => { setEditId(td.id); setEditText(td.task); }}>Edit</button>
                    <button className="delete" onClick={() => remove(ref(db, `users/${uid}/todos/${td.id}`))}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
