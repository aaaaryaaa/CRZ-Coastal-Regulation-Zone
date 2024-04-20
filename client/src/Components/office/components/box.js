import "./box.css";
import react from "react";
import { Link } from "react-router-dom";

function RenderApplication({ application, onClick }) {
  return (
    <li key={application.id} className="r1">
      <p
        style={{ color: "black" }}
        onClick={(e) => {
          e.preventDefault();
          onClick(application.id);
        }}
      >
        {application.id + "\t"}
        {"\t"}
        {"\t" + application.name}
      </p>
    </li>
  );
}

function Box({ Applications, onClick }) {
  if (Applications === null) {
    return <div></div>;
  }
  const applications = Applications.map((application) => {
    return <RenderApplication application={application} onClick={onClick} />;
  });
  return (
    <div className="rectangle">
      <h1>Applications</h1>
      <ul className="newclass">{applications}</ul>
    </div>
  );
}

export default Box;
