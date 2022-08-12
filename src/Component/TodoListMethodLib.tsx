import todoProps from './TodoInterface'
import { Button}from'@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export function AddTaskList(inputList: todoProps[], input: todoProps): todoProps[] {
  return [...inputList, input]
}

export function DeleteTaskList(input: todoProps[], id: number) {
  return input.filter(items => items.taskId !== id)
}

export function FilterFunc(priority: number, taskList: todoProps[]): todoProps[] {
  return taskList.filter(task => task.taskPriorityIndex === priority)
}
export function SortByHighLowPriority(a: todoProps, b: todoProps) {
  if (a.taskPriorityIndex !== b.taskPriorityIndex) {
    return b.taskPriorityIndex - a.taskPriorityIndex
  }
  return a.taskId - b.taskId
}
export function SortByLowHighPriority(a: todoProps, b: todoProps) {
  if (a.taskPriorityIndex !== b.taskPriorityIndex) {
    return a.taskPriorityIndex - b.taskPriorityIndex
  }
  return a.taskId - b.taskId
}
export function SortByTime(a: todoProps, b: todoProps) {
  return a.taskId - b.taskId
}
export function SortedTaskListFunc(SortedOption: String, SortTaskList: todoProps[]):todoProps[] {
  switch (SortedOption) {
    case 'high-low-priority':
      return SortTaskList.sort(SortByHighLowPriority)

    case 'low-high-priority':
      return SortTaskList.sort(SortByLowHighPriority)

    case 'Time':
      return SortTaskList.sort(SortByTime)
  }
  return SortTaskList
}

export function CompletedTaskListComponent(CompletedTaskList: todoProps[]){
  return (
    <ul>
      {CompletedTaskList.map((task, index) => (
        <li style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
          <div>
            <Button
              variant="outlined"
              color="inherit"
              disabled
            >
              {task.taskTitle}
            </Button>
           
            <Button
              size="small"
              onClick={() => {
              }
            }
            >
              <DeleteIcon />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface ModalComfirmPageProps {
  InputTaskList: todoProps[]
}
export function ModalConfirmPage(input: ModalComfirmPageProps) {

}
