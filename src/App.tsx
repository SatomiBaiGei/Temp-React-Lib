import './App.css'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import { useFeature } from '@growthbook/growthbook-react'
import React from 'react'

import { Modal } from './Component/Modal'
import todoProps from './Component/TodoInterface'
import Button from '@mui/material/Button'
import PriorityProps from './Component/PriorityProps'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ErrorBoundary } from 'react-error-boundary'
import { AddTaskList } from './Component/TodoListMethodLib'
import { TodoList } from './Component/TodoList'

const growthbook = new GrowthBook({
  // Callback when a user is put into an A/B experiment
  trackingCallback: (experiment, result) => {
    console.log('Experiment Viewed', {
      experimentId: experiment.key,
      variationId: result.variationId
    })
  }
})

function Page() {
  //Deployed useReducer

  //Turn On and Off Modal window
  const [ModelOnOffTrigger, SetModelOnOffTrigger] = React.useState(false)
  //React Hook to set up task list
  const [taskList, setTaskList] = React.useState<todoProps[]>(JSON.parse(localStorage.getItem('tasklistdata') ?? '[]'))

  React.useEffect(() => {
    const taskData = localStorage.getItem('tasklistdata')
    if (taskData) {
      console.log(JSON.parse(taskData))
      setTaskList(JSON.parse(taskData))
    }
  }, [])

  React.useEffect(() => {
    console.log(taskList)
    localStorage.setItem('tasklistdata', JSON.stringify(taskList))
  }, [taskList])

  // A/B Testing
  const taskTitle = useFeature('task-title').on

  const todoIDCounterRef = React.useRef(0)

  // Task List setting function
  function set(inputText: string, inputInfo: string, inputPriority: any, inputPriorityList: PriorityProps) {
    //Create new object
    const todo: todoProps = {
      taskId: todoIDCounterRef.current,
      taskTitle: inputText,
      taskCheckBox: false,
      taskDescription: inputInfo,
      taskPriorityIndex: inputPriority,
      taskPriorityList: inputPriorityList,
      taskUpdateAt: Date.now()
    }
    todoIDCounterRef.current = todoIDCounterRef.current + 1

    //Push a setup task list into array
    setTaskList(AddTaskList(taskList, todo))
  }

  // Modal On and Off trigger
  function TurnOnOffModalFunc() {
    SetModelOnOffTrigger(!ModelOnOffTrigger)
  }

  function CatchBackRemoveTaskListFromPushBack(input: todoProps[]) {
    setTaskList(input)
  }

  let taskTitleElement
  let taskTitleButton

  taskTitleElement = <h1>TASK</h1>
  taskTitleButton = (
    <Button variant="contained" onClick={TurnOnOffModalFunc} endIcon={<AddCircleIcon />}>
      {' '}
      ADD TO DO
    </Button>
  )

  function ErrorFallback() {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre></pre>
        <button>Try again</button>
      </div>
    )
  }
  return (
    <div>
      {taskTitleElement}
      {taskTitleButton}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        {ModelOnOffTrigger && <Modal onCancel={TurnOnOffModalFunc} setArr={set} />}
      </ErrorBoundary>
      <TodoList taskList={taskList} pushback={CatchBackRemoveTaskListFromPushBack} onCanel={TurnOnOffModalFunc} />
    </div>
  )
}

function App() {
  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Page />
    </GrowthBookProvider>
  )
}

export default App
function initializer<T, U>(testListReducer: () => void, arg1: never[], initializer: any, arg3: null): [any, any] {
  throw new Error('Function not implemented.')
}
