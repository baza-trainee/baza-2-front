
export default function CustomInput(
  { width, 
    height, 
    placeholder, 
    type, 
    required, 
    minLength, 
    maxLength, 
    value, 
    onChange,
  }
) 
  {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  }

  return (
    <form>
      <input
        placeholder={placeholder}
        onChange={handleChange}
        style={{ width: `${width}px`, height: `${height}px` }}
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        value={value}
        required={required}>
      </input>
    </form>
  );
}
