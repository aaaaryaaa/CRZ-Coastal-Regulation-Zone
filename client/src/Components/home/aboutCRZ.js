import { useTranslation } from "react-i18next";
import "./style/aboutCRZ.css";

const AboutCRZ = () => {
  const { t } = useTranslation();
  return (
    <div className="md">
      <div className="box">
        <h3 className="textHeader">{t("about_crzph")}</h3>
        <p className="textAbout">{t("about_Crzp")}</p>
      </div>
    </div>
  );
};

export default AboutCRZ;
