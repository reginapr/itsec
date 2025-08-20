const Button = ({ type = "button", className = "", children, ...props }) => (
  <button
    type={type}
    className={`w-full py-2 bg-[#4186F4] text-white rounded hover:opacity-90 transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;