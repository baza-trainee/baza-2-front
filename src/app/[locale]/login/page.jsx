import { Link } from "@/src/navigation";

export default function signin() {
  // !! Замінити  <div> на готові компоненти !!
  return <div><h2>Сторінка: login</h2>
  <Link href={'/login/registration'}>registration</Link>
  </div>
};