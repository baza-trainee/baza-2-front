import styles from './FormaterBlogText.module.scss'
import { createKey } from "@/src/lib/utils/createKey";

export default function FormaterBlogText(text, className){
  const rows = text.split(/\r\n|\r|\n/g);

  return (
    <>
      {
        rows.map((el)=>{
          if(el.length==1){
            return <div key={createKey()} className={styles.paragraph}>{el}</div>
          }else{ 
            return <p key={createKey()} className={className}>{el}</p>
          }
        })
      }
    </>
  )
}