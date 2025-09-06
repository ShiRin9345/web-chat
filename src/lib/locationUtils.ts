import provincesData from '@/json/provinces.json'
import citiesData from '@/json/cities.json'
import areasData from '@/json/areas.json'

// 创建查找映射以提高性能
const provinceMap = new Map<string, string>()
const cityMap = new Map<string, { name: string; provinceCode: string }>()
const areaMap = new Map<
  string,
  { name: string; cityCode: string; provinceCode: string }
>()

// 初始化映射
provincesData.forEach((province) => {
  provinceMap.set(province.code, province.name)
})

citiesData.forEach((city) => {
  cityMap.set(city.code, { name: city.name, provinceCode: city.provinceCode })
})

areasData.forEach((area) => {
  areaMap.set(area.code, {
    name: area.name,
    cityCode: area.cityCode,
    provinceCode: area.provinceCode,
  })
})

/**
 * 根据地区代码获取完整的中文地址
 * @param position 地区代码字符串，格式为 "省份代码 城市代码 区县代码" 或单个代码
 * @returns 完整的中文地址字符串
 */
export function getLocationName(position: string): string {
  if (!position) return ''

  // 处理用空格分隔的三个代码格式
  const codes = position.trim().split(' ')

  if (codes.length === 3) {
    // 格式: "省份代码 城市代码 区县代码"
    const [provinceCode, cityCode, areaCode] = codes

    const provinceName = provinceMap.get(provinceCode)
    const city = cityMap.get(cityCode)
    const area = areaMap.get(areaCode)

    if (provinceName && city && area) {
      return `${provinceName} ${city.name} ${area.name}`
    } else if (provinceName && city) {
      return `${provinceName} ${city.name}`
    } else if (provinceName) {
      return provinceName
    }
  }

  // 处理单个代码格式
  const code = codes[0]
  const codeLength = code.length

  switch (codeLength) {
    case 2: {
      // 省份代码
      return provinceMap.get(code) || code
    }

    case 4: {
      // 城市代码
      const city = cityMap.get(code)
      if (!city) return code

      const provinceName = provinceMap.get(city.provinceCode)
      return provinceName ? `${provinceName} ${city.name}` : city.name
    }

    case 6: {
      // 区县代码
      const area = areaMap.get(code)
      if (!area) return code

      const city = cityMap.get(area.cityCode)
      const provinceName = provinceMap.get(area.provinceCode)

      if (provinceName && city) {
        return `${provinceName} ${city.name} ${area.name}`
      } else if (provinceName) {
        return `${provinceName} ${area.name}`
      } else {
        return area.name
      }
    }

    default:
      return position
  }
}
