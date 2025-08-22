export function generateCode(min: number, max: number): string {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum.toString().padStart(7, '0')
}
