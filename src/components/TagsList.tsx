import Tag from "./Tag";
import "./TagStyle.css";

type TagsListProps = {
  categories: string[];
};

export default function TagsList({ categories }: TagsListProps) {
  return (
    <div className="tags-container">
      {categories.map((name: string) => (
        <Tag key={name} name={name} />
      ))}
    </div>
  );
}
