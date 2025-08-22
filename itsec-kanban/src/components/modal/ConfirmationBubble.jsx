const ConfirmationBubble = ({ message, onClose }) => (
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
        <div className="bg-white rounded-[10px] p-2 shadow-lg text-center min-w-[330px] flex justify-between items-center">
            <p className="inline-block text-[#1B1B1B] text-[14px] py-2 px-4 border-l-4 border-[#2CBA7A]">{message}</p>
            {onClose && (
                <a
                    href="/"
                    className="hover:underline font-medium text-[14px] p-[6px] text-[#1D2939]"
                    onClick={e => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    Got it
                </a>
            )}
        </div>
    </div>
);

export default ConfirmationBubble;
