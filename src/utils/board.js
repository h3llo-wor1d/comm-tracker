import { BOARD_SECTIONS } from "../constants"
import { getTasksByStatus } from "./tasks"

export const initializeBoard = tasks => {
  // need to allow for saved indexes as well in the future for queue positions of songs
  const boardSections = {}

  Object.keys(BOARD_SECTIONS).forEach(boardSectionKey => {
    boardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey)
  })

  return boardSections
}

export const findBoardSectionContainer = (boardSections, id) => {
  if (id in boardSections) {
    return id
  }

  const container = Object.keys(boardSections).find(key =>
    boardSections[key].find(item => item.id === id)
  )
  return container
}
