import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import SlideForm from '../SlideForm/SlideForm'
import styles from './AddSlide.module.scss'
//import SectionAdmin from '../SectionAdmin/SectionAdmin'

export default function AddSlide() {
 return( 
    <SectionAdmin title={'Додати слайд'} lang={true}>
      <SlideForm/>
    </SectionAdmin>
  )
}