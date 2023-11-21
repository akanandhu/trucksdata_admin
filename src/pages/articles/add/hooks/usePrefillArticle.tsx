import React, { SetStateAction, useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'
import { Article, ArticleFields } from 'src/types/Articles'

const usePrefillArticle = ({
    reset,
    setValue,
    data,
    isFetched
}:{
    setValue: React.Dispatch<SetStateAction<any>>
    reset: UseFormReset<ArticleFields>
    data: Article
    isFetched: boolean
}) => {
  useEffect(() => {

    if(isFetched) {
        const {heading, thumbnail,html_content} = data
        setValue(html_content)
        reset({
            heading,
            thumbnail,
        })
    }

  }, [data, isFetched, reset, setValue])

}

export default usePrefillArticle
