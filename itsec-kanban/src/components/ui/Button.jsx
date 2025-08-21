const Button = ({ type = "button", className = "", text = "text-white", padding = "py-2", children, ...props }) => (
  <button
    type={type}
    className={`rounded-lg hover:opacity-90 transition duration-300 ${className} ${text} ${padding}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;  