const SingleMoviePage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>This is the Movie</h1>
    </div>
  );
};

export default SingleMoviePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
