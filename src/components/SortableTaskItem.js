import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@mui/material"
import { DragHandle } from "@mui/icons-material"

const SortableTaskItem = ({ children, id, task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    //opacity: isDragging ? 0 : 1
  }

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
