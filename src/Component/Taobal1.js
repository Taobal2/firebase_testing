// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { app } from "./../base";
// import firebase from "firebase";

// export const Settings = () => {
//   const [name, setName] = useState("");
//   const [contact, setContact] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [location, setLocation] = useState("");
//   const [vocation, setVocation] = useState("");

//   const [image, setImage] = useState("");
//   const [storageImage, setStorageImage] = useState("");
//   const [percentage, setPercentage] = useState(0.0001);

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const saveFile = URL.createObjectURL(file);
//     setImage(saveFile);

//     const fileRef = await app.storage().ref();
//     const storageRef = fileRef.child("bio/" + file.name).put(file);

//     // to get transfer count and get the upload file URL

//     storageRef.on(
//       firebase.storage.TaskState.STATE_CHANGED,
//       (snapshot) => {
//         const count = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(count);
//         setPercentage(count);
//       },

//       (err) => console.log(err.message), // to report Error

//       () => {
//         storageRef.snapshot.ref.getDownloadURL().then((URL) => {
//           console.log(URL);
//           setStorageImage(URL);
//         });
//       }
//     );
//   };

//   const pushToBackEnd = async () => {
//     await app.firestore().collection("bio").doc().set({
//       storageImage,
//       name,
//       location,
//       contact,
//       mobile,
//       vocation,
//       time: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//   };

//   return (
//     <Container>
//       <Wrapper>
//         <Card>
//           <ImageHolder>
//             <div>{percentage}</div>
//             <Image src={image} />
//             <Label htmlFor="pix">Upload you Photo</Label>
//             <LableInput
//               type="file"
//               placeholder="Enter"
//               id="pix"
//               onChange={uploadImage}
//             />
//           </ImageHolder>

//           <Content>
//             <ContentHolder>
//               <MainLabel>FullName</MainLabel>
//               <MainInput
//                 placeholder="FullName"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               />
//             </ContentHolder>
//             <ContentHolder>
//               <MainLabel>Contact Address</MainLabel>
//               <MainInput
//                 placeholder="Contact Address"
//                 value={contact}
//                 onChange={(e) => {
//                   setContact(e.target.value);
//                 }}
//               />
//             </ContentHolder>
//             <ContentHolder>
//               <MainLabel>Mobile Number</MainLabel>
//               <MainInput
//                 placeholder="Mobile Number"
//                 value={mobile}
//                 onChange={(e) => {
//                   setMobile(e.target.value);
//                 }}
//               />
//             </ContentHolder>
//             <ContentHolder>
//               <MainLabel>Location</MainLabel>
//               <MainInput
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => {
//                   setLocation(e.target.value);
//                 }}
//               />
//             </ContentHolder>
//             <ContentHolder>
//               <MainLabel>Vocation</MainLabel>
//               <MainInput
//                 placeholder="Vocation"
//                 value={vocation}
//                 onChange={(e) => {
//                   setVocation(e.target.value);
//                 }}
//               />
//             </ContentHolder>
//           </Content>
//           <Button onClick={pushToBackEnd}>Add Up</Button>
//         </Card>
//       </Wrapper>
//     </Container>
//   );
// };

// const Button = styled.div`
//   width: 80%;
//   height: 50px;
//   background-color: coral;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 30px auto;
//   border-radius: 5px;
//   transition: all 350ms;
//   transform: scale(1);
//   :hover {
//     transform: scale(1.02);
//     cursor: pointer;
//   }
// `;

// const MainInput = styled.input`
//   width: 300px;
//   height: 40px;
//   outline: none;
//   border: 1px solid lightgray;
//   border-radius: 3px;
//   padding-left: 10px;
//   font-size: 16px;
// `;
// const Content = styled.div``;
// const ContentHolder = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const MainLabel = styled.label`
//   font-size: 13px;
//   font-weight: bold;
//   margin-bottom: 5px;
//   margin-top: 15px;
// `;

// const LableInput = styled.input`
//   display: none;
// `;
// const ImageHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const Image = styled.img`
//   width: 300px;
//   height: 250px;
//   border-radius: 10px;
//   object-fit: cover;
//   background-color: red;
// `;
// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Label = styled.label`
//   margin: 20px 0;
//   color: white;
//   background-color: coral;
//   padding: 10px 20px;
//   border-radius: 30px;
//   transition: all 350ms;
//   transform: scale(1);

//   :hover {
//     transform: scale(0.97);
//     cursor: pointer;
//   }
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
// `;
// const Container = styled.div`
//   width: 100%;
//   min-height: 80vh;
//   height: 100%;
//   padding-top: 30px;
// `;
