import { useRef, useState } from 'react';

export function useDragAndDrop({ id, onDrop }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const dragItem = useRef(null);

    const dragProps = {
        draggable: true,
        onDragStart: (e) => {
            dragItem.current = id;
            setIsDragging(true);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id);
        },
        onDragEnd: () => {
            setIsDragging(false);
            dragItem.current = null;
        }
    };

    const dropProps = {
        onDragOver: (e) => {
            e.preventDefault();
            setIsOver(true);
        },
        onDragLeave: () => setIsOver(false),
        onDrop: (e) => {
            e.preventDefault();
            setIsOver(false);
            const droppedId = e.dataTransfer.getData('text/plain');
            if (onDrop && droppedId !== id) {
                onDrop(droppedId, id);
            }
        }
    };

    return { dragProps, dropProps, isDragging, isOver };
}
