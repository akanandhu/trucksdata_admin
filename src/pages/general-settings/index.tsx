import { Button, Card, Grid, InputAdornment } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useGetGeneralSettings } from 'src/api/services/general-settings/get'
import { useUpdateGeneralSettings } from 'src/api/services/general-settings/patch'
import { useAddGeneralSettings } from 'src/api/services/general-settings/post'
import FaqField from 'src/components/input-fields/FaqField'
import FileInput from 'src/components/input-fields/FileInput'
import TextFormField from 'src/components/input-fields/TextFormField'
import useCustomToast from 'src/lib/toast'
import { GeneralSetting, HomePageSettings } from 'src/types/HomePageSettings'
import usePrefillGeneral from './hooks/usePrefillGeneral'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

const defaultValues = {
  banners: [],
  heading: '',
  subheading: '',
  logo: [],
  faq: [],
  contact_number: '',
  email: '',
  facebook_url: '',
  instagram_url: '',
  youtube_url: '',
  twitter: ''
}

const getStartAdornment = (brand: string) => {
  return {
    startAdornment: (
      <InputAdornment position='start'>
        <Icon fontSize={'1.5rem'} icon={`tabler:brand-${brand}`} />
      </InputAdornment>
    )
  }
}

const GeneralSettings = () => {
  const { control, handleSubmit, reset } = useForm<HomePageSettings>({
    defaultValues
  })

  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, isFetched, isLoading } = useGetGeneralSettings()
  const generalSettings = data?.data?.data
  const isEdit = generalSettings?.length !== 0

  const generalData: GeneralSetting = generalSettings?.[0]
  usePrefillGeneral({
    data: generalData,
    reset,
    isFetched
  })

  const create = useAddGeneralSettings()
  const update = useUpdateGeneralSettings()

  const toast = useCustomToast()

  const mutateFn: any = isEdit ? update : create

  const onSubmit = (values: HomePageSettings) => {
    const mutateValues: any = isEdit ? { id: 1, data: values } : { ...values }
    mutateFn.mutate(mutateValues, {
      onSuccess: () => handleSuccess()
    })
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ['home-page'] })
    toast.success(`General Settings Updated Successfully`)
  }

  if (isLoading) {
    return <FallbackSpinner />
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container p={6} display={'flex'} gap={4}>
          <Grid item xs={12}>
            <FileInput control={control} id='banners' label='Banners' multiple />
          </Grid>
          <Grid item xs={12}>
            <TextFormField control={control} id='heading' label='Heading' size='medium' />
          </Grid>
          <Grid item xs={12}>
            <TextFormField control={control as any} id='subheading' label='Sub Heading' size='medium' />
          </Grid>
          <Grid item xs={12}>
            <FileInput control={control} id='logo' label='Logo' multiple />
          </Grid>

          <Grid item xs={12}>
            <TextFormField
              control={control as any}
              id='contact_number'
              type='number'
              size='medium'
              label='Contact Number'
            />
          </Grid>
          <Grid item xs={12}>
            <TextFormField control={control as any} id='email' type='email' size='medium' label='Email' />
          </Grid>
          <Grid item xs={12}>
            <TextFormField
              control={control as any}
              id='facebook_url'
              InputProps={getStartAdornment('meta')}
              size='medium'
              label='Meta URL'
            />
          </Grid>
          <Grid item xs={12}>
            <TextFormField
              control={control as any}
              id='instagram_url'
              InputProps={getStartAdornment('instagram')}
              size='medium'
              label='Instagram URL'
            />
          </Grid>
          <Grid item xs={12}>
            <TextFormField
              control={control as any}
              id='twitter'
              InputProps={getStartAdornment('twitter')}
              size='medium'
              label='Twitter URL'
            />
          </Grid>
          <Grid item xs={12}>
            <TextFormField
              control={control as any}
              id='youtube_url'
              InputProps={getStartAdornment('youtube')}
              size='medium'
              label='YouTube URL'
            />
          </Grid>
          <Grid item xs={12}>
            <FaqField control={control} />
          </Grid>
        </Grid>
        <Grid display={'flex'} justifyContent={'flex-end'} gap={4} p={6}>
          <Button type='submit' variant='contained'>
            Save Changes
          </Button>
          <Button onClick={() => router.back()} variant={'outlined'}>
            Cancel
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default GeneralSettings
