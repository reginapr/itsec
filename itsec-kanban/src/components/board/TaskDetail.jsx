import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../ui/Button';
import Label from "../ui/Label";
import TaskModal from '../modal/TaskModal';
import DeleteTask from '../modal/DeleteTask';
import { useTaskStore } from '../../store/TaskStore';

const TaskDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, deleteTask } = useTaskStore();
    const task = tasks.find(t => String(t.id) === id);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = () => {
        deleteTask(task.id);
        setIsDeleteOpen(false);
        navigate('/board', { state: { showDeletedConfirmation: true } });
    };

    if (task) {
        return (
            <div className="max-w-[1100px] mx-auto w-full py-8">
                <h2 className="font-semibold text-2xl py-8">Task Detail</h2>
                <div className="text-[#667085] font-bold text-xs mb-4">
                    <Link to="/board" className="hover:underline">Dashboard</Link> {'>'} {task.title}
                </div>
                <div className="rounded-lg p-5 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
                    <div className="flex gap-8 text-gray-500 text-[14px] mb-5">
                        <div className="flex-1 basis-[70%]">
                            <p>{task.description}</p>
                        </div>
                        <div className="flex-1 basis-[30%] text-[12px]">
                            <h4 className="font-bold mb-1">Info</h4>
                            <p>Created at: {task.dateCreated || "28 February 2024 07:20AM"}</p>
                            <p>Updated at: {task.dateUpdated || "28 February 2024 08:00AM"}</p>
                        </div>
                    </div>
                    <div className="mb-4 text-gray-500">
                        <div className="flex items-center space-x-1 mb-6">
                            {(task.assignees || []).map((assignee, idx) => (
                                <Label key={idx} type={assignee.type}>
                                    {assignee.text}
                                </Label>
                            ))}
                        </div>
                        <div className="text-[14px] font-semibold">Status: <span className="uppercase">{task.label}</span></div>
                    </div>
                </div>
                <div className="my-8 flex justify-end gap-2 items-center">
                    <Button type="submit" onClick={() => setIsModalOpen(true)} className="bg-[#4186F4] p-5">Edit task</Button>
                    <span>or</span>
                    <Link
                        to="#"
                        className="text-red-600 hover:underline font-medium"
                        onClick={e => {
                            e.preventDefault();
                            setIsDeleteOpen(true);
                        }}
                    >
                        Delete
                    </Link>
                </div>
                <TaskModal
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    taskActionModalName="Edit a Task"
                    mode="edit"
                    task={task}
                />
                <DeleteTask
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onDelete={handleDelete}
                />
            </div>
        );
    }
};

export default TaskDetail;