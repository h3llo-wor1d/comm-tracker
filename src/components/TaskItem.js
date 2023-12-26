import { CardActions, CardContent } from "@mui/material"
import RefLinks from "./item/refLinks"
import Notes from "./item/notes"
import SubmitCommit from "./item/submitcommit"

const TaskItem = ({ task }) => {
  return (
    <div>
      <CardContent>{task.for}</CardContent>
      <RefLinks links={
        Object.keys(task.userEmbed)
        .filter(i => i.indexOf("Reference Link") !== -1)
        .map(x => task.userEmbed[x])
        .filter(x => x !== "")
      } />
      <Notes details={task.userEmbed["Notes/Additional Information"]} />
      <CardActions>
        <SubmitCommit for={task.forId} />
      </CardActions>
    </div>
    
  )
}

export default TaskItem
