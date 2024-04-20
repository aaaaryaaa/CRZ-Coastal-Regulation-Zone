import "./styles/form.css";
import { useTranslation } from "react-i18next";
function DetailsDropDown({ title, options, value, onChange }) {
  const { t } = useTranslation();
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
        {options &&
          options.map((opt) => (
            <option value={opt}>{t(opt.toLowerCase())}</option>
          ))}
      </select>
    </div>
  );
}

export default DetailsDropDown;
