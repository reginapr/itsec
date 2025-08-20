
import { Label } from "../ui/Label";

const Card = ({ title, description, assignees = [], attachments = [] }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full mb-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-[#1D2939] mb-5">{description}</p>
            {attachments.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-5">
                    {attachments.map((file, idx) => (
                    <li key={idx} className="inline">
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4186F4] hover:underline">
                            {file.name}
                        </a>
                    </li>
                    ))}
                </ul>
            )}
            <div className="flex items-center">
                {assignees.map((assignee, idx) => (
                     <Label key={idx} type={assignee.type}>
                        {assignee.text}
                    </Label>
                ))}
            </div>
        </div>
    );
};

export default Card;