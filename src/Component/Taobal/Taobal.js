import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firebaseApp } from "../../myFirebase";
import firebase from "firebase/compat";

const Taobal = () => {
  const [dataBase, setDataBase] = useState([]);
  const [task, setTask] = useState("");
  const [done, setDone] = useState(false);

  const onDone = async () => {
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
        setDataBase(file);
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
    await firebaseApp.firestore().collection("todo").doc(id).delete();
  };

  useEffect(() => {
    getData();
    console.log(dataBase);
  }, []);

  return (
    <Container>
      <Input
        placeholder="Enter task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <Button onClick={pushData}>Add Task</Button>
      <Wrapper>
        {dataBase?.map((props, i) => (
          <Card key={i}>
            {done ? <Color bg="green" /> : <Color bg="grey" />}
            <Title>{props.taskname}</Title>{" "}
            <Buttons>
              <Button
                onClick={() => {
                  onDone();
                  updateData(props.id);
                  console.log(props.id);
                }}
              >
                Done
              </Button>
              <Button
                onClick={() => {
                  deleteData(props.id);
                  console.log(props.id);
                }}
              >
                Delete
              </Button>
            </Buttons>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Taobal;

const Buttons = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${({ bg }) => bg};
`;

const Title = styled.div`
  flex: 1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;
`;

const Card = styled.div`
  margin: 10px;
  width: 400px;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const Button = styled.div`
  width: 180px;
  height: 50px;
  color: white;
  background-color: blue;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-radius: 5px;
  transiton: all 400ms;
  transform: scale (1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 20vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: red;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid lightgray;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  padding-left: 10px;
`;
