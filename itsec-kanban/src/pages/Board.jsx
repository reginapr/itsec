import React, { useState } from "react";
import Column from '../components/board/Column';
import Sidebar from "../components/navigation/Sidebar";

// Dummy user name
const userName = "Reggie";

// Dummy tasks
const initTasks = [
  { id: 1,
    title: 'Design User Interface',
    status: 'todo',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a... ',
    assignees: [{ type: "Design", text: "Design" }]
  },
  { id: 2,
    title: 'Design a Sign Up Page',
    status: 'doing',
    description: '',
    assignees: [{ type: "Design", text: "Design" }]
  },
  { id: 3,
    title: 'Research Target Audience',
    status: 'done',
    description: 'Add tests for auth',
    attachments: [
        {id: 1, name: 'forms.google.com/test', url: 'https://forms.google.com/test', type: 'file'}
    ],
  },
  { id: 4,
    title: 'Setup Backend Infrastructures',
    status: 'todo',
    description: 'Gather insights on potential users needs and behaviors.',
    assignees: [{ type: "Backend", text: "Backend" }],
    attachments: [
        {id: 1, name: 'docs.google.com/test', url: 'https://docs.google.com/test', type: 'file'},
        {id: 2, name: 'poster.png', url: 'https://example.com/poster.png', type: 'image'}
    ],
  },
  { id: 5,
    title: 'Develop Authentication Module',
    status: 'doing',
    description: 'Prepare the server environment and database for app development.',
    assignees: [{ type: "Backend", text: "Backend" }, { type: "Frontend", text: "Frontend" }]
  },
  { id: 6,
    title: 'Finalize a logo',
    status: 'done',
    description: 'Choose a logo from one of the logo directories online',
    assignees: [ { type: "Design", text: "Design" }]
  },
];

const columns = [
    { key: "todo", label: "To Do" },
    { key: "doing", label: "Doing" },
    { key: "done", label: "Done" },
];

const Board = () => {
    const [tasks, setTasks] = useState(initTasks);

    // Add task handler (template)
    const handleAddTask = () => {
        const title = prompt("Enter task title:");
        const description = prompt("Enter task description:");
        const attachments = prompt("Enter task attachments (comma-separated URLs):").split(",");

        if (title) {
            setTasks([
                ...tasks,
                { id: Date.now(), title, status: "todo", description, attachments }
            ]);
        }
    };

    return (
        <div className="flex h-screen font-sans">
            {/* Sidebar Navigation */}
           <Sidebar />

            {/* Main Content */}
            <main className="flex-1 bg-[#f4f6fa] flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-end px-8 pt-6 pb-4 bg-white border-b border-gray-200">
                   <div className="w-8 h-8 rounded-full flex justify-center items-center bg-[#D9D9D9]"></div>
                </header>

                <div className="flex items-center justify-between px-8 pt-6 pb-4">
                    <div className="text-2xl font-semibold">
                        Hello, {userName}, here's your tasks
                    </div>
                    <button
                        onClick={handleAddTask}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-5 py-2 font-semibold text-lg transition"
                    >
                        Add Task
                    </button>
                </div>

                {/* Columns */}
                <div className="flex flex-1 gap-6 p-8">
                    {columns.map(col => (
                        <Column
                            key={col.key}
                            col={col}
                            tasks={tasks.filter(t => t.status === col.key)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Board;
