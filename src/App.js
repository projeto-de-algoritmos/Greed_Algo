import React, { useState } from 'react';
import { addHours, isAfter } from 'date-fns';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TextField, Slider, Button } from '@material-ui/core';

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [description, setDescription] = useState('');
  const [sliderValue, setSliderValue] = useState(1);
  const [inputFocused, setFocused] = useState(true);
  const [tasks, setTasks] = useState([]);

  const changeData = (value) => {
    handleDateChange(value)
  }

  const addTasks = () => {
    const sum = addHours(selectedDate, sliderValue);
    /* if ((getDayOfYear(sum) - getDayOfYear(selectedDate)) !== 0) {
      return alert('A duracao da tarefa nao pode ir para o proximo dia')
    } if (!description) {
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


  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <h2 style={{ textAlign: 'center' }}>Welcome to the Task Manager!!
        Here you can get the highest number of tasks that you can do during the day</h2>
        <p style={{ marginTop: 50 }}>Insert your task description and the start time</p>
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
          <Button variant="contained" color="secondary" style={{ marginLeft: 50 }}>
            Generate best schedule
          </Button>
        </div>
        {tasks.length > 0 &&
          <div style={{ padding: 20, overflowY: 'scroll', width: "45vw", height: "30vh", borderColor: '#F2F2F2', borderWidth: 5, borderStyle: "solid" }}>
            <h2>Task List</h2>
            {tasks.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#6d8cee', flexDirection: 'row', display: 'flex', marginTop: 10, marginBottom: 10, padding: 20, width: "90%", overflow: 'hidden' }}>
                {/* <h3 style={{ alignSelf: 'center', marginRight: 20 }}>Tarefa numero {index + 1}</h3> */}
                <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: '80%' }}>
                  <div style={{ marginBottom: 5 }}>{item.description}</div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', width: '70%' }}>
                    <div>{item.initialMoment}</div>
                    <div style={{ marginLeft: 20, marginRight: 20 }}>-</div>
                    <div>{item.finalMoment}</div>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
