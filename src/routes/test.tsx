import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import provinces from '@/json/provinces.json'
import cities from '@/json/cities.json'
import areas from '@/json/areas.json'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const [provinceCode, setProvinceCode] = useState<string>('')
  const [cityCode, setCityCode] = useState<string>('')
  const [areaCode, setAreaCode] = useState<string>('')
  console.log(provinceCode)
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Select onValueChange={setProvinceCode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="省" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((p) => (
            <SelectItem key={p.name} value={p.code}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select disabled={!provinceCode} onValueChange={setCityCode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="市" />
        </SelectTrigger>
        <SelectContent>
          {cities
            .filter((city) => city.provinceCode === provinceCode)
            .map((p) => (
              <SelectItem key={p.name} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select disabled={!cityCode} onValueChange={setAreaCode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="县" />
        </SelectTrigger>
        <SelectContent>
          {areas
            .filter((area) => area.cityCode === cityCode)
            .map((p) => (
              <SelectItem key={p.name} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
interface Props {
  handelChange: (region: string) => void
  initialRegion: string
}

export const RegionSelector: React.FC<Props> = ({
  initialRegion,
  handelChange,
}) => {
  const [provinceCode, setProvinceCode] = useState<string>(
    initialRegion.split(' ')[0],
  )
  const [cityCode, setCityCode] = useState<string>(initialRegion.split(' ')[1])
  const [areaCode, setAreaCode] = useState<string>(initialRegion.split(' ')[2])
  useEffect(() => {
    handelChange(provinceCode + ' ' + cityCode + ' ' + areaCode)
  }, [areaCode])
  return (
    <div className="flex flex-row gap-2">
      <Select value={provinceCode} onValueChange={setProvinceCode}>
        <SelectTrigger>
          <SelectValue placeholder="省" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((p) => (
            <SelectItem key={p.name} value={p.code}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={cityCode}
        disabled={!provinceCode}
        onValueChange={setCityCode}
      >
        <SelectTrigger>
          <SelectValue placeholder="市" />
        </SelectTrigger>
        <SelectContent>
          {cities
            .filter((city) => city.provinceCode === provinceCode)
            .map((p) => (
              <SelectItem key={p.name} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select value={areaCode} disabled={!cityCode} onValueChange={setAreaCode}>
        <SelectTrigger>
          <SelectValue placeholder="县" />
        </SelectTrigger>
        <SelectContent>
          {areas
            .filter((area) => area.cityCode === cityCode)
            .map((p) => (
              <SelectItem key={p.name} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
