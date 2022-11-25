import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import type { NextPage } from 'next'
import Meta from '@/components/Meta'
import Loading from '@/components/atoms/Loading'
import Nodata from '@/components/atoms/Nodata'
import PageTitle from '@/components/atoms/PageTitle'
import BookmarkedItem from '@/components/organisms/BookmarkedItem'
import dynamic from 'next/dynamic'
import styles from '@/styles/Bookmarks.module.scss'
import getBookmarks from './../../apis/bookmarks/getBookmarks';
import { useRecoilValue} from 'recoil';
import { userAtom, accessTokenAtom } from './../../stores/Session/index';
const Modal = dynamic(() => import('@/components/molecules/Modal'), { ssr: false })
import changeBookmark from './../../apis/bookmarks/changeBookmark';
import { toast } from 'react-toastify'

const Bookmarks: NextPage = () => {
  const [loadingState, setLoading] = useState<boolean>(true)
  const [bookmarksState, setBookmarks] = useState<any>([])
  const session = useRecoilValue(userAtom)
  const accessToken = useRecoilValue(accessTokenAtom)

  useEffect(() => {
    getBookmarks(session.casplaId, accessToken)
      .then(({response_message})=> {
        setBookmarks(response_message)
        setLoading(false)
      })
      .catch((err)=> console.log(err))
  }, [])

  const onDeleteBookmark = (id: string) => {
    changeBookmark(id, session.casplaId, accessToken)
      .then(({response_code}) => {
        if(response_code == 200) {
          setBookmarks(bookmarksState.filter((bookmark : any) => bookmark.casplaId !== id));
          toast.success('ブックマークが正常に削除されました。', { autoClose: 3000, draggable: true})
        } else {
          toast.success('何かがうまくいかなかった', { autoClose: 3000, draggable: true})
        }
      })
      .catch((err)=> console.log(err))
  }
  
  return (
    <main className={styles['p-book-marks']}>
      <Meta title="ブックマークしているタレント" />

      <div className={styles['p-book-marks__content']}>
        <PageTitle title="ブックマークー覧 " isLeft={true} />
        {
          loadingState && <div className={styles['p-book-marks__loading']}><Loading /></div>
        }
        {
          !loadingState && bookmarksState && bookmarksState.length > 0 && (
            <ul className={styles['p-book-marks__list']}>
              {
                bookmarksState.map((bookmark: {[key: string]: string}) => {
                  return <BookmarkedItem casplaId={bookmark.casplaId} thumbnailImage={bookmark.thumbnailImage} fullName={bookmark.fullName} onClick={onDeleteBookmark} />
                })
              }
            </ul>
          )
        }
        {!loadingState && bookmarksState.length === 0 && <Nodata text={'ブックマークしているタレントはいません。\n気になるタレントをブックマークしましょう。'} />}
      </div>
    </main>
  )
}

export default Bookmarks
