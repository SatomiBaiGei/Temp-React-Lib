import todoProps from './TodoInterface'
import Button from '@mui/material/Button'
import { Box, TextField } from '@mui/material'
import * as React from 'react'
import Select from 'react-select'
import PriorityProps from './PriorityProps'

interface TaskDetailProps {
  taskList: todoProps[]
  OnOffTrigger: () => void
  currentTask: todoProps
  replaceTaskInfo?: (input: any) => void
  ReplaceTaskPriority?: (input: any) => void
}
export default function TaskListEditedModal(prop: TaskDetailProps) {
  const [priority, setPriority] = React.useState<PriorityProps>(prop.currentTask.taskPriorityList)
  const [levelIndex, setLevel] = React.useState<number>()
  const [newTitle, setNewTitle] = React.useState(prop.currentTask.taskTitle)
  const [newInfo, setNewInfo] = React.useState('')
  const [task, setTask] = React.useState<todoProps>()

  const handleSelectChange = (e: any) => {
    setPriority(e)
    setLevel(e.value)
  }

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    setNewTitle(event.target.value)
  }
  const getNewTaskDescription: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    setNewInfo(event.currentTarget.value)
  }

  const priorityListInfo: PriorityProps[] = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' }
  ]

  function NewPriorityList() {
    return (
      <div>
        <Select value={priority} options={priorityListInfo} onChange={val => handleSelectChange(val)} />
      </div>
    )
  }

  function taskReplacement() {
    prop.currentTask.taskTitle = newTitle
    prop.currentTask.taskDescription = newInfo
    prop.currentTask.taskPriorityIndex = levelIndex
    prop.currentTask.taskPriorityList = priority
  }
  function ComfirmEditedButton() {
    return (
      <Button
        variant="outlined"
        onClick={() => {
          prop.OnOffTrigger()
          taskReplacement()
        }}
      >
        COMFIRM
      </Button>
    )
  }
  return (
    <div className="modal">
      <Box margin="normal" sx={{ m: 1, width: '13cm', height: '1cm' }}>
        <h1>{newTitle}</h1>
      </Box>
      <div>
        <TextField
          margin="normal"
          sx={{ m: 1, width: '13cm' }}
          id="task-title"
          label="Task Title"
          defaultValue={task?.taskTitle}
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <TextField
          margin="normal"
          sx={{ m: 1, width: '13cm' }}
          rows={4}
          id="task-info"
          label="Task Description"
          defaultValue={task?.taskDescription}
          onChange={getNewTaskDescription}
        />
      </div>
      <div>
        <NewPriorityList />
      </div>
      <div>
        <h1> </h1>
      </div>
      <ComfirmEditedButton />
    </div>
  )
}
