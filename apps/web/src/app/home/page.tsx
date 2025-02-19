import {
  ActionGenre,
  RecentlyRelased,
} from "../../components/Anim/RecentlyRelased";
import { Header } from "../../components/home/Header";

const page = () => {
  return (
    <section className="opacity-95 bg-[#00050D] ">
      <Header />
      <RecentlyRelased />
      <ActionGenre />
    </section>
  );
};
export default page;
