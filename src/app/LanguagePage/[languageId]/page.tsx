'use client'

import Link from "next/link";
import { notFound } from "next/navigation";
import languageData from "../../data/languagedata.js";
import BackButton from "../../components/BackButton";
import SpotlightCard from "../../components/SpotlightCard";
import ColorfulText from "../../components/ColorfulText";
import { motion } from "framer-motion";

export default function LanguagePage({
  params,
}: {
  params: { languageId: string };
}) {
  const { languageId } = params;
  const language = languageData.find(
    (language: { id: string }) => language.id === languageId
  );

  if (!language) {
    notFound();
  }

  return (
    <div className="bg-orange-200">
      <BackButton text="Back" className="rounded-full z-10 sticky top-10 -ml-1"/>
      <SpotlightCard
        className="custom-spotlight-card w-[90%] p-5 my-5 mx-auto flex flex-wrap items-center justify-center"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <div className="mx-auto">
          <img
            src={language.logo}
            alt={language.name}
            className="w-100 h-100 p-5"
          />
        </div>
        <div className="mx-auto">
          <div className="flex items-center justify-center relative overflow-hidden">
            <motion.img
              className="object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
            />
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
              <ColorfulText text={language.name} />{" "}
            </h1>
          </div>
        </div>
        <div className="mx-auto">
          <img
            src={language.founders[0]?.image}
            alt={language.founders[0].name}
            className="w-120 h-120 rounded-full hover:border-3 hover:border-white hover:shadow-md hover:shadow-white hover:rounded-none hover:translate-0.5 duration:250 transition-all ease-in-out"
          ></img>
          <p className="text-white text-4xl text-center font-semibold mt-2">
            {language.founders[0].name}
          </p>
        </div>
      </SpotlightCard>
      <br />
      <br />
      <br />
      {language.founders[0].twitter || language.founders[0].linkedin || language.founders[0].github ? 
      <div className="flex flex-wrap items-center justify-center my-5 mx-auto">
        <h2 className="text-4xl text-center font-semibold">
          Founder's Socials ➣&nbsp;
        </h2>
        {language.founders[0]?.twitter ? 
        <Link href={language.founders[0]?.twitter}>
          <button className="p-[3px] mx-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase">
              <img
                src="/socialImages/twitterx_icon.png"
                alt="Twitter"
                className="w-5 h-5 inline-block mx-4 invert"
              />
              <p>X / Twitter</p>
            </div>
          </button>
        </Link> : null }
        {language.founders[0]?.linkedin ? 
        <Link href={language.founders[0]?.linkedin}>
          <button className="p-[3px]  mx-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase">
              <img
                src="/socialImages/linkedin_icon.png"
                alt="LinkedIn"
                className="w-7 h-7 inline-block mx-4"
              />
              <p>LinkedIn</p>
            </div>
          </button>
        </Link> : null }
        {language.founders[0]?.github ? 
        <Link href={language.founders[0]?.github}>
          <button className="p-[3px] mx-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase">
              <img
                src="/socialImages/github_icon.png"
                alt="Github"
                className="w-7 h-7 inline-block mx-4 invert"
              />
              <p>Github</p>
            </div>
          </button>
        </Link> : null } 
      </div> : null }
      <br />
      <br />
      <br />
      <SpotlightCard
        className="custom-spotlight-card w-[90%] p-5 my-5 mx-auto"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-4xl text-center font-semibold my-4">Story</h2>
        <p className="text-gray-300 text-3xl leading-loose p-5 tracking-widest text-justify">
          {language.story}
        </p>
      </SpotlightCard>
      <br />
      <br />
      <br />
      <SpotlightCard
        className="custom-spotlight-card w-[90%] p-5 my-5 mx-auto"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-4xl text-center font-semibold my-4">
          Description
        </h2>
        <p className="text-gray-300 text-3xl leading-loose p-5 tracking-widest text-justify">
          {language.description}
        </p>
      </SpotlightCard>
      <br />
      <br />
      <br />
      <SpotlightCard
        className="custom-spotlight-card w-[90%] p-5 my-5 mx-auto tracking-widest text-justify"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-4xl text-center font-semibold my-4">
          Use Cases
        </h2>
        <div className="m-4">
          <p className="text-white text-3xl">
            <strong>{language.use_cases[0].company}™:</strong>
          </p>
          <p className="text-gray-300 text-3xl leading-loose">
            {language.use_cases[0].purpose}
          </p>
        </div>
        <div className="m-4">
          <p className="text-white text-3xl">
            <strong>{language.use_cases[1].company}™:</strong>
          </p>
          <p className="text-gray-300 text-3xl leading-loose">
            {language.use_cases[1].purpose}
          </p>
        </div>
        <div className="m-4">
          <p className="text-white text-3xl">
            <strong>{language.use_cases[2].company}™:</strong>
          </p>
          <p className="text-gray-300 text-3xl leading-loose">
            {language.use_cases[2].purpose}
          </p>
        </div>
        <div className="m-4">
          <p className="text-white text-3xl">
            <strong>{language.use_cases[3].company}™:</strong>
          </p>
          <p className="text-gray-300 text-3xl leading-loose">
            {language.use_cases[3].purpose}
          </p>
        </div>
      </SpotlightCard>
      <br />
      <br />
      <div className="flex flex-wrap items-center justify-center my-5">
        <Link href={language.official_docs}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-white hover:invert-100 dark:text-neutral-200 transition duration-200 mx-4">
            <img
              src="https://www.svgrepo.com/show/97315/documents-symbol.svg"
              alt="Github"
              className="w-6 h-6 inline-block mr-2"
            />
            Official Docs
          </button>
        </Link>
        <Link href={language.github}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-white hover:invert-100 dark:text-neutral-200 transition duration-200 mx-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Github"
              className="w-6 h-6 inline-block mr-2"
            />
            Github
          </button>
        </Link>
        <Link href={`/LanguagePage/${languageId}/libraries`}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-white hover:invert-100 dark:text-neutral-200 transition duration-200 mx-4">
            View {language.name} Libraries
          </button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}
