import axios from "axios";
import { useState,useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import emailjs from "@emailjs/browser";
// import { useDispatch } from 'react-redux';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// function Upload({ applicationId }) {
//   const [selectedFile, setSelectedFiles] = useState(null);
//   const [reason, setReason] = useState("");
//   var temp = {};
//   temp["reason"] = reason;


//   const [myFiles, setMyFiles] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // const dispatch = useDispatch();



  
//     const [application, setApplication] = useState(null);

//     useEffect(() => {
//       axios
//         .get(SERVER_URL + "/api/documents/getAll", {
//           withCredentials: true,
//         })
//         .then((response) => {
//           if (
//             response.status === 200 &&
//             response.data &&
//             response.data.success
//           ) {
//             setMyFiles(response.data["documents"]);
//           }
  
//           axios
//             .post(
//               SERVER_URL + "/api/application/appById",
//               {
//                 applicationId: applicationId,
//               },
//               { withCredentials: true }
//             )
//             .then((response1) => {
//               if (
//                 response1.status === 200 &&
//                 response1.data &&
//                 response1.data.success
//               ) {
//                 setApplication(response1.data.application);
//                 setLoading(false);
//               }
//             });
//         });
//     }, []);


// const applicantName = application ? application.name : "";
// const applicantEmail = application ? application.email : "";

    

//   const sendAccEmail = (e) => {
//     e.preventDefault();

//     // dispatch({
//     //   type: "submit",
//     //   // state: state,
//     //   // checked: checked,
      
//     //   setLoading: setLoading,
//     // });
//     // const templateParams = {
//     //   user_name: applicantName,
//     //   user_email: applicantEmail,
//     // };

//     const form = document.createElement("form");
//     form.style.display = "none";
//     form.action = "YOUR_ACTION_URL"; // Replace with the appropriate URL
  
//     const nameInput = document.createElement("input");
//     nameInput.type = "hidden";
//     nameInput.name = "user_name";
//     nameInput.value = applicantName;
  
//     const emailInput = document.createElement("input");
//     emailInput.type = "hidden";
//     emailInput.name = "user_email";
//     emailInput.value = applicantEmail;
  
//     form.appendChild(nameInput);
//     form.appendChild(emailInput);
  
//     document.body.appendChild(form);

//     emailjs
//       .sendForm(
//         "service_v8hlf9y",
//         "template_vpslkmg",
//         form,
//         "qJRH-cJgraSf0fcnb"
//       )
//       .then(() => {
//         console.log("mail sent");
//     });
     
//   };


//   const sendRejEmail = (e) => {
//     e.preventDefault();

//     // dispatch({
//     //   type: "submit",
//     //   state: state,
//     //   checked: checked,
      
//     //   setLoading: setLoading,
//     // });
//         // };
//         const form = document.createElement("form");
//         form.style.display = "none";
//         form.action = "YOUR_ACTION_URL"; // Replace with the appropriate URL
      
//         const nameInput = document.createElement("input");
//         nameInput.type = "hidden";
//         nameInput.name = "user_name";
//         nameInput.value = applicantName;
      
//         const emailInput = document.createElement("input");
//         emailInput.type = "hidden";
//         emailInput.name = "user_email";
//         emailInput.value = applicantEmail;
      
//         const reasonInput = document.createElement("input");
//         reasonInput.type = "hidden";
//         reasonInput.name = "reason";
//         reasonInput.value = reason;
      
//         form.appendChild(nameInput);
//         form.appendChild(emailInput);
//         form.appendChild(reasonInput);
      
//         document.body.appendChild(form);

//     emailjs
//       .sendForm(
//         "service_v8hlf9y",
//         "template_htig5ha",
//         form,
//         "qJRH-cJgraSf0fcnb"
//       )
//       .then(() => {
//         console.log("mail sent");
//     });
     
//   };



//   return (
//     <div style={{ padding: "2em" }}>
//       <Form>
//         <Form.Group controlId="formFile" className="mb-3">
//           <Form.Label style={{ color: "black" }}>Select a File</Form.Label>

//           <Form.Control
//             type="file"
//             onChange={(e) => setSelectedFiles(e.target.files[0])}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Container>
//             <Row>
//               <Button
//                 variant="primary"
//                 style={{ marginTop: "2%" }}
//                 onClick={(e) => {
//                   sendAccEmail(e);
//                   e.preventDefault();
//                   const formData = new FormData();
//                   formData.append("applicationId", applicationId);
//                   formData.append("approval", selectedFile);

//                   axios
//                     .post(
//                       SERVER_URL + "/api/application/approveApplication",
//                       formData,
//                       {
//                         withCredentials: true,
//                       }
//                     )
//                     .then((response) => {
//                       if (
//                         response.status === 200 &&
//                         response.data &&
//                         response.data.success
//                       ) {
//                         alert(`Application submitted`);
//                       }
//                     });
//                 }}
//               >
//                 Upload
//               </Button>

//               <div>
//               <textarea
//                       id="reason"
//                       name="reason"
//                       cols={35}
//                       placeholder="Enter Reason(s) for rejection "
//                       onChange={(e) => {
//                         setReason(e.target.value);
//                       }}
//                       value={reason}
//                     ></textarea>
//                     </div>

//               <Button
//                 variant="primary"
//                 type="submit"
//                 style={{ marginTop: "2%" }}
//                 onClick={(e) => {
//                   sendRejEmail(e)
//                   e.preventDefault();
//                   const formData = new FormData();
//                   formData.append("applicationId", applicationId);
//                   formData.append("rejection", selectedFile);

//                   axios
//                     .post(
//                       SERVER_URL + "/api/application/rejectApplication",
//                       formData,
//                       {
//                         withCredentials: true,
//                       }
//                     )
//                     .then((response) => {
//                       if (
//                         response.status === 200 &&
//                         response.data &&
//                         response.data.success
//                       ) {
//                         alert(`Application submitted`);
//                       }
//                     });
//                 }}
//               >
//                 Reject
//               </Button>
              
//             </Row>
//           </Container>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// }

// export default Upload;

function Upload({ applicationId }) {
  const [selectedFile, setSelectedFiles] = useState(null);
  const [reason, setReason] = useState("");
  const [uploadAction, setUploadAction] = useState(""); // Track the selected action (approve/reject)

  const [application, setApplication] = useState(null);

  useEffect(() => {
    // Fetch application details when component mounts
    axios
      .post(
        SERVER_URL + "/api/application/appById",
        { applicationId: applicationId },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setApplication(response.data.application);
        }
      });
  }, [applicationId]);

  const applicantName = application ? application.name : "";
  const applicantEmail = application ? application.email : "";

  const sendAccEmail = (e) => {
    e.preventDefault();
    // Code to send acceptance email
       // dispatch({
    //   type: "submit",
    //   // state: state,
    //   // checked: checked,
      
    //   setLoading: setLoading,
    // });
    // const templateParams = {
    //   user_name: applicantName,
    //   user_email: applicantEmail,
    // };

    const form = document.createElement("form");
    form.style.display = "none";
    form.action = "YOUR_ACTION_URL"; // Replace with the appropriate URL
  
    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "user_name";
    nameInput.value = applicantName;
  
    const emailInput = document.createElement("input");
    emailInput.type = "hidden";
    emailInput.name = "user_email";
    emailInput.value = applicantEmail;
  
    form.appendChild(nameInput);
    form.appendChild(emailInput);
  
    document.body.appendChild(form);

    emailjs
      .sendForm(
        "service_v8hlf9y",
        "template_vpslkmg",
        form,
        "qJRH-cJgraSf0fcnb"
      )
      .then(() => {
        console.log("mail sent");
    });
  };

  const sendRejEmail = (e) => {
    e.preventDefault();
    // Code to send rejection email
        // dispatch({
    //   type: "submit",
    //   state: state,
    //   checked: checked,
      
    //   setLoading: setLoading,
    // });
        // };
        const form = document.createElement("form");
        form.style.display = "none";
        form.action = "YOUR_ACTION_URL"; // Replace with the appropriate URL
      
        const nameInput = document.createElement("input");
        nameInput.type = "hidden";
        nameInput.name = "user_name";
        nameInput.value = applicantName;
      
        const emailInput = document.createElement("input");
        emailInput.type = "hidden";
        emailInput.name = "user_email";
        emailInput.value = applicantEmail;
      
        const reasonInput = document.createElement("input");
        reasonInput.type = "hidden";
        reasonInput.name = "reason";
        reasonInput.value = reason;
      
        form.appendChild(nameInput);
        form.appendChild(emailInput);
        form.appendChild(reasonInput);
      
        document.body.appendChild(form);

    emailjs
      .sendForm(
        "service_v8hlf9y",
        "template_htig5ha",
        form,
        "qJRH-cJgraSf0fcnb"
      )
      .then(() => {
        console.log("mail sent");
    })
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicationId", applicationId);

    if (uploadAction === "approve") {
      formData.append("approval", selectedFile);
      axios
        .post(SERVER_URL + "/api/application/approveApplication", formData, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200 && response.data && response.data.success) {
            sendAccEmail(e);
            alert(`Application approved`);




            
          }
        });
    } else if (uploadAction === "reject") {
      formData.append("reason", reason);
      axios
        .post(SERVER_URL + "/api/application/rejectApplication", formData, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200 && response.data && response.data.success) {
            sendRejEmail(e);
            alert(`Application rejected`);
          }
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "black" }}>Select a File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setSelectedFiles(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    style={{ marginTop: "2%" }}
                    onClick={(e) => {
                      setUploadAction("approve");
                    }}
                  >
                    Upload
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    style={{ marginTop: "2%" }}
                    onClick={(e) => {
                      setUploadAction("reject");
                    }}
                  >
                    Reject
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            {uploadAction === "reject" && (
              <Form.Group>
                <textarea
                  id="reason"
                  name="reason"
                  cols={35}
                  placeholder="Enter Reason(s) for rejection "
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  value={reason}
                ></textarea>
              </Form.Group>
            )}
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "2%" }}
                onClick={handleUpload}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;