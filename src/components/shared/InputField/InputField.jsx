export default function InputField(
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
  return (
      <input
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: `${width}px`, height: `${height}px` }}
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        value={value}
        required={required}>
      </input>
  );
}
