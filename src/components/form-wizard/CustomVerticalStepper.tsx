// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import MuiStep, { StepProps } from '@mui/material/Step'

import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import StepperCustomDot from './StepperCustomDot'
import VehicleBasicForm from 'src/pages/vehicle/add/components/VehicleBasicForm'
import { useForm } from 'react-hook-form'
import VehicleDimensionsForm from 'src/pages/vehicle/add/components/VehicleDimensionsForm'
import TransmissionForm from 'src/pages/vehicle/add/components/TransmissionForm'
import SpecificationForm from 'src/pages/vehicle/add/components/SpecificationForm'
import ChasisForm from 'src/pages/vehicle/add/components/ChasisForm'
import SteeringBreakingForm from 'src/pages/vehicle/add/components/SteeringBreakingForm'
import TyreForm from 'src/pages/vehicle/add/components/TyreForm'
import CabinForm from 'src/pages/vehicle/add/components/CabinType'
import OtherDetailsForm from 'src/pages/vehicle/add/components/OtherDetailsForm'
import { useGetVehicleClass } from 'src/api/services/vehicle-class/get'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import useGetVehicleSchema from 'src/pages/vehicle/add/hooks/useGetVehicleSchema'
import getSpecValues from 'src/pages/vehicle/add/functions/getSpecValue'
import { useAddVehicle } from 'src/api/services/vehicle/post'

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  }
}))

const defaultValues: VehicleSubmitTypes = {
  vehicle_type_id: 0,
  energy_source_id: 0,
  description: '',
  brochure: [],
  images: [],
  manufacturer_id: '',
  min_price: 0,
  max_price: 0,
  price_unit: 'Rs',
  title: '',
  video_links: [],
  series_id: ''
}

const StepperCustomVertical = ({ steps }: { steps: any[] }) => {
  // ** States

  const [activeStep, setActiveStep] = useState<number>(0)

  const schema = useGetVehicleSchema()

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VehicleSubmitTypes>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    reset({
      vehicle_type_id: 0,
      energy_source_id: 0
    })
  }

  const [vehicleType, energySourceId] = watch(['vehicle_type_id', 'energy_source_id'])
  const { data: vehicleClass } = useGetVehicleClass(vehicleType ?? 1)
  const vehicle_class = vehicleClass?.data
  const energyData = vehicle_class?.energy_sources
  const specsCollection = energyData?.filter((obj: { id: number }) => obj?.id === energySourceId)
  const specs = specsCollection?.[0]?.specifications

  const create = useAddVehicle()

  const mutationFn = create

  function onSubmit(values: VehicleSubmitTypes) {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      const {
        title,
        manufacturer_id,
        energy_source_id,
        vehicle_type_id,
        series_id,
        min_price,
        max_price,
        images,
        description,
        video_links,
        brochure,
        ...rest
      } = values

      const specificationData = getSpecValues(rest, specs)

      const vehicle: any = {
        title,
        manufacturer_id,
        energy_source_id,
        vehicle_type_id,
        series_id,
        min_price,
        max_price,
        images,
        description,
        video_links,
        brochure,
        price_unit: 'Lakh',
        status,
        vehicle_specs: specificationData
      }

      mutationFn.mutate(vehicle, {
        onSuccess: () => handleSuccess()
      })
    }
  }

  function handleSuccess() {
    toast.success('Vehicle Created Successfully')
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <VehicleBasicForm errors={errors} step={activeStep} control={control} specs={specs} setValue={setValue} />
        )
      case 1:
        return <VehicleDimensionsForm step={activeStep} control={control} specs={specs} />
      case 2:
        return <SpecificationForm step={activeStep} control={control} specs={specs} />
      case 3:
        return <TransmissionForm step={activeStep} control={control} specs={specs} />
      case 4:
        return <ChasisForm step={activeStep} control={control} specs={specs} />
      case 5:
        return <SteeringBreakingForm step={activeStep} control={control} specs={specs} />
      case 6:
        return <TyreForm step={activeStep} control={control} specs={specs} />
      case 7:
        return <CabinForm step={activeStep} control={control} specs={specs} />
      case 8:
        return <OtherDetailsForm step={activeStep} control={control} specs={specs} />
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep]?.title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep]?.subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button type='submit' size='large' variant='contained'>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: '100%' }}>
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
            connector={<></>}
            sx={{ height: '100%', minWidth: '15rem' }}
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step?.icon} />
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'>{step?.title}</Typography>
                        <Typography className='step-subtitle'>{step?.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent sx={{ width: '100%' }}>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperCustomVertical
