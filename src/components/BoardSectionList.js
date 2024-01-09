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
    fetch("http://wrenchcommserverahdfkljhaskjfhlkajhf.loca.lt/refresh", {headers: {
      "bypass-tunnel-reminder": true
    }})
    .then(d => d.json())
    .then(r => {
      setTasks(r.data);
      setBoardSections(initializeBoard(r.data));
      setLoading(false);
    })
  }, [])

 

  const [activeTaskId, setActiveTaskId] = useState(null)

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
    const currentTask = boardSections[activeContainer].filter(task => task.id === active.id)[0];

    const overIndex = boardSections[overContainer].findIndex(
      task => task.id === over?.id
    )

    if (activeIndex !== overIndex) {
      //overIndex is the value of where we're moving to, currentTask is the actual task to send...
      //overcontainer is the value of the new status of the item

      // automatically bump all indexes behind the current one if it isn't at the end of the container
      // if overIndex is -1, change it to 0.

      // why the fuck am I doing this i'm so stupid just fucking send the fucking array holy shit hahahahahahahahahahahahahahahahahahahahahaha
      // like no fucking seriously you can just send the fucking array bruhhhh

      // i'll finish queue numbers later i'm not in the mood to work on this rn

      //console.log(overIndex)
      //let ind = overIndex === -1 ? 0 : overIndex;
      //console.log(boardSections[overContainer].length-1)
      //console.log(boardSections[overContainer].length-1 === ind)
      fetch("http://wrenchcommserverahdfkljhaskjfhlkajhf.loca.lt/statusChange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": true
        },
        body: JSON.stringify({
          who: currentTask.forId,
          where: overContainer,
          at: overIndex
        })
      })
      console.log(overContainer, overIndex)
      //currentTask.status;
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
    <CircularProgress style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}/> :
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
