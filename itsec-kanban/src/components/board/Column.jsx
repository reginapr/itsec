import { useNavigate } from "react-router-dom";
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import Card from './Card';
import LoadingIndicator from "../ui/LoadingIndicator";

const Column = ({ col, tasks, onCardClick, onCardDrop, loading }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        onCardClick(id);
        navigate(`/task/${id}`);
    };

    const { dropProps, isOver } = useDragAndDrop({
        id: `column-${col.key}`,
        onDrop: (fromId) => {
            onCardDrop(fromId, col.key, col.label);
        }
    });

    return (
        <div
            className="flex flex-col flex-1 min-w-0 rounded-lg transition-all"
            {...(tasks.length === 0 ? dropProps : {})} 
        >
            <div className="font-bold uppercase text-xs text-[#667085]">
                {col.label}
            </div>
            <div className={`py-4 flex-1 relative ${isOver ? 'bg-blue-50' : ''}`}>
                {loading ? 
                    <div className="absolute inset-0 flex items-center justify-center z-10 top-[200px]">
                        <LoadingIndicator />
                    </div>
                : 
                    tasks.length === 0 ? (
                        <div className="text-gray-400 italic">No tasks</div>
                    ) : (
                        tasks.map((task) => (
                            <Card
                                key={task.id}
                                {...task}
                                onClick={() => handleCardClick(task.id)}
                                onDrop={(fromId) => onCardDrop(fromId, col.key, col.label)}
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Column;