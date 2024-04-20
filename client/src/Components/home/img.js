import "./style/img.css";
import Images from "../../Images/coast.jpg";
import Images1 from "../../Images/seal.png";
import { useTranslation } from "react-i18next";

function Img() {
  const { t } = useTranslation();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img className="img1" src={Images1} />

        <div className="ds">{t("district")}</div>
        <div className="cr"> {t("crz")}</div>
      </div>
    </div>
  );
}
export default Img;
