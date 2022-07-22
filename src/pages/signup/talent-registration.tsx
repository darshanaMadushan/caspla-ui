import React, { useEffect } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { registrationState } from '@/stores/Registration'
import Meta from '@/components/Meta'
import TalentRegistrationTemplate from '@/components/templates/TalentRegistrationTemplate'
import Button from '@/components/atoms/Button'
import FormTitle from '@/components/atoms/Forms/Title'
import styles from '@/styles/AccountRegistration.module.scss'

const TalentRegistration: NextPage = () => {

  const registration = useRecoilValue(registrationState)
  
  const onSubmit = (data:any) => {
    console.log(data)
    // Router.push('/signup/complete')
  }

  useEffect(() => {
    if (registration.fullName === '') {
      Router.replace('/signup/')
      toast.error('登録有効期限が切れました。メールアドレスの登録からやり直してください。', { autoClose: 3000, draggable: true})
    }
  }, [])


  return (
    <div className={styles['p-account-registration']}>
      <Meta title="タレントプロフィール入力" />

      <section className={styles['p-account-registration__content']}>
        <FormTitle title="タレントプロフィール入力" />
        <TalentRegistrationTemplate submitForm={onSubmit} />
        <div className={styles['p-account-registration__button']}><Button text="前の画面に戻る" color="default" size="large" onClick={() => Router.back()}/></div>
      </section>
    </div>
  )
}

export default TalentRegistration
