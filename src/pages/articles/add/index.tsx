import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import { useGetArticle } from 'src/api/services/articles/get'
import { useUpdateArticle } from 'src/api/services/articles/patch'
import { useCreateArticle } from 'src/api/services/articles/post'
import EditorText from 'src/components/EditorText'
import FileInput from 'src/components/input-fields/FileInput'
import TextFormField from 'src/components/input-fields/TextFormField'
import useCustomToast from 'src/lib/toast'
import { Article, ArticleFields } from 'src/types/Articles'
import * as yup from 'yup'
import usePrefillArticle from './hooks/usePrefillArticle'
import { errorMessageParser } from 'src/utils/error-message-parser'
import ErrorBox from 'src/components/ErrorBox'

const defaultValues = {
  heading: '',
  thumbnail: []
}

const schema = yup.object().shape({
  heading: yup.string().required('Article Name is required')
})

const ArticlesAdd = () => {
  const [value, setValue] = useState('')

  const { control, handleSubmit, reset, formState:{errors} } = useForm<ArticleFields>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const articleId = router?.query?.id
  const toast = useCustomToast()

  const create = useCreateArticle()
  const update = useUpdateArticle()

  const { data, isFetched } = useGetArticle(articleId as string)
  const articleData: Article = data?.data

  const isEdit = Boolean(articleData)

  const mutateFn:any = isEdit ? update : create

  const formData = new FormData()

  const onSubmit = (values: ArticleFields) => {
    values?.thumbnail?.map((pic, index) => {
      formData.append(`thumbnail[${index}][thumbnail]`, pic.thumbnail)
      formData.append(`thumbnail[${index}][original]`, pic.original)
    })
    formData.append('heading', values?.heading)
    formData.append('html_content', value)
    isEdit && formData.append('_method', 'put')

    const mutationData:any = isEdit ? { id: articleId, data: formData } : formData
    mutateFn.mutate(mutationData, {
      onSuccess: () => handleSuccess(),
      onError: (err: any) => toast.error(errorMessageParser(err))
    })
  }

  function handleSuccess() {
    toast.success(`Article ${isEdit ? 'Updated' : 'Created'} Successfully`)
    router.push('/articles')
  }

  usePrefillArticle({
    data: articleData,
    reset,
    setValue,
    isFetched
  })

  return (
    <Card sx={{ p: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid display={'flex'} gap={3} flexDirection={'column'}>
          <Grid item xs={12}>
            <TextFormField  id='heading' required control={control} label='Article Name' size='medium' />
            {errors?.heading && <ErrorBox error={errors?.heading} />}
          </Grid>
          <Grid item xs={12}>
            <FileInput control={control} id='thumbnail' label='Thumbnail'  />
          </Grid>

          <Grid sx={{ p: 6, minHeight: '50vh', backgroundColor: 'white', color: 'black' }}>
            <EditorText text={value} setText={setValue} />
          </Grid>
        </Grid>
        <Grid m={6} mt={6} display={'flex'} justifyContent={'end'} gap={3}>
          <Button type='submit' variant='contained'>
            Save Article
          </Button>
          <Button variant='outlined' onClick={() => router.back()}>
            Cancel
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default ArticlesAdd
