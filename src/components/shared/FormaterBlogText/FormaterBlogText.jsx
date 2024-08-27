import { createKey } from "@/src/lib/utils/createKey";

export default function FormaterBlogText(text, className){
  const rows = text.split(/\r\n|\r|\n/g);

  return (
    <>
      {
        rows.map((el)=>{
          if(el.length){
            return <p key={createKey()} className={className}>{el}</p>
          }else return null
        })
      }
    </>
  )
}