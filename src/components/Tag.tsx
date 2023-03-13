import "./TagStyle.css";

type TagProps = {
  name: string;
};

export default function Tag({ name }: TagProps) {
  return <div className="box">{name}</div>;
}
