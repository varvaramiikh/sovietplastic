import Image from '../../ui/Image/Image.tsx';
import LikeButton from '../../ui/LikeButton/LikeButton.tsx';
import CheckButton from '../../ui/CheckButton/CheckButton.tsx';
import Link from '../../ui/Link/Link.tsx';
import PurchasePlanFields from '../PurchasePlanFields/PurchasePlanFields.tsx';
import { getCardImageStyle, type FigureCardProps } from './FigureCard';
import './FigureCard.css';
export default function FigureCard({ item, href = '/figurine' }: FigureCardProps) {
  return (
    <article className="figure-card">
      <div className="sp-acts">
        <LikeButton className={item.wantCls} pressed={item.wantPressed} onClick={item.toggleWant} />
        <CheckButton className={item.haveCls} pressed={item.havePressed} onClick={item.toggleHave} />
      </div>
      <div className="figure-card__media">
        <Link href={href} onClick={item.go} aria-label={item.title} className="figure-card__image-link">
          <figure className="figure-card__figure">
            <Image src={item.img} alt="" style={getCardImageStyle(item.scale)} />
          </figure>
        </Link>
        {item.planOn && <PurchasePlanFields item={item} />}
      </div>
      <div className="figure-card__body">
        <h3 className="figure-card__title">
          <Link href={href} onClick={item.go}>
            {item.title}
          </Link>
        </h3>
        <p className="figure-card__meta">
          <span>{item.category}</span>
          <span>{item.mainTag}</span>
        </p>
      </div>
    </article>
  );
}
