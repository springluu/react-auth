import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from 'store'
import { LineChart } from 'component'
import { ReactComponent as Knife } from '../../asset/svg/icon_knife.svg'

export { Home }

function Home() {
    const users = useSelector(x => x.users.list)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [])

    return (
        <div className='home'>
            <div className='section section-1 d-flex'>
                <div className='left'>
                    <img src="./image/home1.png" alt="home1" />
                </div>
                <div className='right'>
                    <LineChart/>
                </div>
            </div>
            <div className='container section section-2 d-flex'>
                <div className='hexagon item'>
                    <Knife/>
                    <span>Morning</span>
                </div>
            </div>
            <div className='container section section-3 d-flex'>
                <div className='left'>
                </div>
                <div className='right'>
                </div>
            </div>
        </div>
    )
}
