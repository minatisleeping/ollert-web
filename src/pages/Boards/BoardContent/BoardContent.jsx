import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import {
  DndContext,
  // PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
  // rectIntersection,
  // closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'

import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard }) {
  // pointer sensor cũng ngon nhưng còn vài case chưa thật sự ổn nên mình chuyển qua dùng mouse sensor
  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } }) // >= 10px thì mới tính là kéo

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click thì gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Nhấn giữ 250ms va2 dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // Ưu tiên sử dụng kết hợp cả 2 sensor để tăng trải nghiệm cho người dùng(speialy in mobile device)
  // const sensors = useSensors(pointerSensor) // k dùng pointer sensor nữa
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thì điểm chỉ có 1 phần tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng (xử lí thuật toán phát hiện va chạm)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm một cái Column theo CardId
  const findColumnByCardId = (cardId) => {
    /* Nên dùng column.cardId thay vì column.cardOrderIds vì ở bước handleDragOver mình sẽ làm dữ liệu cho cards
    hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới */
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //! Func chung xử lí việc Cập nhật state trong trường hợp di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumn => {
      // Tìm vị trí (index) của cái overCard trong Column đích (nơi mà activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tính toán 'cardIndex mới' (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // * Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xoá card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Thêm Placeholder Card nếu Column rỗng: bị kéo hết tất cả Card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem Card đang kéo nó có tồn tại ở overColumn chưa, nếu co thì xoá nó đi trước khi thêm vào
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Phải cập nhật lại chuẩn dữ liệu columnId trong Card sau khi kéo Card giữa 2 column khác nhau
        //!  const rebuild_activeDraggingCardData = { ...activeDraggingCardData, columnId: nextOverColumn._id }
        // Tiếp theo là thêm cái Card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, { ...activeDraggingCardData, columnId: nextOverColumn._id }
        )

        // Xoá cái Placeholder Card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      // console.log('🚀 ~ handleDragOver ~ nextColumns:', nextColumns)
      return nextColumns
    })
  }

  // ! Trigger khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log('🚀 ~ handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu lal2 kéo Card thì mới thực hiện hannh2 độn set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // ! Trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo Card thì xử lí thêm để có thể kéo Card qua lại giữa các Columns
    // console.log('🚀 handleDragOver: ', event)
    const { active, over } = event

    // Cần đảm bảo nếu k tồn tại active or over (khi kéo ra khỏi phạm vi container) thì k làm gì (tránh crash trang)
    if (!active || !over) return

    // activeDraggingCard: là cái Card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là các Card đang tương tác ở phía trên hoặc dưới so với cái Card được kéo ở trên
    const { id: overCardId } = over

    // * Tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // ! Tới được đây thì có nghĩa là activeColumn và overColumn đã được tìm thấy
    // * Xử lí logic ở đây chỉ khi kéo card qua 2 columns khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì cả
    // * Vì đây là đoạn xử lí lúc kéo (handleDragOver), còn xử lí lúc kéo xong xuôi thì nó lại là vấn đề khác ở
    //(handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // ! Trigger khi kết thúc hành động kéo 1 phần tử
  const handleDragEnd = (event) => {
    // console.log('🚀 ~ handleDragEnd: ', event)
    const { active, over } = event // active: là thằng đang kéo, over: là thằng bị kéo

    // Cần đảm bảo nếu k tồn tại active or over (khi kéo ra khỏi phạm vi container) thì k làm gì (tránh crash trang)
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      // activeDraggingCard: là cái Card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: là các Card đang tương tác ở phía trên hoặc dưới so với cái Card được kéo ở trên
      const { id: overCardId } = over

      // * Tìm 2 cái column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      /* Hành động kéo thả card giữa 2 column khác nhau
         Phải dùng tới activeDragItemData.columnId or oldColumnWhenDraggingCard._id (set vào state
      từ bước handleDragStart) chứ k phải activeData trong scope handleDragEnd này vì sau khi
      đi qua onDragOver tới đây là state của card đã bị update 1 lần rồi */
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Hành động kéo thả card trong cùng 1 column

        // Lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo
        // Lấy vị trí mới từ thằng over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumn => {
          // * Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumn)

          // Tìm tới cái Column mà ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là Card và cardOrderIDs trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // Trả về giá trị state mới (chuẩn vị tri1)
          return nextColumns
        })
      }
    }

    // ! Xử lí kéo thả Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('Hành động kéo thả Column')
      // Nếu newIndex != oldIndex thì mới thực hiện sắp xếp lại mảng
      if (active.id !== over.id) { // Tại sao active và over lại là .id ? Vì mình đang sử dụng thư viện của nó(nó sử dụng key là id) =))
        // Lấy vị trí cũ từ thằng active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo
        // Lấy vị trí mới từ thằng over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id) // set oldIndex === active.id tức là lấy index của thằng đang bị kéo

        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex) // kéo từ thằng nào đến thằng nào nên mới old trước new sau
        // 2 cái console.log dữ liệu này sau dùng để xử lý gọi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) // Sau khi drag&drop column xong thì set lại giá trị cho columnOrderIds(value của columnOrderIds sẽ quyết định vị trí của từng column)
        // console.log('🚀 ~ dndOrderedColumns ~ dndOrderedColumns:', dndOrderedColumns)
        // console.log('🚀 ~ dndOrderedColumnsIds ~ dndOrderedColumnsIds:', dndOrderedColumnsIds)

        // Cập nhật lại state columns ban đầu sau khi đã kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả này lun phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  // Animation khi thả (drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  // Chúng ta sẽ custom lại chiến lược/thuật toán phát hiện va chạm tối ưu cho việc kéo thả Card giữa nhiều Column
  const collisionDetectionStrategy = useCallback((args) => {
    // Trường hợp kéo Column thì dùng thuật toán closestCorners là chuẩn nhất
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Tìm các điểm va chạm, giao nhau - intersection với con trỏ
    const pointerIntersections = pointerWithin(args)

    // Fix triệt để cái bug flickering của thư viên Dnd-kit in case: Kéo 1 cái Card có image lớn và kéo lên trên cùng khỏi khu vực drag&drop
    if (!pointerIntersections?.length) return

    // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
    //! Bước này k cần nữa
    // const intersection = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    // Tìm ra cái id đầu tiên trong đám pointerIntersections ở trên
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      //! Đoạn này fix flickering
      /*   Nếu cái over nó là Counter thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào
      thuật toán phát hiện va chạm closestCenter or closestCorners đều đc. Tuy nhiên ở đây dùng closestCorners thì smooth hơn*/
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    // Nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      /* Thuật toán phát hiện va chạm (nếu không có nó thì Card với cover lớn sẽ không kéo qua Column được
      vì lúc này nó đang bị conflict giữa Card và Column), chúng ta sẽ dùng closestCorners thay vì closestCenter */
      //! UPDATE: nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu
      // collisionDetection={closestCorners}

      // Tự advanced custom nâng cao thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}

      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ //Board Bar
        bgcolor: theme => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
