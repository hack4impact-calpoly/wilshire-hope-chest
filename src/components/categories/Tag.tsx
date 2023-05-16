import "../../styles/TagStyle.css";

type TagProps = {
  name: string;
};

export default function Tag({ name }: TagProps) {
  return <div className="tag">{name}</div>;
}
