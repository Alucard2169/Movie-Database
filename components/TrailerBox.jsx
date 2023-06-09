import trailerBoxStyle from "@/styles/trailerBox.module.css";

const TrailerBox = ({ data, handleMethod }) => {
  const trailerData = data.filter((a) => a.name === "Official Trailer");

  return (
    <div className={trailerBoxStyle.backdrop} onClick={handleMethod}>
      <div className={trailerBoxStyle.box}>
        <iframe
          id={trailerData[0].id}
          src={`https://www.youtube.com/embed/${trailerData[0].key}`}
          title={trailerData[0].name}
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerBox;
