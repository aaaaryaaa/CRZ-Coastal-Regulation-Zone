import React from "react";
import { useTranslation } from "react-i18next";
import "./style/left.css";

function Left() {
  const { t } = useTranslation();

  return (
    <div className="leftCard">
      <div className="heading">
        <h5>{t("imp_notice")}</h5>
      </div>
    </div>
  );
}

export default Left;
