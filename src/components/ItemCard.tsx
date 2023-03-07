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
          <div className="item-card-name">{itemName}</div>
          <div className="item-card-date">{date}</div>
        </div>
        <div className="item-card-price">{money}</div>
        {/* <div className="item-card-categories">
          {tags.map((tag) => (
            <p className="item-card-tag">{tag}</p>
          ))}
        </div> */}
      </div>
    </div>
  );
}
