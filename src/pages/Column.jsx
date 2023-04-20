import { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { recordActions } from 'stores'
import { LineChart } from 'components'

export { Column }

function Column() {
    const [chartType, setChartType] = useState(4);
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
        <div className='record container'>
            <div className='section section-1'>
                <div className='banner'>
                    <div>
                        <h3>BODY RECORD</h3>
                        <a href="/">自分のカラダの記録</a>
                    </div>
                </div>
                <div className='banner'>
                    <div>
                        <h3>MY EXERCISE</h3>
                        <a href="/">自分の運動の記録</a>
                    </div>
                </div>
                <div className='banner'>
                    <div>
                        <h3>MY DIARY</h3>
                        <a href="/">自分の日記</a>
                    </div>
                </div>
            </div>
            <div className='section section-2'>
                <div className='section-title'>
                    <span>BODY<br/>RECORD</span>
                    <span>2021.05.21</span>
                </div>
                <LineChart detail={true} />
                <div className='chart-types'>
                    <button onClick={() =>setChartType(1)} className={chartType === 1 ? 'active' :''} >日</button>
                    <button onClick={() =>setChartType(2)} className={chartType === 2 ? 'active' :''} >週</button>
                    <button onClick={() =>setChartType(3)} className={chartType === 3 ? 'active' :''} >月</button>
                    <button onClick={() =>setChartType(4)} className={chartType === 4 ? 'active' :''} >年</button>
                </div>
            </div>
            <div className='section section-3'>
                <div className='section-title'>
                    <span>MY<br/>EXERCISE</span>
                    <span>2021.05.21</span>
                </div>
                <ul className='exercies'>
                    {Array(16).fill(null).map((item, index) => (
                        <li className='exercie' key={index}>
                            <div>
                                <div className='text'>
                                    <div>家事全般（立位・軽い）</div>
                                    <div className='kcal'>26kcal</div>
                                </div>
                                <div className='time'>
                                    10 min
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='section section-4'>
                <h3>MY DIARY</h3>
                <div className='diaries'>
                    {records?.value?.map((record, index) => (
                        <div className='diarie' key={index}>
                            <div>
                                <div className='content'>
                                    <div dangerouslySetInnerHTML={{ __html:`
                                    <h5>2021.05.21<br/>23:25</h5>
                                    私の日記の記録が一部表示されます。<br/>
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`}}></div>
                                </div>
                            </div>
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
