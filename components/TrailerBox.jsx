import trailerBoxStyle from "@/styles/trailerBox.module.css";

const TrailerBox = ({ data, handleMethod }) => {
  console.log(data);
  return (
    <div className={trailerBoxStyle.backdrop} onClick={handleMethod}>
      <div className={trailerBoxStyle.box}>
        <iframe
          id={data[0].id}
          src={`https://www.youtube.com/embed/${data[0].key}`}
          title={data[0].name}
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerBox;
