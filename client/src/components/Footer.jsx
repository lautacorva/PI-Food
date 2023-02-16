import s from './styles/footer.module.css'

export default function Footer(props) {
    return(
        <div className={s.container}>
            <h4 style={{color: 'white'}}>Proyecto Indivdual <span style={{color: 'gold'}}>#SoyHenry</span><hr />Made <span>by</span> Lautaro Corva <br />2023</h4>
        </div>
    )
}