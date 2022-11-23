import { axiosClient } from '@/utils/axiosClient'

const updateProductionDetails = async (data: any, productionId : string ) => {
  try {

    const requestBody = {
        "productionId": data.corpId,
        "productionName": data.companyName,
        "description": data.profile,
        "zipCode": data.zipcode,
        "prefecture": data.prefecture,
        "address1": data.address1,
        "address2": data.address2,
        "tel": data.tel,
        "links": {
            "twitterId": data.twitterId,
            "facebookId": data.facebookId,
            "instagramId": data.instagramId,
            "youtubeId": data.youtubeId,
            "tiktokId": data.tiktokId,
            "blogUrl": data.blogurl,
            "siteUrl": data.siteUrl
        }
    }
    const response = await axiosClient.put(`/api/v1/production/update?productionId=${productionId}`, requestBody)

    return response.data
  } catch(err:any) {
    return err.response
  }
}

export default updateProductionDetails