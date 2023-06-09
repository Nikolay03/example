export default function hexToRgba (hex: string, opacity: number | string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const R = parseInt(result[1], 16)
  const G = parseInt(result[2], 16)
  const B = parseInt(result[3], 16)

  if (opacity) {
    const RGBA = `rgba(${R}, ${G}, ${B}, ${opacity})`
    return result ? RGBA : null
  }

  return hex
}
