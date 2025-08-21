import Label from "../ui/Label";
import Icon from "../ui/Icon";
import linkIcon from "../../assets/icons/link-icon.svg";
import imageIcon from "../../assets/icons/paper-clip-icon.svg";
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { truncateText } from '../../utils/truncateText';

const Card = ({ id, title, description, label, status, assignees = [], attachments = [], onClick, onDrop }) => {
    const { dragProps, dropProps, isDragging, isOver } = useDragAndDrop({
        id,
        onDrop: (fromId) => {
            if (onDrop) onDrop(fromId, status, label);
        }
    });

    return (
        <div
            {...dragProps}
            {...dropProps}
            className={`your-card-class ${isDragging ? 'opacity-50' : ''} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
        >
            <div className="bg-white rounded-lg shadow p-4 w-full mb-4 space-y-[20px] cursor-pointer hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg font-semibold hover:underline">
                    <a
                        href={`/task/${id}`}
                        onClick={e => {
                            e.preventDefault();
                            onClick && onClick(id);
                        }}
                        >
                        {title}
                    </a>
                </h3>
                <p className="text-gray-500 text-[14px] font-medium">{truncateText(description, 90)}</p>
                {attachments.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {attachments.map((file, idx) => (
                            <li key={idx} className="inline">
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#4186F4] hover:underline"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Icon name={file.name} src={file.type === 'link' ? linkIcon : imageIcon} size={14} className="inline-block mr-1" />
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
                {assignees.length > 0 && (
                    <div className="flex items-center">
                        {assignees.map((assignee, idx) => (
                            <Label key={idx} type={assignee.type}>
                                {assignee.text}
                            </Label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;