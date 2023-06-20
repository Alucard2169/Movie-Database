import React, { useState } from "react";
import Image from "next/image";
import creditStyle from "@/styles/Credits.module.css";
import Link from "next/link";

const Credits = ({ data }) => {
  const { images, creditData, type } = data;

  const { base_url, poster_sizes, profile_sizes } = images;
  const { cast, crew } = creditData;
  console.log(cast);
  const [visibleCast, setVisibleCast] = useState(10);
  const [visibleCrew, setVisibleCrew] = useState(10);

  const truncatedCast = cast.slice(0, visibleCast);
  const truncatedCrew = crew.slice(0, visibleCrew);

  const handleViewMoreCast = () => {
    setVisibleCast(cast.length);
  };

  const handleViewMoreCrew = () => {
    setVisibleCrew(crew.length);
  };

  const handleViewLessCast = () => {
    setVisibleCast(10);
  };

  const handleViewLessCrew = () => {
    setVisibleCrew(10);
  };
  return (
    <div className={creditStyle.creditsContainer}>
      <div className={creditStyle.cast}>
        <h3>Cast</h3>
        <div className={creditStyle.container}>
          {truncatedCast.map((role) => (
            <div className={creditStyle.card} key={role.id}>
              <Link
                href={
                  type === "cast" ? `/people/${role.id}` : `/movie/${role.id}`
                }
                replace
              >
                {type === "person" ? (
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
                ) : (
                  <div className={creditStyle.movieSect}>
                    {!role.profile_path ? (
                      <p className={creditStyle.notAv}>Image not Available</p>
                    ) : (
                      <Image
                        src={`${base_url}/${profile_sizes[3]}/${role.profile_path}`}
                        alt={role.title}
                        width={70}
                        height={100}
                      />
                    )}
                  </div>
                )}
                <div className={creditStyle.actorSect}>
                  {type === "person" ? (
                    <h4 className={creditStyle.movie}>{role.title}</h4>
                  ) : (
                    <h4 className={creditStyle.movie}>{role.name}</h4>
                  )}
                  {role.character && (
                    <h4 className={creditStyle.character}>{role.character}</h4>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
        {visibleCast < cast.length && (
          <button onClick={handleViewMoreCast}>View More</button>
        )}
        {visibleCast === cast.length && (
          <button onClick={handleViewLessCast}>View Less</button>
        )}
      </div>

      {crew.length > 0 ? (
        <div className={creditStyle.crew}>
          <h3>Crew</h3>
          <div className={creditStyle.container}>
            {truncatedCrew.map((role) => (
              <div className={creditStyle.card} key={role.id}>
                <Link
                  href={
                    type === "cast" ? `/people/${role.id}` : `/movie/${role.id}`
                  }
                  replace
                >
                  {type === "person" ? (
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
                  ) : (
                    <div className={creditStyle.movieSect}>
                      {!role.profile_path ? (
                        <p className={creditStyle.notAv}>Image not Available</p>
                      ) : (
                        <Image
                          src={`${base_url}/${profile_sizes[3]}/${role.profile_path}`}
                          alt={role.title}
                          width={70}
                          height={100}
                        />
                      )}
                    </div>
                  )}
                  <div className={creditStyle.actorSect}>
                    {type === "person" ? (
                      <h4 className={creditStyle.movie}>{role.title}</h4>
                    ) : (
                      <h4 className={creditStyle.movie}>{role.name}</h4>
                    )}
                    {role.character && (
                      <h4 className={creditStyle.character}>
                        {role.character}
                      </h4>
                    )}

                    <h4 className={creditStyle.character}>
                      {role.job} (<span>{role.department}</span>)
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {visibleCrew < crew.length && (
            <button onClick={handleViewMoreCrew}>View More</button>
          )}
          {visibleCrew === crew.length && (
            <button onClick={handleViewLessCrew}>View Less</button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Credits;
