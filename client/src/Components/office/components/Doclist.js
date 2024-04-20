import React from "react";
import { Form } from "reactstrap";
import "./Doclist.css";

function list(props) {
  return (
    <div className="di">
      <Form>
        <ul type="none" className="unli">
          {props.docList != null &&
            props.docList.length > 0 &&
            props.docList.map((value) => (
              <li className="oli">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    props.onChange(e);
                  }}
                  value={value.id}
                />
                {value.name}
              </li>
            ))}
        </ul>
      </Form>
    </div>
  );
}

export default list;
