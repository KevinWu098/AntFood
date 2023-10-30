import Image from "next/image";
import Anteatery2 from "src/public/images/Anteatery2.jpg";
import { FaExternalLinkAlt } from "react-icons/fa";
import styles from "@/components/hero/hero.module.css";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="mt-8 flex h-[calc(100vh-6rem)] flex-col p-16 lg:flex-row">
        <div className="mx-auto flex w-[80%] flex-col">
          <div className="mb-8 items-center text-center text-4xl font-black leading-tight">
            <span className="text-primary">Redefining</span> your UCI Dining
            Experience
          </div>

          <div className="place-content-center text-center text-xl">
            Your personalized plate:{" "}
            <span className="font-semibold text-primary">curated meals</span>{" "}
            prepared by Artificial Intelligence,{" "}
            <span className="font-semibold text-primary">customized</span> for
            your preferences
          </div>

          <div className="my-10">
            <Link href="/profile">
              <button className="mx-auto flex items-center gap-4 rounded-full border-2 border-solid bg-primary px-8 py-4 text-[1.555rem] font-bold text-background">
                Dig in!
                <FaExternalLinkAlt />
              </button>
            </Link>
          </div>
        </div>

        <div
          className={`mx-auto flex w-[90%] place-content-center justify-center rounded-lg ${styles.fadeInUp}`}
        >
          <Image src={Anteatery2} alt="Anteatery" className="rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default Hero;
