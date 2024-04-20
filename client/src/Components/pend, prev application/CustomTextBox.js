import "./styles/form.css";

const TextBox = ({ title, value, onChange }) => {
  return (
    <div
      className="textbox"
      style={{
        padding: "5 0 5 0",
      }}
    >
      <input
        style={{
          margin: 0,
          padding: "5px",
        }}
        type="text"
        placeholder={title}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextBox;
