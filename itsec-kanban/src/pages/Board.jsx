import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Column from '../components/board/Column';
import TaskDetail from '../components/board/TaskDetail';
import Sidebar from "../components/navigation/Sidebar";
import PrimaryBtn from '../components/ui/Button';
import TaskModal from '../components/modal/TaskModal';
import ConfirmationBubble from "../components/modal/ConfirmationBubble";
import { useTaskStore } from '../store/TaskStore';
import { fetchTasks } from '../services/boardService';

// Dummy tasks
// const initTasks = [
//   { id: 1,
//     title: 'Design User Interface',
//     status: 'todo',
//     label: 'TO DO',
//     description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using filler text is that it has a more-or-less normal distribution of letters, as opposed to using repeated or meaningless words. This makes it look like natural language, which allows designers and developers to focus on the structure, typography, and visual balance of the page rather than the content itself.',
//     assignees: [{ type: "design", text: "Design" }]
//   },
//   { id: 2,
//     title: 'Design a Sign Up Page',
//     status: 'doing',
//     label: 'DOING',
//     description: '',
//     assignees: [{ type: "design", text: "Design" }]
//   },
//   { id: 3,
//     title: 'Research Target Audience',
//     status: 'done',
//     label: 'DONE',
//     description: 'Add tests for auth',
//     attachments: [
//         {id: 1, name: 'forms.google.com/test', url: 'https://forms.google.com/test', type: 'file'}
//     ],
//   },
//   { id: 4,
//     title: 'Setup Backend Infrastructures',
//     status: 'todo',
//     label: 'TO DO',
//     description: 'Prepare the server environment and database for app development.',
//     assignees: [{ type: "backend", text: "Backend" }],
//     attachments: [
//         {id: 1, name: 'docs.google.com/test', url: 'https://docs.google.com/test', type: 'link'},
//         {id: 2, name: 'poster.png', url: 'https://example.com/poster.png', type: 'image'}
//     ],
//   },
//   { id: 5,
//     title: 'Develop Authentication Module',
//     status: 'doing',
//     label: 'DOING',
//     description: 'Prepare the server environment and database for app development.',
//     assignees: [{ type: "backend", text: "Backend" }, { type: "frontend", text: "Frontend" }]
//   },
//   { id: 6,
//     title: 'Finalize a logo',
//     status: 'done',
//     label: 'DONE',
//     description: 'Choose a logo from one of the logo directories online',
//     assignees: [ { type: "design", text: "Design" }]
//   },
// ];

const columns = [
    { key: "todo", label: "To Do" },
    { key: "doing", label: "Doing" },
    { key: "done", label: "Done" },
];

const Board = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { tasks, setTasks, moveTask } = useTaskStore();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [showDeletedConfirmation, setShowDeletedConfirmation] = useState(false);
    const [showMoveSuccess, setShowMoveSuccess] = useState(false);
    const [movedCardTitle, setMovedCardTitle] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storage = localStorage.getItem('task-storage');

        if (storage) {
            const parsed = JSON.parse(storage);
            const storedTasks = parsed?.state?.tasks || [];
            setTasks(storedTasks);
        } else {
            fetchTasks()
                .then(data => {
                    setTasks(data.tasks || data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [setTasks]);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) setUserName(storedUser);
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) navigate('/login');
    }, [navigate]);

    useEffect(() => {
        if (location.state?.showDeletedConfirmation) {
            setShowDeletedConfirmation(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const openTaskModal = () => setIsModalOpen(true);

    const handleCardDrop = (fromId, toStatus, toLabel) => {
        const movedTask = tasks.find(t => String(t.id) === String(fromId));
        moveTask(fromId, toStatus, toLabel);
        setMovedCardTitle(movedTask ? movedTask.title : '');
        setShowMoveSuccess(true);
        setTimeout(() => setShowMoveSuccess(false), 3000);
    };

    return (
        <div className="flex h-screen font-sans">
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 bg-[#F2F4F7] flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-end px-8 pt-6 pb-4 bg-white border-b border-gray-200">
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-[#D9D9D9]"></div>
                </header>

                {!id ? (
                    <div className="dashboard max-w-[1100px] mx-auto w-full">
                        <div className="flex items-center justify-between py-8">
                            <div className="text-2xl font-semibold">
                                 Hello, {userName || "[User]"}, here's your tasks
                            </div>
                            <PrimaryBtn onClick={openTaskModal} className="bg-[#4186F4] p-5">Add a Task</PrimaryBtn>
                        </div>

                        {/* Columns */}
                        <div className="flex flex-1 gap-8 transition-all duration-1000 ease-in-out">
                            {columns.map(col => (
                                <Column
                                    key={col.key}
                                    col={col}
                                    tasks={tasks.filter(t => t.status === col.key)}
                                    onCardClick={taskId => navigate(`/board/${taskId}`)}
                                    onCardDrop={handleCardDrop}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <TaskDetail
                        onClose={() => navigate('/board')}
                    />
                )}
            </main>
            <TaskModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskActionModalName="Edit a Task"
                mode="add"
            />
            {showMoveSuccess && (
                <ConfirmationBubble
                    message={
                        <>Card <strong>{movedCardTitle}</strong> moved successfully!</>
                    }
                />
            )}
            {showDeletedConfirmation && (
                <ConfirmationBubble message="Task already deleted" onClose={() => setShowDeletedConfirmation(false)} />
            )}
        </div>
    );
};

export default Board;