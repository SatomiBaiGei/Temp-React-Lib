import todoProps from './TodoInterface'
import TaskListEditedModal from './TaskListEditedModal'
import { PrioritySelectionBar } from './SortedandFilterSelectionBar'
import { AddTaskList, DeleteTaskList, FilterFunc, SortedTaskListFunc } from './TodoListMethodLib'
import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { Checkbox, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PublishIcon from '@mui/icons-material/Publish'
import { useReducer } from 'react'
// import userReducer from "./slices/userSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface Props {
  taskList: todoProps[]
  deleteTask?: () => void
  pushback: (input: todoProps[]) => void
  onCanel: () => void
  replacefunc?: () => void
}

export function TodoList(props: Props) {
  const [TaskEditedTrigger, SetTaskEditedTrigger] = React.useState(false)
  const [selectTask, setSelectTask] = React.useState<todoProps>()
  const [SortedByPriorityIndex, SetSortedByPriorityIndex] = React.useState<number>(0)
  const [FilterByPriorityIndex, SetFilterByPriorityIndex] = React.useState<String>('')

  //persist state on refresh
  const persistConfig = {
    key: 'main-root',
    storage
  }


  const [CompletedTaskList, SetCompletedTaskList] = React.useState<todoProps[]>([])


  // React.useEffect(() => {
  //   const data = localStorage.getItem('my-tier-list')
  //   console.log(data)
  //   if (data) {
  //       TaskListComponentEvaulationFunc(JSON.parse(data))
  //   }
  // }, [])

  // React.useEffect(() => {
  //   console.log(props.taskList)
  //   localStorage.setItem('my-tier-list', JSON.stringify(props.taskList))
  
  // })



  function SetSelectionOfPriorityFunc(input: number) {
    SetSortedByPriorityIndex(input)
  }

  function turnOnEditedBoard() {
    SetTaskEditedTrigger(!TaskEditedTrigger)
  }

  interface PushTaskListFuncProps {
    inputTaskList: todoProps[]
    PriorityFilterInput?: String
  }

  function TaskListComponentEvaulationFunc(
    inputTaskListComponent: todoProps[],
    SortedByPriorityLevel?: number,
    SortedByFilter?: String
  ) {
    if (SortedByPriorityLevel) {
      return TaskListComponent({ inputTaskList: FilterFunc(SortedByPriorityLevel, inputTaskListComponent) })
    }
    if (SortedByFilter) {
      return TaskListComponent({ inputTaskList: SortedTaskListFunc(SortedByFilter, inputTaskListComponent) })
    }
    return TaskListComponent({ inputTaskList: inputTaskListComponent })
  }

  function TaskListComponent({ inputTaskList }: PushTaskListFuncProps) {
    return (
      <ul>
        {inputTaskList.map((task, index) => (
          <li style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  console.log('button check')
                  turnOnEditedBoard()
                  setSelectTask(task)
                }}
              >
                {task.taskTitle}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  SetCompletedTaskList(AddTaskList(CompletedTaskList, task))
                  props.pushback(DeleteTaskList(props.taskList, task.taskId))
                }}
              >
                <AddTaskIcon />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  props.pushback(DeleteTaskList(props.taskList, task.taskId))
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  function CompletedTaskListComponent(CompletedTaskList: todoProps[]) {
    return (
      <ul>
        {CompletedTaskList.map((task, index) => (
          <li style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
            <div>
              <Button variant="outlined" color="inherit" disabled>
                {task.taskTitle}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  props.pushback(AddTaskList(props.taskList, task))
                  SetCompletedTaskList(DeleteTaskList(CompletedTaskList, task.taskId))
                }}
              >
                <PublishIcon />
              </Button>

              <Button
                size="small"
                onClick={() => {
                  SetCompletedTaskList(DeleteTaskList(CompletedTaskList, task.taskId))
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  function PlannedToDoTaskListSection() {
    return <Box>{TaskListComponentEvaulationFunc(props.taskList, SortedByPriorityIndex, FilterByPriorityIndex)}</Box>
  }
  function CompletedTaskSection() {
    return <Box>{CompletedTaskListComponent(CompletedTaskList)}</Box>
  }

  return (
    <div>
      <PrioritySelectionBar SortedIndex={SetSelectionOfPriorityFunc} FilterIndex={SetFilterByPriorityIndex} />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PlannedToDoTaskListSection />
        </Grid>
        <Grid item xs={4}>
          <CompletedTaskSection />
        </Grid>
      </Grid>
      {selectTask && TaskEditedTrigger && (
        <TaskListEditedModal
          taskList={props.taskList}
          OnOffTrigger={turnOnEditedBoard}
          currentTask={selectTask}
          ReplaceTaskPriority={SetSelectionOfPriorityFunc}
        />
      )}
    </div>
  )
}
