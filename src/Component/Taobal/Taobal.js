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
    <MenuContainer>
      <Container>
        <Wrapper>
          <Input
            placeholder="Enter task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <Button onClick={pushData}>Add Task</Button>
        </Wrapper>
      </Container>

      <MainCard>
        {dataBase?.map((props, i) => (
          <Card key={i}>
            {props.isDone ? <Color bg="green" /> : <Color bg="red" />}
            <Title>{props.taskname}</Title>
            <Button
              onClick={() => {
                updateData(props.id);
                onDone();
                console.log(props.id);
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
          </Card>
        ))}
      </MainCard>
    </MenuContainer>
  );
};

export default Taobal;

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

const MainCard = styled.div`
  dsplay: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  justify-content: center;
`;

const Card = styled.div`
  margin: 10px;
  width: 300px;
  min-height: 200px;
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
  width: 250px;
  height: 50px;
  color: white;
  background-color: blue;
  margin-top: 20px;
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

const MenuContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 20vh;
  // height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  // min-height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid lightgray;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  padding-left: 10px;
`;
