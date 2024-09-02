import SectionAdmin from '../../SectionAdmin/SectionAdmin'

export default function ProjectLayout({title, children}) {
 return( 
    <SectionAdmin title={title} nav={true}>
      {children}
    </SectionAdmin>
  )
}