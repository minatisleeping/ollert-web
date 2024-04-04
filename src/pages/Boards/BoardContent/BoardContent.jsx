import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {

  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('🚀 ~ handleDragEnd: ', event)
    const { active, over } = event // active: là thằng đang kéo, over: là thằng bị kéo

    // Nếu k tồn tại over (kéo xàm l) thì return luôn tránh lỗi
    if (!over) return

    // Nếu newIndex != oldIndex thì mới thực hiện sắp xếp lại mảng
    if (active.id !== over.id) { // Tại sao active và over lại là .id ? Vì mình đang sử dụng thư viện của nó(nó sử dụng key là id) =))
      // Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo
      // Lấy vị trí mới từ thằng over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo

      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex) // kéo từ thằng nào đến thằng nào nên mới old trước new sau
      // 2 cái console.log dữ liệu này sau dùng để xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) // Sau khi drag&drop column xong thì set lại giá trị cho columnOrderIds(value của columnOrderIds sẽ quyết định vị trí của từng column)
      // console.log('🚀 ~ dndOrderedColumns ~ dndOrderedColumns:', dndOrderedColumns)
      // console.log('🚀 ~ dndOrderedColumnsIds ~ dndOrderedColumnsIds:', dndOrderedColumnsIds)

      // Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{ //Board Bar
        bgcolor: theme => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
