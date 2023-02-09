import s from './styles/landingp.module.css'
import video from '../media/landing.mp4'


export default function LandingP(props) {
    return (
        <div className={s.container}>
            <div className={s.jumbotron}>
                <h1 className={s.title}>Recipe's Book</h1>
                <button onClick={() => props.navegateTo('/home')} className={s.button}>Get in</button>
                <span className={s.foot}>Lautaro Corva - PI #SoyHenry </span>
            </div>

            <video className={s.video} muted autoPlay loop>
                <source src={video}
                    type='video/mp4' />
            </video>

            {/* Div 'capa' para dar efecto al video */}
            <div className={s.capa}></div>

        </div>
    );
}