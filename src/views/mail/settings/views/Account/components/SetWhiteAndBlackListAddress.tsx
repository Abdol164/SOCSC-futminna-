import { useEffect, useState } from 'react'
import { useGetUserWhiteAndBlackListAddressQuery } from '@/hooks/user'
import { SetWhiteListSuimailNsAddressCard } from './SetWhiteListSuimailNsAddressCard'
import { SetBlackListSuimailNsAddressCard } from './SetBlackListSuimailNsAddressCard'

export function SetWhiteAndBlackListAddress() {
  const [whiteList, setWhiteList] = useState<string[]>([])
  const [blackList, setBlackList] = useState<string[]>([])

  const { data: whiteAndBlackListData } =
    useGetUserWhiteAndBlackListAddressQuery()

  useEffect(() => {
    if (whiteAndBlackListData) {
      setWhiteList(whiteAndBlackListData.whitelist)
      setBlackList(whiteAndBlackListData.blacklist)
    }
  }, [whiteAndBlackListData])

  return (
    <div className="w-full">
      <h2 className="font-medium text-xl mb-6">
        Set White and Black List Address
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <SetWhiteListSuimailNsAddressCard whiteList={whiteList} />

        <SetBlackListSuimailNsAddressCard blackList={blackList} />
      </div>
    </div>
  )
}
