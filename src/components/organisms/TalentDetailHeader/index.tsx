import React, { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faUser, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import LabelTexts from '@/components/atoms/LabelTexts'
import SnsLinksArea from '@/components/organisms/SnsLinksArea'
import activities from '@/utils/activities'
import styles from '@/styles/components/organisms/TalentDetailHeader.module.scss'

type TalentDetailHeaderProps = {
  coverImage?: string
  thumbnailImage?: string
  activity?: Array<string>
  name: string
  agencyId?: string
  agencyName?: string
  casplaId?: string
  isTalent?: boolean
  withBookmark?: boolean
  siteUrl?: string
  blogUrl?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

const TalentDetailHeader = ({
  coverImage = '',
  thumbnailImage = '',
  activity = [],
  name,
  agencyId = '',
  agencyName = '',
  casplaId = '',
  withBookmark = false,
  siteUrl = '',
  blogUrl = '',
  facebook = '',
  twitter = '',
  instagram = '',
  youtube = '',
  tiktok = '',
  ...props
}: TalentDetailHeaderProps) => {

  // TODO：ループ処理整理
  const filteredActivity = activities.filter(data => activity.find(val => data.value === val))
  const formattedActivity = filteredActivity.map(data => data.text)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    if(!ua || ua === '') {
      setIsMobile(false)
    } else if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  })

  const copyUrl = async () => {
    const copyUrl = location.href
    const pageTitle: string = `${name} | Caspla(キャスプラ)`
    const shareData = {
      title: pageTitle,
      text: '',
      url: location.href
    }
    if (isMobile) {
      try {
        await navigator.share(shareData)
      } catch(err) {

      }
    } else {
      navigator.clipboard.writeText(copyUrl)
      toast.success('クリップボードにコピーしました。', { autoClose: 3000, draggable: true})
    }
  }

  return (
    <div className={styles['o-talent-detail-header']}>
      <div className={styles['o-talent-detail-header__cover']}>
        {
          coverImage !== '' ? (
            <div className={styles['o-talent-detail-header__image']}>
              <Image
                src={coverImage}
                objectFit="contain"
                layout="fill"
              />
            </div>
          ) : (
            <div className={[styles['o-talent-detail-header__image'], styles['o-talent-detail-header__image--empty']].join(' ')}>
              <FontAwesomeIcon icon={faImages} className={styles['o-talent-detail-header__image-icon']} />
            </div>
          )
        }
      </div>
      <div className={styles['o-talent-detail-header__wrapper']}>
        <div className={styles['o-talent-detail-header__top']}>
          {
            thumbnailImage !== '' ? (
              <div className={styles['o-talent-detail-header__thumbnail']}>
                <Image
                  src={thumbnailImage}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            ) : (
              <div className={[styles['o-talent-detail-header__thumbnail'], styles['o-talent-detail-header__thumbnail--empty']].join(' ')}>
                <FontAwesomeIcon icon={faUser} className={styles['o-talent-detail-header__image-icon']} />
              </div>
            )
          }
          {
            activities.length > 0 && (
              <div className={styles['o-talent-detail-header__activity']}><LabelTexts texts={formattedActivity} color={'purple'} /></div>
            )
          }
          {/* TODO:bookmarkあとで追加 */}
        </div>
        <div className={styles['o-talent-detail-header__bottom']}>
          <h1 className={styles['o-talent-detail-header__name']}>{name}</h1>
          <h2 className={styles['o-talent-detail-header__caspla-id']}>{casplaId}</h2>
          { (agencyId !== '' && agencyName !== '') && <a href={'/production-detail/${agencyId}'} className={styles['o-talent-detail-header__production-link']}>{agencyName}</a> }
          {
            (siteUrl !== '' || blogUrl !== '' || facebook !== '' || twitter !== '' || instagram !== '' || youtube !== '' || tiktok !== '') && <SnsLinksArea siteUrl={siteUrl} blogUrl={blogUrl} facebook={facebook} twitter={twitter} instagram={instagram} youtube={youtube} tiktok={tiktok}
          />
          }
          <button onClick={copyUrl} className={styles['o-talent-detail-header__copy']}>
            <FontAwesomeIcon icon={faShareNodes} className={styles['o-talent-detail-header__copy-icon']} />
            <span>シェアする</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TalentDetailHeader
