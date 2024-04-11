import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [boardd, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng boardId: sau này mình sẽ sử dụng react-router-dom để lấy boardId từ URL về
    const boardId = '6617b0a36b9e5ffd5e4c0bc9'
    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={boardd} />
      <BoardContent board={boardd} />
    </Container>
  )
}

export default Board
