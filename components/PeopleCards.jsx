import peopleCardDesign from '@/styles/PeopleCardDesign.module.css';
import Image from "next/image";
import Link from 'next/link';

const PeopleCard = ({ data }) => {
console.log(data.people)
    const { people, images } = data;
    const { base_url, profile_sizes } = images;
    const { profile_path, id, known_for_department, name ,type} = people;
    
    return (
      <Link href={`/people/${id}`}>
        <div key={id} className={peopleCardDesign.card}>
          <div className={peopleCardDesign.imageCard}>
            <Image
              src={`${base_url}/${profile_sizes[3]}/${profile_path}`}
              alt={`${name} image`}
              width={600}
              height={600}
            />
          </div>
          <div className={peopleCardDesign.infoCard}>
            <h3>{name}</h3>
            <span>{known_for_department}</span>
          </div>
        </div>
      </Link>
    );
}
 
export default PeopleCard;


