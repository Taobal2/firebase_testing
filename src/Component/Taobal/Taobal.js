import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firebaseApp } from "../../myFirebase";
import firebase from "firebase/compat";

const Taobal = () => {
  const [dataBase, setdataBase] = useState([]);
  const [task, setTask] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [done, setDone] = useState(false);

  const onDone = () => {
    setDone(!done);
  };

  const getData = async () => {
    await firebaseApp
      .firestore()
      .collection("todo")
      .onSnapshot((snapshot) => {
        const file = [];
        snapshot.forEach((doc) => {
          file.push({ ...doc.data(), id: doc.id });
        });
        setdataBase(file);
      });
  };

  const pushData = async () => {
    await firebaseApp.firestore().collection("todo").doc().set({
      taskname: task,
      isDone: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTask("");
  };

  const updateData = async (id) => {
    await firebaseApp.firestore().collection("todo").doc(id).update({
      isDone: done,
    });
  };

  const deleteData = async (id) => {
    await firebaseApp.firestore().collection("todo").doc(id).delete({});
  };

  useEffect(() => {
    getData();
    console.log(dataBase);
  }, []);

  return (
    <Container>
      <Input placeholder="Enter your task" />
      <Button onClick={pushData}>Add Task</Button>
      <Wrapper>
        {dataBase?.map((props, i) => (
          <Card key={i}>
            {props.isDone ? <Color bg="green" /> : <Color bg="red" />}
            <TaskName>{props.taskname}</TaskName>
            <Register>
              <Button
                onClick={() => {
                  onDone();
                  updateData(props.id);
                }}
              >
                Done
              </Button>

              <Button
                onClick={() => {
                  deleteData(props.id);
                }}
              >
                Delete
              </Button>
            </Register>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Taobal;

const Register = styled.div`
  display: flex;
`;

const Card = styled.div`
  width: 350px;
  height: 300px;
  border-radius: 5px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const TaskName = styled.div``;

const Color = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 5px 5px 0 0;
  background-color: ${({ bg }) => bg};
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 0;
  font-size: 15px;
  padding-left: 10px;
`;

const Button = styled.div`
  width: 100px;
  height: 40px;
  background-color: coral;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 15px;
  cursor: pointer;
  border-radius: 5px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 50px;
  flex-wrap: wrap;
`;
