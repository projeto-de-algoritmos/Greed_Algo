import React, { useState } from 'react';
import { getMinutes } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TextField, Slider, Button } from '@material-ui/core';

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [description, setDescription] = useState('');
  const [inputFocused, setFocused] = useState(true);

  const changeData = (value) => {
    handleDateChange(value)
    console.log("valor da data", getMinutes(value));
  }

  return (
    <div style={{ flex: 1 }}>
      <div style={{marginLeft:10}}>
        <h2 style={{ textAlign: 'center' }}>Welcome to the Task Manager!!
        Here you can get the highest number of tasks that you can do during the day</h2>
        <p style={{marginTop: 50}}>Insert your task description and the start time</p>
        <div>
          <h3>
            Description
          </h3>
          <TextField
            value={description}
            onFocus={() => {setFocused(false)}}
            onBlur={() => {setFocused(true)}}
            placeholder={'Description'}
            style={{
              width: window.innerWidth / 2,
              borderColor: inputFocused ? 'black' : 'blue',
            }}
            onChange={(value) => setDescription(value.target.value) }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{marginRight: 50}}>
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
              style={{marginTop: 15}}
              defaultValue={1}
              aria-labelledby="discrete-slider-always"
              step={1}
              valueLabelDisplay="on"
            />
          </div>
        </div>
        <div style={{flexDirection:'row', display:'flex', marginTop: 30}}>
          <Button variant="contained" color="primary">
            Add Task
          </Button>
          <Button variant="contained" color="secondary" style={{marginLeft: 50 }}>
            Generate best schedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
