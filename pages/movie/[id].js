import singlePageDesign from "../../styles/SinglePage.module.css";
import { AiOutlineGlobal } from "react-icons/ai";

const SingleMoviePage = ({ data, images, cast, crew }) => {
  console.log(data);

  const {
    adult,
    backdrop_path,
    title,
    overview,
    homepage,
    genres,
    release_date,
    runtime,
    budget,
  } = data;
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
                {homepage && (
                  <a href={homepage} target="_blank">
                    <AiOutlineGlobal className={singlePageDesign.icons} />
                  </a>
                )}
              </aside>
            </section>

            <div className={singlePageDesign.coreDetails}>
              <div className="date">
                <span>RELEASE</span>
                <p>{release_date}</p>
              </div>
              <div className="buget">
                <span>BUGET</span>
                <p>{"$" + (budget / 1000000).toFixed(1) + "M"}</p>
              </div>
              <div className="length">
                <span>LENGTH</span>
                <p>{runtime} min</p>
              </div>
            </div>
          </section>
          <section className={singlePageDesign.lower}>
            <article>
              <h3>Description</h3>
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
