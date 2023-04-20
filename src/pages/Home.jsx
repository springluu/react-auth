import { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { recordActions } from 'stores'
import { LineChart } from 'components'
import { Circle } from 'components'
import { ReactComponent as Knife } from '../assets/svgs/icon_knife.svg'
import { ReactComponent as Cup } from '../assets/svgs/icon_cup.svg'

export { Home }

function Home() {
    const records = useSelector(x => x.records.list)
    const showLoadMore = useSelector(x => x.records.more)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(recordActions.getAll(page))
    }, [page])

    const loadMore = () => {
        setPage(page + 1)
    }

    return (
        <div className='home'>
            <div className='section section-1 d-flex'>
                <div className='section-left'>
                    <img src="./images/home1.png" alt="home1" />
                    <div className='content'>
                        <Circle percent={75} content="05/21"/>
                    </div>
                </div>
                <div className='section-right'>
                    <LineChart/>
                </div>
            </div>
            <div className='container section section-2 d-flex'>
                <div className='hexagon item'>
                    <div>
                        <Knife/>
                        <div>Morning</div>
                    </div>
                </div>
                <div className='hexagon item'>
                    <div>
                        <Knife/>
                        <div>Lunch</div>
                    </div>
                </div>
                <div className='hexagon item'>
                    <div>
                        <Knife/>
                        <div>Dinner</div>
                    </div>
                </div>
                <div className='hexagon item'>
                    <div>
                        <Cup/>
                        <div>Snack</div>
                    </div>
                </div>
            </div>
            <div className='container section section-3'>
                <div className='records'>
                    {records?.value?.map((record, index) => (
                        <div className='record' key={index}>
                            <img src={record.image} alt={record.title} />
                            <span className='content'>
                                {record.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={records.loading ? 'loading load-more' : 'load-more'}>
                    {showLoadMore.value ? <button onClick={loadMore} className='btn btn-load-more'>{records.loading ? '...' : '記録をもっと見る'}</button> : ''}
                </div>
            </div>
        </div>
    )
}
