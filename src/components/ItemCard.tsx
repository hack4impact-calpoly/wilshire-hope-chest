import "./ItemCard.css";

interface ItemCardProps {
  itemName: string;
  date: string;
  money: string;
  //   tags: string[];
}

export default function ItemCard({ itemName, date, money }: ItemCardProps) {
  return (
    <div className="item-card">
      <div className="item-card-imgbox" />
      <div className="item-card-info">
        <div className="item-titlebox">
          <p className="item-card-name">{itemName}</p>
          <p className="item-card-date">{date}</p>
        </div>
        <p className="item-card-price">{money}</p>
        {/* <div className="item-card-categories">
          {props.tags.map((tag) => (
            <p className="item-card-tag">{tag}</p>
          ))}
        </div> */}
      </div>
    </div>
  );
}
