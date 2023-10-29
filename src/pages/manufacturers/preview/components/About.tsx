// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProfilePicture } from 'src/components/ProfilePicture'
import { useTheme } from '@mui/material'

const renderList = (arr: any[]) => {
  if (arr && arr.length) {
    return arr?.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Icon fontSize='1.25rem' icon={item.icon} />

          <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
            {`${item.property?.charAt(0)?.toUpperCase() + item.property?.slice(1)}:`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {item?.value?.charAt(0)?.toUpperCase() + item.value?.slice(1)}
          </Typography>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutBrand = ({data}:{data: any}) => {

  const Items = [
    {
      property: 'brand',
      value: data?.name ?? '',
      icon: 'tabler:steering-wheel'
    },
    {
      property: 'Vehicle Class',
      value: data?.vehicle_types?.map((type: { name: string }) => type?.name)?.join(', ') ?? '',
      icon: 'tabler:tir'
    }
  ]

  const theme = useTheme()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                About Brand
              </Typography>
            </Box>
            <Grid display={'flex'} gap={6}>
              <Box>
                <ProfilePicture theme={theme} src={data?.logo ?? ''} alt={'brand_logo'} />
              </Box>
              <Box marginTop={3}>{renderList(Items)}</Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutBrand
