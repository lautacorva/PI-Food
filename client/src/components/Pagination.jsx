import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChangePage } from '../redux/actions'
import s from './styles/pagination.module.css'

export default function PaginationButtons(props) {
    const [page, setPage] = useState(1)

    let offset = useSelector(state => state.offset)
    const dispatch = useDispatch()

    function changePage(e) {
        if (e.target.innerHTML === "first_page") {
            offset = 0
            setPage(1)
        }
        if (e.target.innerHTML === "navigate_before" && offset > 8) {
            offset = offset - 9
            setPage(page - 1)
        }
        if (e.target.innerHTML === "navigate_next") {
            offset = offset + 9
            setPage(page + 1)

        }
        if (e.target.innerHTML === "last_page") {
            offset = 81
            setPage(10)
        }
        console.log(e.target.innerHTML);
        dispatch(ChangePage(offset))
    }

    return (
        <div className={s.container}>
            <button type="button" onClick={changePage} className={s.button}><span className="material-symbols-outlined">first_page</span></button>
            <button type="button" onClick={changePage} className={s.button}><span className="material-symbols-outlined">navigate_before</span></button>
            <button className={s.number}><span style={{ fontWeight: '700' }}>{page}</span></button>
            <button type="button" onClick={changePage} className={s.button}><span className="material-symbols-outlined">navigate_next</span></button>
            <button type="button" onClick={changePage} className={s.button}><span className="material-symbols-outlined">last_page</span></button>
        </div>
    )
}