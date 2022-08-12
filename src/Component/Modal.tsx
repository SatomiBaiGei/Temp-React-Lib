import { Box, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import PriorityProps from './PriorityProps'
import * as React from 'react'
import Select from 'react-select'
import { TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

interface Props {
  setArr: (inputText: string, inputInfo: string, priorityLevel: any, priorityList: any) => void
  onCancel: () => void
}


export function Modal(props: Props) {
  const [taskTitle, setTaskTitle] = React.useState('')
  const [info, setInfo] = React.useState('')
  const [priority, setPriority] = React.useState()
  const [levelIndex, setLevel] = React.useState()

  const getInputVal: React.ChangeEventHandler<HTMLInputElement> = event => {
    setTaskTitle(event.currentTarget.value)
  }
  const getDescription: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    setInfo(event.currentTarget.value)
  }

  const priorityList: PriorityProps[] = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' }
  ]

  const HandleSelectChange = (e: any) => {
    setPriority(e)
    setLevel(e.value)
  }

  const PriorityList = () => (
    <div>
      <Select value={priority} options={priorityList} onChange={val => HandleSelectChange(val)} />
    </div>
  )

  const pushSet = () => {
    props.setArr(taskTitle, info, levelIndex, priority)
    props.onCancel() 
  }



  function taskTitleCheckFunc() {
    try{if (taskTitle !== '') {
      pushSet()
    }
    else{
      throw new Error("Enter Your Task Title Here")
    }}
    catch(error){
      console.log(error)
    }
  }
  

  return (
    <div className="modal"> 
    <Box margin = "normal" sx = {{m:1, width:'13cm',height:'1cm'}}>
      <h1>{taskTitle}</h1>
      <div></div>
    </Box>
      <div>
        <TextField
          margin="normal"
          sx={{ m: 1, width: '13cm' }}
          id="task-title"
          label="Task Title"
          onChange={getInputVal}
        />
      </div>

      <div>
        <TextField
          margin="normal"
          sx={{ m: 1, width: '13cm' }}
          rows={4}
          id="task-info"
          label="Task Description"
          onChange={getDescription}
          multiline={true}
        />
      </div>
      <h1></h1>
      <div>
        <PriorityList />
      </div>
      <h1></h1>
      <Stack spacing={41} direction="row">
        <div>
          
          <Button
            variant="contained"
            onClick={() => {
             taskTitleCheckFunc();
            }}
            endIcon={<AddCircleIcon />}
          >
            ADD
          </Button>
         
        </div>

        <div>
          <Button variant="contained" onClick={props.onCancel}>
            CANCEL
          </Button>
        </div>
      </Stack>
    </div>
  )
}

