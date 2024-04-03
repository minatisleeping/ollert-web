import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

function Card({ card }) {

  const shouldShowCardAction = () => {
    return !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title='green iguana'
        />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds.length && <Tooltip title='People'><Button size='small' startIcon={<Diversity3Icon />}>{card?.memberIds.length}</Button></Tooltip> }
          {!!card?.comments.length && <Tooltip title='Read comment here'><Button size='small' startIcon={<MarkChatUnreadIcon />}>{card?.comments.length}</Button></Tooltip> }
          {!!card?.attachments.length && <Tooltip title='Attachments'><Button size='small' startIcon={<AttachmentIcon />}>{card?.attachments.length}</Button></Tooltip> }
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
