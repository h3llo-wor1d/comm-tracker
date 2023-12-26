import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { Card } from "@mui/material"
import { DragHandle } from "@mui/icons-material"

const SortableTaskItem = ({ children, id, task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id })

  return (
    <div ref={setNodeRef} /*style={style} {...attributes} {...listeners}*/>
      <Card style={{position: "relative", width: "auto", height: "auto"}}>
        <DragHandle className="pointer" style={{position: "absolute", top: "15px", right: "15px"}} {...listeners} {...attributes} />
        {children}
      </Card>
      
    </div>
  )
}

export default SortableTaskItem
