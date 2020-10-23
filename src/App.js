import React, { useState, useEffect } from 'react';
import { addHours, isAfter, isEqual, isBefore } from 'date-fns';
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

  const changeData = (value) => {
    handleDateChange(value)
  }

  const addTasks = () => {
    const sum = addHours(selectedDate, sliderValue);
    /* if ((getDayOfYear(sum) - getDayOfYear(selectedDate)) !== 0) {
      return alert('A duracao da tarefa nao pode ir para o proximo dia')
    } */

    /*    if (!description) {
         return alert('A descricao nao pode estar vazia')
       } */

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
      const list = [...tasks, { initialMoment, finalMoment, initialDate, finalDate, description, id: tasks.length + 1 }];
      return list;
    });
    setDescription('');
    setSliderValue(1);
  }

  useEffect(() => {
    if ( tasks.length > 0) {
      createBestSchedule();
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
    console.log(aux);
    console.log(aux[1]);
    console.log(finalTasks[0])
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
      <h2 style={{ textAlign: 'center' }}>Welcome to the Task Manager!!
        Here you can get the highest number of tasks that you can do during the day</h2>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ padding: 10, paddingTop: 0 }}>
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
                  width: window.innerWidth / 2,
                  borderColor: inputFocused ? 'black' : 'blue',
                }}
                onChange={(value) => setDescription(value.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: 50 }}>
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
            <div style={{ flexDirection: 'row', display: 'flex', margin: 30 }}>
              <Button variant="contained" color="primary" onClick={() => addTasks()}>
                Add Task
          </Button>
{/*               <Button variant="contained" color="secondary" onClick={() => createBestSchedule()} style={{ marginLeft: 50 }}>
                Generate best schedule
          </Button> */}
            </div>
          </div>
          <div>
            <List items={bestSchedule} title={"Recommended order"} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <List items={tasks} title={"Task List"} />
          </div>
{/*           <div>
            <List items={bestSchedule} title={"Recommended order"} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
