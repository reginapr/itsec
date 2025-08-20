const typeClasses = {
    Frontend: "bg-[#7B61FF33]-20 text-[#9747FF]",
    Backend: "bg-[#D1FADF] text-[#12B066]",
    Design: "bg-[#F2F4F7] text-[#475467]",
};

const baseClasses =
    "p-2 mr-2 bg-[#F2F4F7] rounded-md text-[13px] font-semibold";

export const Label = ({ type, children }) => {
    const classes = `${baseClasses} ${typeClasses[type] || ""}`;
    return <span className={classes}>{children}</span>;
};
