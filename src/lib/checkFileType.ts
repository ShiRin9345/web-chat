export const isImage = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileName)
}

export const isPDF = (fileName: string) => {
  return /\.(pdf)$/i.test(fileName)
}
