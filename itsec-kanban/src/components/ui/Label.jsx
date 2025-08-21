const typeClasses = {
    frontend: "bg-[#7B61FF]/20 text-[#9747FF]",
    backend: "bg-[#D1FADF] text-[#12B066]",
    design: "bg-[#F2F4F7] text-[#475467]",
};

const baseClasses =
    "py-1 px-2 mr-2 rounded-md text-[13px] font-semibold";

export const Label = ({ type, children }) => {
    const classes = `${baseClasses} ${typeClasses[type] || ""}`;
    return <span className={classes}>{children}</span>;
};
