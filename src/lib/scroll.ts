export const scrollBottom = () => {
  const topDiv = document.getElementById('topDiv') as HTMLDivElement
  const distanceOffBottom =
    topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
  if (distanceOffBottom <= 200) {
    setTimeout(() => {
      document.getElementById('bottom')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 200)
  }
}
