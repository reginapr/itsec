import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
    persist(
        (set) => ({
            tasks: [],
            setTasks: (tasks) => set({ tasks }),
            addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),
            updateTask: (updatedTask) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    ),
                })),
        }),
        {
            name: 'task-storage',
        }
    )
);