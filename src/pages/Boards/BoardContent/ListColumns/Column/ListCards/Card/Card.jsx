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

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image='https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg'
        title='green iguana'
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>minatt MERN STACK PRO - MUI</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Tooltip title='People'><Button size='small' startIcon={<Diversity3Icon />}>20</Button></Tooltip>
        <Tooltip title='Read comment here'><Button size='small' startIcon={<MarkChatUnreadIcon />}>13</Button></Tooltip>
        <Tooltip title='Attachments'><Button size='small' startIcon={<AttachmentIcon />}>7</Button></Tooltip>
      </CardActions>
    </MuiCard>
  )
}

export default Card
