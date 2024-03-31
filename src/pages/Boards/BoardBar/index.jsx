import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SecurityIcon from '@mui/icons-material/Security'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{ //Board Bar
      width: '100%',
      height: theme => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflow: 'auto',
      bgcolor: theme => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label='minatisleeping MERN Stack Board'
          clickable //onClick={() => {}}: cách này cũng được, thấy cũng hay =)))
        />
        <Chip
          sx={MENU_STYLE}
          icon={<SecurityIcon />}
          label='Public/Private Workspaces'
          clickable //onClick={() => {}}: cách này cũng được, thấy cũng hay =)))
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label='Add To Google Drive'
          clickable //onClick={() => {}}: cách này cũng được, thấy cũng hay =)))
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label='Automation'
          clickable //onClick={() => {}}: cách này cũng được, thấy cũng hay =)))
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label='Filter'
          clickable //onClick={() => {}}: cách này cũng được, thấy cũng hay =)))
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            // gap: '10px', [mode:off] - anhQuân có, còn mình k có =)))
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              // border: 'none',
              borderWidth: '1.5px' //[mode:tự thêm =))]
            }
          }}
        >
          <Tooltip title='minat'>
            <Avatar
              alt='minat'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/275367768_1461954760914779_2105340831232289498_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yZ3YSmTRBHEAX9yPrwu&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAI2Tz3Yg92sHhBB3sZYuY0MEFmAxxo2NCYczukCOxawA&oe=660AC9CF'
            />
          </Tooltip>
          <Tooltip title='Lê Điêp'>
            <Avatar
              alt='Lee Hole Deep'
              src='https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/409849104_6896649490413592_1708925570856723941_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_GYpyCZhTLEAX_M-c2j&_nc_oc=Adh1mNOZzSXISB-oxCCoTSnop_mLR-HU8Tnj0WurX-ofzowtMM9dA1IL_0DttCIsoAE&_nc_ht=scontent.fhan4-5.fna&oh=00_AfBQ6Mttfaes7UOAxvBSUWE3BmGC7Lajdlvq4kNwlM4-Og&oe=660A945E'
            />
          </Tooltip>
          <Tooltip title='Nguyễn Thế Hoàng'>
            <Avatar
              alt='Giáo.Làng'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/270961679_10159870536636108_2642967668131478092_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=D28lE3oUmggAX8ZqyWd&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCZolgHaeyOJM3j74WgEYNiuJxQwBzcM869zjE0ShV-cQ&oe=660AB797'
            />
          </Tooltip>
          <Tooltip title='tân trần ác quỉ'>
            <Avatar
              alt='tân trần ác quỉ'
              src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/275558861_1009487280003014_5626488165690134641_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jJ5__6ALvUsAX_GGDaw&_nc_ht=scontent.fhan4-3.fna&oh=00_AfDodyC_EUufqPbaKJMiZlZkjopxv9EJUdMtcuZEpkfyYA&oe=660AF252'
            />
          </Tooltip>
          <Tooltip title='huy'>
            <Avatar
              alt='huy'
              src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/293065237_460578709243589_1179034753693247704_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ccOAAVLqA1UAX9OftEm&_nc_ht=scontent.fhan4-3.fna&oh=00_AfCAZC4gRUMPnpU8bt95SK0bhfURxcXwCd2TNZyljmeJwg&oe=660B54CE'
            />
          </Tooltip>
          <Tooltip title='chanpun'>
            <Avatar
              alt='chanpun'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t1.6435-9/120225747_134002775091150_2543228272478636974_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MQcBhj_i58gAX_TiNUo&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAQVAIS_RRmIQENRH6823DreI_UBgEVHU9bwsiKJM-zUg&oe=662DCB65'
            />
          </Tooltip>
          <Tooltip title='Trần Tiến'>
            <Avatar
              alt='Trần Tiến'
              src='https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/404986929_365977682484734_8362423529042821163_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3DUtFpdsV4AAX8j0gro&_nc_ht=scontent.fhan4-1.fna&oh=00_AfB8OT8TkTb5zUyQmItjvh3eEocfu-Xd0o4I30QgzofDpw&oe=660AC4F3'
            />
          </Tooltip>
          <Tooltip title='minat'>
            <Avatar
              alt='minat'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/275367768_1461954760914779_2105340831232289498_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yZ3YSmTRBHEAX9yPrwu&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAI2Tz3Yg92sHhBB3sZYuY0MEFmAxxo2NCYczukCOxawA&oe=660AC9CF'
            />
          </Tooltip>
          <Tooltip title='Lê Điêp'>
            <Avatar
              alt='Lee Hole Deep'
              src='https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/409849104_6896649490413592_1708925570856723941_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_GYpyCZhTLEAX_M-c2j&_nc_oc=Adh1mNOZzSXISB-oxCCoTSnop_mLR-HU8Tnj0WurX-ofzowtMM9dA1IL_0DttCIsoAE&_nc_ht=scontent.fhan4-5.fna&oh=00_AfBQ6Mttfaes7UOAxvBSUWE3BmGC7Lajdlvq4kNwlM4-Og&oe=660A945E'
            />
          </Tooltip>
          <Tooltip title='Nguyễn Thế Hoàng'>
            <Avatar
              alt='Giáo.Làng'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/270961679_10159870536636108_2642967668131478092_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=D28lE3oUmggAX8ZqyWd&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCZolgHaeyOJM3j74WgEYNiuJxQwBzcM869zjE0ShV-cQ&oe=660AB797'
            />
          </Tooltip>
          <Tooltip title='tân trần ác quỉ'>
            <Avatar
              alt='tân trần ác quỉ'
              src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/275558861_1009487280003014_5626488165690134641_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jJ5__6ALvUsAX_GGDaw&_nc_ht=scontent.fhan4-3.fna&oh=00_AfDodyC_EUufqPbaKJMiZlZkjopxv9EJUdMtcuZEpkfyYA&oe=660AF252'
            />
          </Tooltip>
          <Tooltip title='huy'>
            <Avatar
              alt='huy'
              src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/293065237_460578709243589_1179034753693247704_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ccOAAVLqA1UAX9OftEm&_nc_ht=scontent.fhan4-3.fna&oh=00_AfCAZC4gRUMPnpU8bt95SK0bhfURxcXwCd2TNZyljmeJwg&oe=660B54CE'
            />
          </Tooltip>
          <Tooltip title='chanpun'>
            <Avatar
              alt='chanpun'
              src='https://scontent.fhan3-3.fna.fbcdn.net/v/t1.6435-9/120225747_134002775091150_2543228272478636974_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MQcBhj_i58gAX_TiNUo&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAQVAIS_RRmIQENRH6823DreI_UBgEVHU9bwsiKJM-zUg&oe=662DCB65'
            />
          </Tooltip>
          <Tooltip title='Trần Tiến'>
            <Avatar
              alt='Trần Tiến'
              src='https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/404986929_365977682484734_8362423529042821163_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3DUtFpdsV4AAX8j0gro&_nc_ht=scontent.fhan4-1.fna&oh=00_AfB8OT8TkTb5zUyQmItjvh3eEocfu-Xd0o4I30QgzofDpw&oe=660AC4F3'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
