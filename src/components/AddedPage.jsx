import RowItem from "./RowItem";

const AddedPage = ({ config}) => {
  
  const rows = Array.from({ length: 50 });
  const mid = 25;

  return (
    <div className="page">
      <div className="columns-container">
        <div className="column column-left">
          {rows.slice(0, mid).map((_, i) => (
            <RowItem key={i} config={config} />
          ))}
        </div>
        <div className="column">
          {rows.slice(mid).map((_, i) => (
            <RowItem key={i + mid} config={config} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddedPage;