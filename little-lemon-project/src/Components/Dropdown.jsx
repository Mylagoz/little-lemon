import "../Styles/Dropdown.css"

function Dropdown({ options, value, onChange, ariaLabel, field }) {
    return (
        <select
            value={value}
            onChange={e => onChange(field, e.target.value)}
            aria-label={ariaLabel}
        >
            {ariaLabel && <option value="" disabled>{ariaLabel}</option>}
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;