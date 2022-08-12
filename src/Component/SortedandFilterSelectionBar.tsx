import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'


interface BottonsProps {
  SortedIndex: (input: number) => void
  FilterIndex: (input: String) => void
}

export function PrioritySelectionBar(props: BottonsProps) {
  function SelectionBar() {
    const [age, setAge] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value)
    }

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label="Sorted"
          >
            <MenuItem
              value=""
              onClick={() => {
                props.SortedIndex(0)
              }}
            >
              <em>None</em>
            </MenuItem>
            <MenuItem
              value={10}
              onClick={() => {
                props.SortedIndex(3)
              }}
            >
              High
            </MenuItem>
            <MenuItem
              value={20}
              onClick={() => {
                props.SortedIndex(2)
              }}
            >
              Medium
            </MenuItem>
            <MenuItem
              value={30}
              onClick={() => {
                props.SortedIndex(1)
              }}
            >
              Low
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label="Filter"
          >
            <MenuItem
              value=""
              onClick={() => {
                props.FilterIndex("Time")
              }}
            >
              <em>Time</em>
            </MenuItem>
            <MenuItem
              value={10}
              onClick={() => {
                props.FilterIndex("high-low-priority")
              }}
            >
              High to Low
            </MenuItem>
            <MenuItem
              value={20}
              onClick={() => {
                props.FilterIndex("low-high-priority")
              }}
            >
              Low to High
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
  return (
    <div>
      <SelectionBar />
    </div>
  )
}
