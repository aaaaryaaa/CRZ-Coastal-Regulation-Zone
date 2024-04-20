import "./styles/form.css";

const uploadBtn = ({ title, onChange }) => {
  return (
    <div
      className="upload "
      style={{ display: "flex", alignContent: "center", padding: "5px" }}
    >
      <label htmlFor="upload">{title}</label>
      <input type="file" name="" id="" onChange={onChange} />
    </div>
  );
};

export default uploadBtn;
