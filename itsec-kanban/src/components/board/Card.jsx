import React from "react";
import { Label } from "../ui/Label";
import Icon from "../ui/Icon";
import linkIcon from "../../assets/icons/link-icon.svg";
import imageIcon from "../../assets/icons/paper-clip-icon.svg";

const Card = ({ id, title, description, assignees = [], attachments = [], onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow p-4 w-full mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onClick && onClick(id)}
        >
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-[#1D2939] font-medium mb-5">{description}</p>
            {attachments.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-5">
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