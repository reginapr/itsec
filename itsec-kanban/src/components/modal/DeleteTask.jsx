import React from 'react';
import Button from '../ui/Button';
import Icon from "../ui/Icon";
import closeIcon from "../../assets/icons/close-icon.svg";

const DeleteTask = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded shadow-lg w-full max-w-[500px]">
                        <div className="p-4 border-b border-[#DEE2E6] flex justify-between">
                            <h2 className="text-2xl font-semibold">Delete Task</h2>
                            <button
                                onClick={handleClose}
                                className="top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                                aria-label="Close"
                            >
                                <Icon name="close" src={closeIcon} size={16} className="inline-block mr-1 opacity-50" />
                            </button>
                        </div>
                        <div className='p-4'>
                            <p className="text-gray-700">
                                Are you sure you want to delete this task?
                            </p>
                        </div>
                        <div className="mt-6 border-t border-[#DEE2E6] p-4 flex justify-end gap-2">
                            <Button type="button" onClick={handleClose} text="text-[#1D2939]" className="border border-[#1D2939] p-5">Cancel</Button>
                            <Button type="button" onClick={onDelete} className="bg-[#4186F4] p-5">Yes, delete</Button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default DeleteTask;
