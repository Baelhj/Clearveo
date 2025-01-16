import Image from "next/image";

export default function Home() {
  return (
    <>
    <header className="flex flex-col  w-4/5 mx-auto gap-10">
      <div className="text-center mt-[10rem]">
        <h1 className="xl:text-6xl mb-7 sm:text-4xl">
          Eliminate <span className="line-through">Distractions </span><br />&
          <span className="font-bold">Watch Only</span> What Matters
        </h1>
        <p className="xl:text-lg sm:text-base">
          Save only the videos you need. Organize them into clean playlists
          <br />
          take time-linked notes, and stay in control of what you watch.
        </p>
      </div>

      <div className="text-center">
        <button className="bg-transparent text-orange-600 border border-orange-600 font-semibold py-2 px-4  hover:bg-orange-500 hover:text-white hover:border-transparent rounded-full">
          <span className="">→</span> Build Your Playlist in Seconds
        </button>
      </div>
    </header>

    {/* demo */}

    <section className=" w-4/5 mx-auto ">
      <div>

      </div>
    </section>
    </>
  );
}
