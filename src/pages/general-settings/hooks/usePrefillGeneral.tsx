import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'
import { GeneralSetting, HomePageSettings } from 'src/types/HomePageSettings'

const usePrefillGeneral = ({
  data,
  reset,
  isFetched
}: {
  data: GeneralSetting
  reset: UseFormReset<HomePageSettings>
  isFetched: boolean
}) => {
  useEffect(() => {
    if (isFetched) {
      const {
        banners,
        contact_number,
        email,
        faq,
        heading,
        logo,
        subheading,
        facebook_url,
        instagram_url,
        twitter,
        youtube_url
      } = data || {}

      reset({
        banners,
        contact_number,
        email,
        faq,
        heading,
        logo,
        subheading,
        facebook_url,
        instagram_url,
        twitter,
        youtube_url
      })
    }
  }, [data, isFetched, reset])
}

export default usePrefillGeneral
