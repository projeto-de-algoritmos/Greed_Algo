import React, { useState, useEffect } from 'react';
import { addHours, isEqual, isBefore } from 'date-fns';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TextField, Slider, Button } from '@material-ui/core';

import List from './components/List';

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [description, setDescription] = useState('');
  const [sliderValue, setSliderValue] = useState(1);
  const [inputFocused, setFocused] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [bestSchedule, setBestSchedule] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);


  // Manage Tasks

  const changeData = (value) => {
    handleDateChange(value)
  }

  const addTasks = () => {
    const sum = addHours(selectedDate, sliderValue);

    if (!description) {
      return alert('A descricao nao pode estar vazia')
    }

    const initialDate = selectedDate;
    const finalDate = sum;
    const initialMoment = format(
      selectedDate,
      "HH:mm' 'dd/MM'"
    );
    const finalMoment = format(
      sum,
      "HH:mm' 'dd/MM'"
    );

    setTasks(() => {
      const list = [...tasks, { initialMoment, finalMoment, initialDate, finalDate, description, id: tasks.length.toString() }];
      return list;
    });
    setDescription('');
    setSliderValue(1);
  }


  const deleteDoneTask = (taskId) => {
    setDoneTasks(() => {
      let doneT = doneTasks.filter(element => element.id !== taskId);
      return doneT;
    })
  }

  // Drag And Drop Events

  const onDragStart = (e, itemId, listId) => {
    e.dataTransfer.setData("ListId", listId);
    e.dataTransfer.setData("itemId", itemId);
  }

  const onDrop = (e) => {
    let incomingId = e.dataTransfer.getData("ListId");
    let itemId = e.dataTransfer.getData("itemId");

    if (incomingId === "tasks" || incomingId === "order") {
      let item = tasks.find(element => element.id === itemId);

      setTasks(() => {
        let newTasks = tasks.filter(element => element.id !== itemId);
        return newTasks;
      });
      setDoneTasks([item, ...doneTasks]);

    } else if (incomingId === "done") {
      let item = doneTasks.find(element => element.id === itemId);

      setDoneTasks(() => {
        let newTasks = doneTasks.filter(element => element.id !== itemId);
        return newTasks;
      });
      setTasks([...tasks, item]);
    }

  }


  // Interval Scheduling

  useEffect(() => {
    if (tasks.length > 0) {
      createBestSchedule();
    } else {
      setBestSchedule([]);
    }
  }, [tasks])

  const sortTasks = () => {
    let aux = tasks;
    aux.sort(function (a, b) {
      return b.finalDate - a.finalDate;
    })
    return aux;
  }

  const createBestSchedule = () => {
    let finalTasks = [];
    let aux = sortTasks();
    finalTasks.push(aux[0]);
    let j = 0

    for (var i = 1; i < aux.length; i++) {
      if (isBefore(aux[i].initialDate, finalTasks[j].finalDate) || isEqual(aux[i].initialDate, finalTasks[j].finalDate)) {
        finalTasks.push(aux[i]);
        j++
      }
    }
    setBestSchedule(finalTasks);
  }

  return (
    <div>
      <h2 style={styles.title}>Welcome to the Task Manager!!
        Here you can get the highest number of tasks that you can do during the day</h2>
      <div>
        <div style={styles.createTasks}>
          <div style={styles.instructions}>
            <p>Insert your task description and the start time</p>
            <div>
              <h3>
                Description
          </h3>
              <TextField
                value={description}
                onFocus={() => { setFocused(false) }}
                onBlur={() => { setFocused(true) }}
                placeholder={'Description'}
                style={{
                  width: "100%",
                  borderColor: inputFocused ? 'black' : 'blue',
                }}
                onChange={(value) => setDescription(value.target.value)}
              />
            </div>
            <div style={styles.pickers}>
              <div style={styles.startTime}>
                <h3>
                  Start time
            </h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker value={selectedDate}
                    onChange={(value) => changeData(value)}
                    color="secondary"
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <h3>
                  Task duration
            </h3>
                <Slider
                  max={23}
                  min={1}
                  style={{ marginTop: 15 }}
                  defaultValue={1}
                  value={sliderValue}
                  onChange={(obj, value) => setSliderValue(value)}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  valueLabelDisplay="on"
                />
              </div>
            </div>
            <div style={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={() => addTasks()}>Add Task</Button>
            </div>
          </div>
          <div>
            <List items={tasks} title={"Task List"} id="tasks" key="tasks" onDrop={onDrop} onDragStart={onDragStart} />
          </div>
        </div>
        <div style={styles.taskContent}>
          <div>
            <List containerColor={"#00FF7F"} items={doneTasks} title={"Done Tasks"} altText={"Drop here done tasks"} id="done" key="done" onDrop={onDrop} onDragStart={onDragStart} close deleteItem={deleteDoneTask} />
          </div>
          <div>
            <List items={bestSchedule} title={"Recommended order"} id="order" key="order" containerColor={"#00BFFF"} onDrop={onDrop} onDragStart={onDragStart} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    textAlign: 'center'
  },
  createTasks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  instructions: {
    padding: 10,
    paddingTop: 0,
    width: "40%"
  },
  pickers: {
    display: 'flex',
    flexDirection: 'row'
  },
  startTime: {
    marginRight: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    margin: 30
  },
  taskContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

export default App;
