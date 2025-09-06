export const isImage = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileName)
}

export const isPDF = (fileName: string) => {
  if (!fileName) return false

  try {
    // 处理URL编码的文件名
    const decodedFileName = decodeURIComponent(fileName)

    // 检查是否以.pdf结尾（不区分大小写）
    return /\.pdf$/i.test(decodedFileName)
  } catch (error) {
    // 如果解码失败，使用原始文件名
    return /\.pdf$/i.test(fileName)
  }
}
