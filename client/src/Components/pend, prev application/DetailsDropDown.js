import "./styles/form.css";

function DetailsDropDown({ title, options, value, onChange }) {
  return (
    <div className="textbox">
      <select
        name=""
        id=""
        style={{ height: "40px" }}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled selected>
          {title}
        </option>
        {options && options.map((opt) => <option value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

export default DetailsDropDown;
