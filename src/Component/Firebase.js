import React, { useState, useEffect } from "react";
import { app } from "./../base";
import styled from "styled-components";
import firebase from "firebase";

const Fire = () => {
  const [dataBase, setDataBase] = useState([]);
  const [task, setTask] = useState("");
  const [done, setDone] = useState(false);

  const onDone = () => {
    setDone(!done);
  };

  const getData = async () => {
    await app
      .firestore()
      .collection("todo")
      .onSnapshot((snapshot) => {
        const file = [];
        snapshot.forEach((doc) => {
          // file.push(doc.data()); this is getting the data
          file.push({ ...doc.data(), id: doc.id }); // this is getting the data and the Data ID
        });
        setDataBase(file);
      });
  };

  const pushData = async () => {
    await app.firestore().collection("todo").doc().set({
      taskName: task,
      isDone: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTask("");
  };

  const updateData = async (id) => {
    await app.firestore().collection("todo").doc(id).update({
      isDone: done,
    });
  };

  useEffect(() => {
    getData();
    // updateData(id)
    console.log(dataBase);
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <Input
            placeholder="Enter Task"
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
            <Title>{props.taskName}</Title>
            <Title>{props.id}</Title>
            <Button
              onClick={() => {
                onDone();
                updateData(props.id);
                console.log(props.id);
              }}
            >
              Done
            </Button>
          </Card>
        ))}
      </MainCard>
    </div>
  );
};

export default Fire;

const Color = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${({ bg }) => bg};
`;
const Title = styled.div`
  flex: 1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
`;

const MainCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;
const Card = styled.div`
  margin: 10px;
  width: 300px;
  min-height: 200px;
  overflow: hidden;
  border-radius: 5px;
  background-color: lightgray;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Button = styled.div`
  width: 250px;
  height: 50px;
  color: white;
  background-color: #004080;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-radius: 5px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid lightgray;
  height: 50px;
  width: 300px;
  padding-left: 10px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  width: 100vw;
  min-height: 200px;
  /* height: 100%; */
  background-color: rgba(255, 255, 255, 0.6);
`;
