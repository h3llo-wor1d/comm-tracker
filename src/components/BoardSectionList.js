import React, { useEffect, useState } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { getTaskById } from "../utils/tasks"
import { findBoardSectionContainer, initializeBoard } from "../utils/board"
import BoardSection from "./BoardSection"
import TaskItem from "./TaskItem"
import { CircularProgress } from "@mui/material"

const BoardSectionList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [boardSections, setBoardSections] = useState({})

  useEffect(() => {
    fetch("http://127.0.0.1:7614/refresh")
    .then(d => d.json())
    .then(r => {
      setTasks(r.data);
      setBoardSections(initializeBoard(r.data));
      setLoading(false);
    })
  }, [])

 

  const [activeTaskId, setActiveTaskId] = useState(null)

  const [sections, setSections] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active.id)
  }

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id)
    const overContainer = findBoardSectionContainer(boardSections, over?.id)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setBoardSections(boardSection => {
      const activeItems = boardSection[activeContainer]
      const overItems = boardSection[overContainer]

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(item => item.id === active.id)
      const overIndex = overItems.findIndex(item => item.id !== over?.id)

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(item => item.id !== active.id)
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          )
        ]
      }
    })
  }

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id)
    const overContainer = findBoardSectionContainer(boardSections, over?.id)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      task => task.id === active.id
    )
    const overIndex = boardSections[overContainer].findIndex(
      task => task.id === over?.id
    )

    if (activeIndex !== overIndex) {
      setBoardSections(boardSection => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        )
      }))
    }

    setActiveTaskId(null)
  }

  const dropAnimation = {
    ...defaultDropAnimation
  }

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null

  return (
    loading ? 
    <CircularProgress /> :
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={4}>
          {(Object.keys(boardSections).length > 0 && loading === false) && Object.keys(boardSections).map(boardSectionKey => (
            <Grid item xs={4} key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
              />
            </Grid>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </Grid>
      </DndContext>
    </Container>
  )
}

export default BoardSectionList
