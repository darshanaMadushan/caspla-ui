import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { userAtom, thumbnailAtom, accessTokenAtom } from '@/stores/Session'
import updateCover from '@/apis/images/updateCover'
import updateThumbnail from '@/apis/images/updateThumbnail'
import getProfile from '@/apis/settings/profile/getProfile'
import updateProfile from '@/apis/settings/profile/updateProfile'
import Loading from '@/components/atoms/Loading'
import PageTitle from '@/components/atoms/PageTitle'
import TalentFormTemplate from '@/components/templates/TalentFormTemplate'
import styles from '@/styles/AccountRegistration.module.scss'

const Dashboard: NextPage = () => {

  const [changeThumbnailState, setChangeThumbnail] = useState(false)
  const [changeCoverState, setChangeCover] = useState(false)
  const [session, setSession] = useRecoilState(userAtom)
  const [thumbnail, setThumbnail] = useRecoilState(thumbnailAtom)
  const [loadingState, setLoading] = useState<boolean>(true)
  const [profileState, setProfileState] = useState<any>({})
  const accessToken = useRecoilValue(accessTokenAtom)

  useEffect(() => {
    getProfile(session.casplaId, session.casplaId).then(res => {
      setProfileState(res.data.response_message.castDetails)
      setLoading(false)
    })
  }, [])

  const onChangeThumbnail = () => setChangeThumbnail(true)
  const onChangeCover = () => setChangeCover(true)

  const updateForm = (data: any) => {

    if (changeThumbnailState) {
      updateThumbnail(session.userId, data.thumbnailImage)
        .then(({data : {response_message}})=> {
          setThumbnail(response_message)
        })
        .catch((error)=> console.log(error))
    }

    if (changeCoverState) {
      updateCover(session.userId, data.coverImage).then(() => {
        toast.success('変更を保存しました。', { autoClose: 3000, draggable: true})
      }).catch((error) => {
        console.log(error)
      })
    }
    
    updateProfile(session.casplaId, data, accessToken).then(({response_message}:any) => {
      setSession({
        userId : session.userId,
        casplaId: response_message.casplaId,
        role: session.role,
        fullName: response_message.fullName,
        companyId: session.productionId,
        companyName: session.productionName,
        isAdmin: session.productionAdmin
      })
      toast.success('変更を保存しました。', { autoClose: 3000, draggable: true})
    }).catch(() => {
      toast.error('登録に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール編集" />
      <div className={styles['p-account-registration__content']}>
        {
          loadingState ? (
            <Loading />
          ) : (
            <>
              <PageTitle title="タレントプロフィール編集" isLeft={true} />
              <TalentFormTemplate
                fullName={profileState.fullName}
                furigana={profileState.furigana}
                casplaId={profileState.casplaId}
                thumbnailImage={profileState.thumbnailImage}
                coverImage={profileState.coverImage}
                profile={profileState.profile}
                gender={profileState.gender}
                birthYear={profileState.birthYear}
                birthMonth={profileState.birthMonth}
                birthDay={profileState.birthDay}
                constellation={profileState.constellation}
                bloodType={profileState.bloodType}
                birthplace={profileState.birthplace}
                height={profileState.height}
                weight={profileState.weight}
                bust={profileState.bust}
                waist={profileState.waist}
                hip={profileState.hip}
                footSize={profileState.footSize}
                siteUrl={profileState.siteUrl}
                blogUrl={profileState.blogUrl}
                twitterId={profileState.twitterId}
                facebookId={profileState.facebookId}
                youtubeId={profileState.youtubeId}
                instagramId={profileState.instagramId}
                tiktokId={profileState.tiktokId}
                activity={profileState.activity}
                history={profileState.history}
                note={profileState.note}
                userId={session.userId}
                editType="edit"
                changeThumbnail={onChangeThumbnail}
                changeCover={onChangeCover}
                submitForm={updateForm}
              />
            </>
          )
        }
      </div>
    </main>
  )
}

export default Dashboard
