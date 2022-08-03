import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import type { NextPage } from 'next'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sessionState } from '@/stores/Session'
import { toast } from 'react-toastify'
import checkCasplaId from '@/apis/auth/checkCasplaId'
import fanRegistration from '@/apis/auth/fanRegistration'
import Meta from '@/components/Meta'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Forms/Checkbox'
import FormLabel from '@/components/atoms/Forms/Label'
import PageTitle from '@/components/atoms/PageTitle'
import Input from '@/components/molecules/Forms/Input'
import RadioButton from '@/components/atoms/Forms/RadioButton'
import PasswordInput from '@/components/molecules/Forms/PasswordInput'
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader'
import styles from '@/styles/AccountRegistration.module.scss'

type InputProps = {
  thumbnailImage?: object
  fullName: string
  furigana?: string
  email: string
  casplaId: string
  password: string
  rePassword: string
  role: string
  needForLetter: boolean
}

const AccountRegistration: NextPage = () => {

  const [roleState, setRole] = useState('fan')
  const [checledCasplaIdState, setCheckCasplaId] = useState(false)
  const [needForLetterState, setNeedForLetter] = useState(true)
  const [submitButtonColorState, setSubmitButtonColor] = useState('primary')
  const [session, setSession] = useRecoilState(sessionState)
  const { register, watch, handleSubmit, formState: { errors }, getValues, setValue } = useForm<InputProps>()

  useEffect(() => {
    if (session.accessToken === '') {
      Router.replace('/signin')
      toast.error('セッションが切れました。ログインし直してください。', { autoClose: 3000, draggable: true})
    } else if (session.accessToken !== '') {
      // TODO：API取得
    }
  }, [])

  const roles = [
    { id: 'fan', label: 'ファン', note: 'Casplaに参加する最低限の機能だけを持ったアカウントです。ブックマーク機能の利用や公開オーディションへの投票が可能です。' },
    { id: 'production', label: 'プロダクション', note: '芸能プロフダクション向けの機能を持ったアカウントです。企業情報ページを設置できるほかタレントアカウントの一括管理が可能です。' },
    { id: 'company', label: '企業・団体（制作会社向け）', note: '制作会社や団体向けのアカウントです。オーディション機能を利用できます（Coming Soon）' },
    { id: 'talent', label: 'タレント(フリー)', note: '無所属、もしくは個人で活動されているタレント様向けのアカウントです。プロフィール機能や各種SNSとの連携が可能です。' },
  ]

  const filteredRole:any = getValues('role') === undefined ? roles[0] : roles.find(data => data.id === getValues('role'))

  const onChangeRole = (e:any) => {
    const changeValue = e.target.value
    setRole(changeValue)
  }

  const onCheckId = async () => {
    checkCasplaId(getValues('casplaId')).then(res => {
      // TODO：APIから該当するユーザーが以内場合は200返してもらう
      setCheckCasplaId(true)
    }).catch(() => {
      setCheckCasplaId(false)
      toast.error('すでに使用されているIDです。', { autoClose: 3000, draggable: true})
    })
  }

  const toggleNeedForLetter = (e:any) => setValue('needForLetter', e.target.checked)

  const changeThumbnail = (val: object) => {
    setValue('thumbnailImage', val)
  }

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    fanRegistration(data, '', roleState).then(() => {
      setSession({
        thumbnailImage: data.thumbnailImage,
        fullName: data.fullName,
        furigana: data.furigana,
        email: data.email,
        casplaId: data.casplaId,
        password: data.password,
        role: roleState
      })
      toast.success('変更を保存しました。', { autoClose: 3000, draggable: true})
    }).catch(() => {
      toast.error('登録に失敗しました。', { autoClose: 3000, draggable: true})
    })
  }

  return (
    <main className={styles['p-account-registration']}>
      <Meta title="アカウント管理" />

      <section className={styles['p-account-registration__content']}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['p-account-registration__form']}>
          <section className={styles['p-account-registration__section']}>
            <PageTitle title="アカウント管理" />
            <div className={styles['p-account-registration__item']}>
              <ThumbnailUploader id="thumbnail" onChange={changeThumbnail} />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="名前" label="fullName" required={true} />
              <Input id="fullName" register={register} required={true} error={errors?.fullName?.message} type={'text'} note="※プロダクション・企業・団体でこのアカウントをご登録の場合は、ご担当者様のお名前を入力してください。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="フリガナ" label="furigana" required={false} />
              <Input id="furigana" register={register} required={false} error={errors?.furigana?.message} />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="メールアドレス" label="email" required={true} />
              <Input id="email" register={register} required={true} type="email" disabled={false} />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="パスワード" label="password" required={true} />
              <PasswordInput id="password" register={register} error={errors?.password?.message} note="※半角英数字で入力してください。" />
            </div>
            <div className={styles['p-account-registration__item']}>
              <FormLabel text="Caspla ID" label="casplaId" required={true} />
              <div className={styles['p-account-registration__check-ids']}>
                <div className={styles['p-account-registration__check-input']}>
                  <Input id="casplaId" register={register} required={true} error={errors?.casplaId?.message} min={4} max={16} note="※半角英数字で入力してください。(4文字以上16文字以下)" />
                </div>
                <div className={styles['p-account-registration__check-id']}>
                  <Button text="IDをチェック" color="primary" size="small" weight="bold" onClick={onCheckId} disabled={watch('casplaId') === ''} />
                </div>
              </div>
            </div>
            <div className={styles['p-account-registration__item']}>
              <Checkbox id={'newsLetter'} checked={needForLetterState} label="Caspla のニュースレターを受け取る" onChange={toggleNeedForLetter} />
            </div>
            <div className={[styles['p-account-registration__button'], styles['p-account-registration__button--submit']].join(' ')}>
              <Button text="変更を保存" color={submitButtonColorState} size="large" type="submit" weight="bold" disabled={!checledCasplaIdState} />
            </div>
          </section>
          <section className={styles['p-account-registration__section']}>
            <FormLabel text="アカウントタイプ" />
            {/* <p className={styles['p-account-registration__description']}></p> */}
            <div className={styles['p-account-registration__item']}>
              <div className={styles['p-account-registration__radio']}>
                <RadioButton id={filteredRole.id} name="role" label={filteredRole.label} note={filteredRole.note} onChange={onChangeRole} checked={true} />
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  )
}

export default AccountRegistration
