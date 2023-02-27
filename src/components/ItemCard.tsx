interface ItemCardProps {
  itemName: string;
  date: string;
  money: string;
  tags: string[];
  imgSrc: string;
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <div className="item-card">
      <img className="item-card-img" src={props.imgSrc} alt="itemName" />
      <div className="item-card-info">
        <div className="item-titlebox">
          <h1 className="item-card-name">{props.itemName}</h1>
          <h1 className="item-card-date">{props.date}</h1>
        </div>
        <p className="item-card-price">{props.money}</p>
        <div className="item-card-categories">
          {props.tags.map((tag) => (
            <p className="item-card-tag">{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
