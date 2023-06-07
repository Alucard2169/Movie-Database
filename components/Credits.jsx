import Image from "next/image";
import creditStyle from "@/styles/Credits.module.css";
import Link from "next/link";

const Credits = ({ data }) => {
  const { images, creditData } = data;

  const { base_url, poster_sizes } = images;
  const { cast, crew } = creditData;
  console.log(cast);
  return (
    <div className={creditStyle.creditsContainer}>
      <div className={creditStyle.cast}>
        <h3>Cast</h3>
        <div className={creditStyle.container}>
          {cast.map((role) => (
            <div className={creditStyle.card} key={role.id}>
              <Link href={`/movie/${role.id}`}>
                <div className={creditStyle.movieSect}>
                  {!role.poster_path ? (
                    <p className={creditStyle.notAv}>Image not Available</p>
                  ) : (
                    <Image
                      src={`${base_url}/${poster_sizes[6]}/${role.poster_path}`}
                      alt={role.title}
                      width={70}
                      height={100}
                    />
                  )}
                </div>
                <div className={creditStyle.actorSect}>
                  <h4 className={creditStyle.movie}>{role.title}</h4>
                  {role.character && (
                    <h4 className={creditStyle.character}>{role.character}</h4>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {crew.length > 0 ? (
        <div className={creditStyle.crew}>
          <h3>Crew</h3>
          <div className={creditStyle.container}>
            {crew.map((role) => (
              <div className={creditStyle.card} key={role.id}>
                <Link href={`/movie/${role.id}`}>
                  <div className={creditStyle.movieSect}>
                    {!role.poster_path ? (
                      <p className={creditStyle.notAv}>Image not Available</p>
                    ) : (
                      <Image
                        src={`${base_url}/${poster_sizes[6]}/${role.poster_path}`}
                        alt={role.title}
                        width={70}
                        height={100}
                      />
                    )}
                  </div>
                  <div className={creditStyle.actorSect}>
                    <h4 className={creditStyle.movie}>{role.title}</h4>

                    <h4 className={creditStyle.character}>
                      {role.job} (<span>{role.department}</span>)
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Credits;
