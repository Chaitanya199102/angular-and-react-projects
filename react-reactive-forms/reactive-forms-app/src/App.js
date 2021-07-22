import './App.css';
import { FormGenerator } from "react-reactive-form";
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import GenderRadio from './components/GenderRadio';
import SelectBox from './components/SelectBox';
import Checkbox from './components/CheckBox';
import React from 'react';

function App() {

  const fieldConfig = {
    controls: {
        first_name: {
          render: TextInput,
          meta: {
            label: "First Name",
            placeholder: "Enter first name"
          }
        },
        last_name: {
          render: TextInput,
          meta: {
            label: "Last Name",
            placeholder: "Enter last name"
          }
        },
        gender: {
          formState: "male",
          render: GenderRadio
        },
        nationality: {
          render: SelectBox
        },
        notes: {
          render: TextArea
        },
        terms: {
          formState: false,
          render: Checkbox
        }
      }
  };
  
  let myForm = undefined;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(myForm.value);
    alert(`You submitted \n ${JSON.stringify(myForm.value, null, 2)}`);
  };

  const handleReset = () => {
    myForm.reset();
  };

  const setForm = (form) => {
    console.log('setting form')
    myForm = form;
    form.meta = {
      handleSubmit: handleSubmit,
      handleReset: handleReset
    };
  };

  return (
    <div className="App">
      <h1>Forms Sections</h1>
        <div>
          <FormGenerator onMount={($event)=>setForm($event)} fieldConfig={fieldConfig} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  );
}

export default App;
