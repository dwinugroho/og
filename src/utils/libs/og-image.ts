import site from '../config/site'

const ogImage = (
  props: {
    title?: string
    description?: string
    image?: string
    information?: string
  } = {}
): string => {
  const { title = site.title, description, image, information } = props

  const url = new URL(site.ogImageHost)
  if (title) url.searchParams.append('title', title)
  if (description) url.searchParams.append('description', description)
  if (image) url.searchParams.append('image', image)
  if (information) url.searchParams.append('information', information)

  return url.toString()
}

export default ogImage
