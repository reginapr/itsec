import { useNavigate } from "react-router-dom";
import Card from './Card';

const Column = ({ col, tasks, onCardClick }) => {
    const navigate = useNavigate();
    const filteredTasks = tasks.filter((t) => t.status === col.key);

    const handleCardClick = (id) => {
        onCardClick(id);
        navigate(`/task/${id}`);
    };

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="font-bold uppercase text-xs text-[#667085]">
                {col.label}
            </div>
            <div className="py-4 flex-1">
                {filteredTasks.length === 0 ? (
                    <div className="text-gray-400 italic">No tasks</div>
                ) : (
                    filteredTasks.map((task) => (
                        <Card key={task.id} {...task} onClick={() => handleCardClick(task.id)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Column;