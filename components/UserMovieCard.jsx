import userMovieCard from '@/styles/UserMovieCard.module.css';
import Image from "next/image";
import { AiFillDelete } from 'react-icons/ai';

const UserMovieCard = () => {
    return (
      <div className={userMovieCard.card}>
        <div className={userMovieCard.imageContainer}>
          <Image
            width={300}
            height={1000}
            src="https://imgs.search.brave.com/NhEym4ZjGl_U-tM52O3mG1X8V_LqjPw9978VmQtsN9A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92aXN0/YXBvaW50ZS5uZXQv/aW1hZ2VzL2dpbnRh/bWEtMS5qcGc"
            alt="image"
          />
        </div>
        <div className={userMovieCard.movieInfo}>
          <h4>Gintama</h4>
          <aside>
                    <span><AiFillDelete className={userMovieCard.icon} /></span>
            <p>
              Your rating: <span>10</span>
            </p>
          </aside>
        </div>
      </div>
    );
}
 
export default UserMovieCard;