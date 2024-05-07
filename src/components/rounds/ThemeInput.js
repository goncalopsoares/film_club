const ThemeInput = ({ value, onChange }) => {
    return (
        <label>
            <input
                style={{
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '0.5rem',
                    width: '90%',
                }}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Theme (e.g. 80's Christmas movies)"
            />
        </label>
    );
};

export default ThemeInput;