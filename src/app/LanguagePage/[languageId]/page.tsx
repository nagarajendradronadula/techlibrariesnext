import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import languageData from "../../data/languagedata.js";
import BackButton from "../../components/BackButton";
import SpotlightCard from "../../components/SpotlightCard";
import ColorfulText from "../../components/ColorfulText";
import DocsIcon from "../../components/DocsIcon";
import MotionImage from "../../components/MotionImage";
import AdSense from "../../components/AdSense";

export async function generateStaticParams() {
  return languageData.map((language) => ({ languageId: language.id }));
}

export default function LanguagePage({
  params,
}: {
  params: Promise<{ languageId: string }>;
}) {
  const { languageId } = use(params);
  const language = languageData.find(
    (language: { id: string }) => language.id === languageId
  );

  if (!language) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen px-2 sm:px-4">
      <BackButton text="Back" className="rounded-full -ml-1"/>
      <SpotlightCard
        className="custom-spotlight-card w-[95%] sm:w-[90%] p-3 sm:p-5 my-5 mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-center gap-4 lg:gap-8"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <div className="flex-shrink-0">
          <img
            src={language.logo?.startsWith('/') ? language.logo : `/${language.logo}`}
            alt={language.name}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-2 sm:p-3 md:p-5"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-center relative overflow-hidden">
            <MotionImage />
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-black relative z-2 font-sans">
              <ColorfulText text={language.name} />{" "}
            </h1>
          </div>
        </div>
        <div className="flex-shrink-0 text-center">
          <img
            src={language.founders[0]?.image}
            alt={language.founders[0]?.name || 'Founder'}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full hover:border-3 hover:border-white hover:shadow-md hover:shadow-white hover:rounded-none hover:translate-0.5 duration:250 transition-all ease-in-out mx-auto"
          />
          <p className="text-gray-300 text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-semibold mt-2">
            {language.founders[0]?.name}
          </p>
        </div>
      </SpotlightCard>
      <br />
      <br />
      <br />
      {language.founders[0].twitter || language.founders[0].linkedin || language.founders[0].github ? 
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center my-5 mx-auto px-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold text-black mb-4 sm:mb-0">
          Founder's Socials ➣&nbsp;
        </h2>
        {language.founders[0]?.twitter ? 
        <Link href={language.founders[0]?.twitter}>
          <button className="p-[3px] mx-1 sm:mx-2 my-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-2 sm:px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase text-xs sm:text-sm">
              <img
                src="/socialImages/twitterx_icon.png"
                alt="Twitter"
                className="w-4 h-4 sm:w-5 sm:h-5 inline-block mx-2 sm:mx-4 invert"
              />
              <p>X / Twitter</p>
            </div>
          </button>
        </Link> : null }
        {language.founders[0]?.linkedin ? 
        <Link href={language.founders[0]?.linkedin}>
          <button className="p-[3px] mx-1 sm:mx-2 my-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-2 sm:px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase text-xs sm:text-sm">
              <img
                src="/socialImages/linkedin_icon.png"
                alt="LinkedIn"
                className="w-5 h-5 sm:w-7 sm:h-7 inline-block mx-2 sm:mx-4"
              />
              <p>LinkedIn</p>
            </div>
          </button>
        </Link> : null }
        {language.founders[0]?.github ? 
        <Link href={language.founders[0]?.github}>
          <button className="p-[3px] mx-1 sm:mx-2 my-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-2 sm:px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex justify-center items-center font-bold uppercase text-xs sm:text-sm">
              <img
                src="/socialImages/github_icon.png"
                alt="Github"
                className="w-5 h-5 sm:w-7 sm:h-7 inline-block mx-2 sm:mx-4 invert"
              />
              <p>Github</p>
            </div>
          </button>
        </Link> : null } 
      </div> : null }
      <br />
      <br />
      <br />
      <div className="max-w-4xl mx-auto my-8">
        <AdSense />
      </div>
      <SpotlightCard
        className="custom-spotlight-card w-[95%] sm:w-[90%] p-3 sm:p-5 my-5 mx-auto"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">Story</h2>
        <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose p-3 sm:p-5 tracking-wide sm:tracking-widest text-justify hyphens-auto">
          {language.story}
        </p>
      </SpotlightCard>
      <br />
      <br />
      <br />
      <SpotlightCard
        className="custom-spotlight-card w-[95%] sm:w-[90%] p-3 sm:p-5 my-5 mx-auto"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
          Description
        </h2>
        <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose p-3 sm:p-5 tracking-wide sm:tracking-widest text-justify hyphens-auto">
          {language.description}
        </p>
      </SpotlightCard>
      <br />
      <br />
      <br />
      <div className="max-w-4xl mx-auto my-8">
        <AdSense />
      </div>
      <SpotlightCard
        className="custom-spotlight-card w-[95%] sm:w-[90%] p-3 sm:p-5 my-5 mx-auto tracking-wide sm:tracking-widest text-justify"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
          Use Cases
        </h2>
        <div className="m-2 sm:m-4">
          <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <strong>{language.use_cases[0].company}™:</strong>
          </p>
          <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose hyphens-auto">
            {language.use_cases[0].purpose}
          </p>
        </div>
        <div className="m-2 sm:m-4">
          <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <strong>{language.use_cases[1].company}™:</strong>
          </p>
          <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose hyphens-auto">
            {language.use_cases[1].purpose}
          </p>
        </div>
        <div className="m-2 sm:m-4">
          <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <strong>{language.use_cases[2].company}™:</strong>
          </p>
          <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose hyphens-auto">
            {language.use_cases[2].purpose}
          </p>
        </div>
        <div className="m-2 sm:m-4">
          <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <strong>{language.use_cases[3].company}™:</strong>
          </p>
          <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed sm:leading-loose hyphens-auto">
            {language.use_cases[3].purpose}
          </p>
        </div>
      </SpotlightCard>
      <br />
      <br />
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center my-5 gap-4 px-4">
        <Link href={language.official_docs}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full tracking-wide sm:tracking-widest uppercase font-bold bg-transparent hover:bg-black hover:text-white transition duration-200 group text-xs sm:text-sm md:text-base w-full sm:w-auto">
            <DocsIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block mr-2 group-hover:text-white" />
            Official Docs
          </button>
        </Link>
        <Link href={language.github}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full tracking-wide sm:tracking-widest uppercase font-bold bg-transparent hover:bg-black hover:text-white transition duration-200 group text-xs sm:text-sm md:text-base w-full sm:w-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Github"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block mr-2 group-hover:invert"
            />
            Github
          </button>
        </Link>
        <Link href={`/LanguagePage/${languageId}/libraries`}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full tracking-wide sm:tracking-widest uppercase font-bold bg-transparent hover:bg-black hover:text-white transition duration-200 text-xs sm:text-sm md:text-base w-full sm:w-auto">
            View {language.name} Libraries
          </button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}
