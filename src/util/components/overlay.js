import './overlay.scss';


const Overlay = ({children, invisible, large = false, onClickOut}) => (
  <>
    <div onClick={onClickOut} className={`overlay ${!invisible && 'visible'}`}/>
    <div className={`overlay-content ${large && 'large'}`}>
      {children}
    </div>
  </>
);

export default Overlay;