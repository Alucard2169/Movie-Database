import singlePageDesign from "../../styles/SinglePage.module.css";

const SingleMoviePage = ({ data, images, cast, crew }) => {
  console.log(data);

  const { backdrop_path, title, overview, genres, release_date, runtime } =
    data;
  const { base_url, backdrop_sizes } = images;

  return (
    <div className={singlePageDesign.singlePage}>
      <div className={singlePageDesign.moviePoster}>
        <img
          src={`${base_url}${backdrop_sizes[3]}${backdrop_path}`}
          alt={title}
        />
      </div>
      <div className={singlePageDesign.movieDetails}>
        <div className={singlePageDesign.info}>
          <section className={singlePageDesign.top}>
            <section className={singlePageDesign.topDetails}>
              <div className={singlePageDesign.left}>
                <div className={singlePageDesign.directors}>
                  {crew.map((people) =>
                    people.job === "Director" ? (
                      <span>{people.name}</span>
                    ) : null
                  )}
                </div>
                <div className={singlePageDesign.name}>
                  <h1>{title}</h1>
                </div>
                <div className={singlePageDesign.geners}>
                  <ul>
                    {genres.map((gener) => (
                      <li> {gener.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <aside>
                <span>Share</span>
              </aside>
            </section>

            <div className="coreDetails">
              <div className="trailer"></div>
              <div className="rating">
                <span>RATING</span>
                <p>PG</p>
              </div>
              <div className="date">
                <span>RELEASE</span>
                <p>{release_date}</p>
              </div>
              <div className="buget">
                <span>BUGET</span>
                <p>$130M</p>
              </div>
              <div className="length">
                <span>LENGTH</span>
                <p>{runtime} min</p>
              </div>
            </div>
          </section>
          <section className={singlePageDesign.lower}>
            <article>
              <h4>Description</h4>
              <p>{overview}</p>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const peopleResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const peopleData = await peopleResponse.json();

  const cast = peopleData.cast;
  const crew = peopleData.crew;

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await response.json();

  return {
    props: {
      data,
      images,
      cast,
      crew,
    },
  };
};
