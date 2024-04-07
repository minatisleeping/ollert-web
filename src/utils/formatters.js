/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/*
  Cách xử lí bug logic thư viện Dnd-kit khi Column là rỗng"
  Phía FE sẽ tự tạo ra một cái Card đặc biệt: Placeholder Card, k liên quan tới BE
  Card đặc biệt này sẽ d0c ẩn để Unique rất đơn giản, k cần phải làm random phức tạp:
  'columnId-placeholder-card' (mỗi Column chỉ có thể có tối đa 1 cái Placeholder Card)
  Quan trọng khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_PlaceholderCard: true)
*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
