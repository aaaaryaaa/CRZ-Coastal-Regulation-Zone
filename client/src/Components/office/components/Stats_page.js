import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "./Stats_Table.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export default function Stats_page() {
  const [new1, setNew1] = useState(0);
  const [seen1, setSeen1] = useState(0);
  const [pending1, setPending1] = useState(0);
  const [cleared1, setCleared1] = useState(0);

  const [new2, setNew2] = useState(0);
  const [seen2, setSeen2] = useState(0);
  const [pending2, setPending2] = useState(0);
  const [cleared2, setCleared2] = useState(0);

  const [new3, setNew3] = useState(0);
  const [seen3, setSeen3] = useState(0);
  const [pending3, setPending3] = useState(0);
  const [cleared3, setCleared3] = useState(0);

  const [new4, setNew4] = useState(0);
  const [seen4, setSeen4] = useState(0);
  const [pending4, setPending4] = useState(0);
  const [cleared4, setCleared4] = useState(0);

  const pdata = [
    {
      name: "Res. Conv.",
      new: new1,
      seen: seen1,
      pending: pending1,
      cleared: cleared1,
    },
    {
      name: "Comm. Conv.",
      new: new2,
      seen: seen2,
      pending: pending2,
      cleared: cleared2,
    },
    {
      name: "Res. Const.",
      new: new3,
      seen: seen3,
      pending: pending3,
      cleared: cleared3,
    },
    {
      name: "Comm./Govt. Projects",
      new: new4,
      seen: seen4,
      pending: pending4,
      cleared: cleared4,
    },
  ];

  var today = new Date();
  if (today.getMonth() + 1 < 10) {
    if (today.getDate() < 10) {
      var date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-0" +
        today.getDate();
    } else
      var date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
  } else
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const [start_date, set_start] = useState(date);
  const [end_date, set_end] = useState(date);

  const changeStart = (e) => {
    set_start(e.target.value);
  };

  const changeEnd = (e) => {
    set_end(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [resconv, setResConv] = useState();
  const [rescons, setResCons] = useState();
  const [comconv, setComConv] = useState();
  const [comcons, setComCons] = useState();

  return (
    <div>
      <h1
        className="Heading"
        style={{
          margin: "auto",
          paddingLeft: "50px",
        }}
      >
        Statistics Chart
      </h1>
      <Container>
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          <Col style={{ justifyContent: "center", maxWidth: "75%" }}>
            <ResponsiveContainer aspect={2}>
              <BarChart data={pdata} style={{ backgroundColor: "#ffffffd9" }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={"preserveStartEnd"} />
                <YAxis label={{ value: "No. of applications", angle: -90 }} />
                <Legend />
                <Tooltip />
                <Bar dataKey="new" fill="blue">
                  <LabelList dataKey="new" position="top" />
                </Bar>
                <Bar dataKey="seen" fill="green">
                  <LabelList dataKey="seen" position="top" />
                </Bar>
                <Bar dataKey="pending" fill="purple">
                  <LabelList dataKey="pending" position="top" />
                </Bar>
                <Bar dataKey="cleared" fill="black">
                  <LabelList dataKey="cleared" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row>
          <Col style={{ maxWidth: "61em", backgroundColor: "#ffffffd9" }}>
            <form action="form.js" className="Form" onSubmit={submitHandler}>
              <label className="Tb">
                <h2>Enter Time Period:</h2>
              </label>
              <br />
              <input
                type="date"
                className="Tb"
                name="date"
                id="start"
                max={end_date}
                value={start_date}
                onInput={changeStart}
                style={{ width: "25%", margin: "1%" }}
              />

              <input
                type="date"
                className="tb"
                name="date"
                id="end"
                min={start_date}
                max={date}
                value={end_date}
                onInput={changeEnd}
                style={{ width: "25%", margin: "1%" }}
              />
              <br />
              <Button
                type="submit"
                className="but"
                style={{ width: "25%", margin: "1%" }}
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(
                      SERVER_URL + "/api/officeUser/stats",
                      {
                        start_date: start_date,
                        end_date: end_date,
                      },
                      {
                        withCredentials: true,
                      }
                    )
                    .then((res) => {
                      if (res.status === 200 && res.data && res.data.success) {
                        setNew1(res.data.new1);
                        setSeen1(res.data.seen1);
                        setPending1(res.data.pending1);
                        setCleared1(res.data.cleared1);
                        setNew2(res.data.new2);
                        setSeen2(res.data.seen2);
                        setPending2(res.data.pending2);
                        setCleared2(res.data.cleared2);
                        setNew3(res.data.new3);
                        setSeen3(res.data.seen3);
                        setPending3(res.data.pending3);
                        setCleared3(res.data.cleared3);
                        setNew4(res.data.new4);
                        setSeen4(res.data.seen4);
                        setPending4(res.data.pending4);
                        setCleared4(res.data.cleared4);
                      }
                    });
                }}
              >
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
