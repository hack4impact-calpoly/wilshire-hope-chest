import "./TagStyle.css";

type TagProps = {
  key: string;
  name: string;
};

export default function Tag({ name, key }: TagProps) {
  return (
    <div className="box" key={key}>
      {name}
    </div>
  );
}
