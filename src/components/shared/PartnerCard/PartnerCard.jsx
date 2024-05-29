import Image from "next/image";
import "./PartnerCard.scss";
import image from "./images/deltahost.png";

export default function PartnerCard({ img }) {
  return (
    <div className="partner-card__item">
      <Image
        className="partner-card__image"
        src={image}
        alt="Card image"
        fill
        sizes="100%"
      ></Image>
    </div>
  );
}
