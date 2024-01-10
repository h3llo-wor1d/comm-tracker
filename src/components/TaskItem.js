import { Card, CardActions, CardContent } from "@mui/material"
import RefLinks from "./item/refLinks"
import Notes from "./item/notes"
import SubmitCommit from "./item/submitcommit"
import Price from "./item/price"
import CommitHistory from "./item/commithistory"
import { DragHandle } from "@mui/icons-material"

const TaskItem = ({ task, opacity }) => {
  return (
    <div style={{position: "relative", width: "inherit", height: "inherit", opacity: opacity === undefined ? 1 : opacity}}>
      <DragHandle className="pointer" style={{position: "absolute", top: "15px", right: "15px", zIndex: 1}}/>
      <Card style={{position: "absolute", zIndex: -1, width: "100%", height: "100%", opacity: 1}}></Card>
      <CardContent>{task.for}</CardContent>
      <RefLinks links={
        Object.keys(task.userEmbed)
        .filter(i => i.indexOf("Reference Link") !== -1)
        .map(x => task.userEmbed[x])
        .filter(x => x !== "")
      } />
      <Notes details={task.userEmbed["Notes/Additional Information"]} />
      <CommitHistory details={task.commitHistory} for={task.forId} />
      <CardActions style={{position: "relative"}}>
        <SubmitCommit for={task.forId} />
        <Price value={task.price} for={task.forId} />
      </CardActions>
    </div>
    
  )
}

export default TaskItem
