import "../../styles/TagStyle.css";
import Tag from "./Tag";

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
