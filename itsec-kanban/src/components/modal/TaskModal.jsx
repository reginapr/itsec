import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from "../ui/Icon";
import closeIcon from "../../assets/icons/close-icon.svg";
import { useTaskStore } from '../../store/TaskStore';
import { formatDateTime } from '../../utils/formatDateTime';

const assigneesList = [
    { type: "design", text: "Design" },
    { type: "backend", text: "Backend" },
    { type: "frontend", text: "Frontend" },
];

const statusOptions = [
    { value: 'todo', label: 'TO DO' },
    { value: 'doing', label: 'DOING' },
    { value: 'done', label: 'DONE' },
];

const TaskModal = ({
    isModalOpen,
    onClose,
    taskActionModalName,
    mode = "add",
    task // pass the task object when editing
}) => {
    const { addTask, updateTask } = useTaskStore();
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [assignees, setAssignees] = useState([]);
    const [status, setStatus] = useState('todo');

    // Populate fields in edit mode
    useEffect(() => {
        if (mode === "edit" && task) {
            setTaskName(task.title || '');
            setDescription(task.description || '');
            setAssignees((task.assignees || []).map(a => a.type));
            setStatus(task.status || 'todo');
        } else if (mode === "add") {
            setTaskName('');
            setDescription('');
            setAssignees([]);
            setStatus('todo');
        }
    }, [mode, task, isModalOpen]);

    const handleAssigneeChange = (id) => {
        setAssignees((prev) =>
            prev.includes(id)
                ? prev.filter((a) => a !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            id: mode === "edit" && task ? task.id : Date.now(),
            title: taskName,
            description,
            assignees: assigneesList.filter(a => assignees.includes(a.type)),
            status,
            label: statusOptions.find(opt => opt.value === status)?.label || '',
            dateCreated: mode === "edit" && task ? task.dateCreated : formatDateTime(new Date()),
            dateUpdated: formatDateTime(new Date())
        };

        if (mode === "edit") {
            updateTask(taskData);
        } else {
            addTask(taskData);
        }

        if (onClose) onClose();

        // Reset form only if adding
        if (mode === "add") {
            setTaskName('');
            setDescription('');
            setAssignees([]);
            setStatus('todo');
        }
    };

    const closeTaskModal = () => {
        if (onClose) onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeTaskModal();
        };
        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded shadow-lg w-full max-w-[500px]">
                        <div className="p-4 border-b border-[#DEE2E6] flex justify-between">
                            <h2 className="text-2xl font-semibold">{taskActionModalName || (mode === "edit" ? "Edit Task" : "Add a Task")}</h2>
                            <button
                                onClick={closeTaskModal}
                                className="top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                                aria-label="Close"
                            >
                                <Icon name="close" src={closeIcon} size={16} className="inline-block mr-1 opacity-50" />
                            </button>
                        </div>
                        <div className='p-4'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-1 text-[12px] text-gray-500">Task Name*</label>
                                    <input
                                        type="text"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        placeholder="Task name here..."
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-1 text-[12px] text-gray-500">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Description here..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="gap-4">
                                        {assigneesList.map((assignee) => (
                                            <label key={assignee.type} className="flex items-center space-x-2 pb-5 text-[#697386]">
                                                <span className="relative flex item-center">
                                                    <input
                                                        type="checkbox"
                                                        name="assignee"
                                                        checked={assignees.includes(assignee.type)}
                                                        onChange={() => handleAssigneeChange(assignee.type)}
                                                        className="peer appearance-none w-5 h-5 border border-[#D2D5DA] rounded-[4px] bg-white checked:bg-[#2563EB] checked:border-[#2563EB] focus:outline-none"
                                                    />
                                                    <svg
                                                        className="pointer-events-none absolute left-0 top-0 w-5 h-5 hidden peer-checked:block"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="5 11 9 15 15 7" />
                                                    </svg>
                                                </span>
                                                <span>{assignee.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold mb-1 text-[12px] text-gray-500">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#697386]"
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-6 -mx-4 border-t border-[#DEE2E6] px-4 flex justify-end gap-2 pt-4">
                                    <Button type="button" onClick={onClose} text="text-[#1D2939]" className="border border-[#1D2939] p-5">Cancel</Button>
                                    <Button type="submit" className="bg-[#4186F4] p-5">{mode === "edit" ? "Save Changes" : "Submit"}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default TaskModal;