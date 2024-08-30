import { useState } from 'react'

interface SplitConfig {
  start: string
  end: string
  fileName: string
}

const useSplitConfigs = () => {
  const [splitConfigs, setSplitConfigs] = useState<SplitConfig[]>([
    { start: '', end: '', fileName: '' },
  ])

  const addSplitConfig = () => {
    setSplitConfigs([...splitConfigs, { start: '', end: '', fileName: '' }])
  }

  const removeSplitConfig = (index: number) => {
    setSplitConfigs(splitConfigs.filter((_, i) => i !== index))
  }

  const updateSplitConfig = (
    index: number,
    field: keyof SplitConfig,
    value: string
  ) => {
    const newConfigs = [...splitConfigs]
    newConfigs[index][field] = value
    setSplitConfigs(newConfigs)
  }

  return { addSplitConfig, removeSplitConfig, updateSplitConfig, splitConfigs }
}

export default useSplitConfigs
