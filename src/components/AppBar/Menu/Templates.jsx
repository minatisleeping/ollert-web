import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'


function Templates() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        id='basic-button-templates'
        aria-controls={open ? 'basic-menu-templates' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Templates
      </Button>
      <Menu
        id='basic-menu-templates'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-templates'
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <SendIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Kanban Board</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PriorityHighIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Scrum Board</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit' noWrap>
          Agile Development
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Templates