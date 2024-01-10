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
    <div ref={setNodeRef} style={{height: "fit-content", width: "350px", position: "relative"}}/*style={style} {...attributes} {...listeners}*/>
        <DragHandle className="pointer" style={{position: "absolute", top: "15px", right: "15px", zIndex: 2}} {...listeners} {...attributes} />
        <Card style={{position: "absolute", zIndex: -1, width: "100%", height: "100%", opacity: 1}}></Card>
        {children}  
    </div>
  )
}

export default SortableTaskItem
