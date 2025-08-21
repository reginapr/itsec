const Icon = ({ src, alt = 'icon', size = 24, style = {}, ...props }) => (
    <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size, ...style }}
        {...props}
    />
);

export default Icon;
