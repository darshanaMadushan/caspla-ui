import { axiosClient } from '@/utils/axiosClient'
import { useRecoilValue } from 'recoil'
import { sessionState } from '@/stores/Session'

const getProductionDetail = async (productionId: string | string[] | undefined) => {
  // const session = useRecoilValue(sessionState)
  try {

    const response = await axiosClient.get(`/api/v1/production/${productionId}`)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default getProductionDetail
