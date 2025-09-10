import "../Styles/Dropdown.css"

function Dropdown({ options, value, onChange, ariaLabel, field }) {
    // Ensure options is always an array
    const safeOptions = Array.isArray(options) ? options : [];
    
    return (
        <select
            value={value}
            onChange={e => onChange(field, e.target.value)}
            aria-label={ariaLabel}
        >
            {ariaLabel && <option value="" disabled>{ariaLabel}</option>}
            {safeOptions.length === 0 && (
                <option value="" disabled>No options available</option>
            )}
            {safeOptions.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;