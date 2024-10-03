import styles from './FormaterBlogText.module.scss'
import { createKey } from "@/src/lib/utils/createKey";

export default function FormaterBlogText(text, className){
  const rows = text.split(/\r\n|\r|\n/g);
  console.log(rows)

  return (
    <>
      {
        rows.map((el)=>{
          console.log(el.length)
          if(el.length==1){
            return <div key={createKey()} className={styles.paragraph}>{el}</div>
          }else{ 
            return <p key={createKey()} className={className}>{el}</p>
          }
          // if(el.length){
          //   return <p key={createKey()} className={className}>{el}</p>
          // }else return <div key={createKey()} className={styles.paragraph}></div>
        })
      }
    </>
  )
}