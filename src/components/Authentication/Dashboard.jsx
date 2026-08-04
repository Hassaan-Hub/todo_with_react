import { signOut } from 'firebase/auth';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';

const Dashboard = () => {

  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
        console.log("log out hogaya");
      }).catch((error) => {
        console.log(error);
      });
  }

  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const addOrUpdateTodo = () => {
    if (!value.trim()) return;
    if (editIndex !== null) {
      setTodo(todo.map((item, index) => (index === editIndex ? value : item)));
      setCompleted(completed.map((done, index) => (index === editIndex ? false : done)));
      setEditIndex(null);
      setValue("");
    } else {
      setTodo([...todo, value]);
      setCompleted([...completed, false]);
      setValue("");
    }
  };

  const deleteTodo = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
    setCompleted(completed.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setCompleted(completed.map((done, i) => (i === index ? !done : done)));
  };

  const clearAll = () => {
    setTodo([]);
    setCompleted([]);
    setShowConfirm(false);
  };

  const startEdit = (index) => {
    setValue(todo[index]);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setValue("");
  };

  const pendingCount = todo.filter((_, i) => !completed[i]).length;

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900">My Todos</h1>
            <p className="truncate text-xs text-slate-500">
              {todo.length === 0 ? "No tasks yet" : `${todo.length} ${todo.length === 1 ? "task" : "tasks"} · ${pendingCount} pending`}
            </p>
          </div>
          <button
            onClick={() => logout()}
            className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addOrUpdateTodo(); }}
              placeholder={editIndex !== null ? "Edit your task…" : "Add a new task…"}
              aria-label="Todo text"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              onClick={addOrUpdateTodo}
              className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-indigo-500 active:scale-95"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {editIndex !== null && (
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">Editing this task.</p>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded px-2 py-1 text-xs font-medium text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          )}

          {todo.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-base font-semibold text-slate-700">No todos yet</p>
              <p className="mt-1 text-sm text-slate-500">Add one above to get started.</p>
            </div>
          ) : (
            <>
              <ul className="mt-5 space-y-2">
                {todo.map((v, i) => (
                  <li
                    key={i}
                    className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2 transition-colors duration-150 hover:bg-white hover:shadow-sm"
                  >
                    <input
                      type="checkbox"
                      checked={completed[i] || false}
                      onChange={() => toggleTodo(i)}
                      aria-label={`Mark "${v}" as ${completed[i] ? "active" : "complete"}`}
                      className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className={`min-w-0 flex-1 truncate text-sm ${completed[i] ? "text-slate-400 line-through" : "text-slate-800"}`}>
                      {v}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(i)}
                        aria-label={`Edit "${v}"`}
                        className="rounded p-1 text-slate-400 transition-colors duration-150 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTodo(i)}
                        aria-label={`Delete "${v}"`}
                        className="rounded p-1 text-slate-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-500">{pendingCount} of {todo.length} pending</p>
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors duration-150 hover:bg-red-50"
                >
                  Delete All
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setShowConfirm(false)} />
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 id="confirm-title" className="text-lg font-bold text-slate-900">Delete all todos?</h2>
            <p className="mt-1 text-sm text-slate-500">
              This will permanently remove all {todo.length} of your tasks. This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
