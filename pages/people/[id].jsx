import { useRouter } from "next/router";

const PeoplePage = () => {
  const router = useRouter();

  const { id } = router.query;

  console.log(id);
  return <div>Hello</div>;
};

export default PeoplePage;
