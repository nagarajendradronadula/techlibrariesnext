import Link from "next/link"

interface CustomTileProps {
    width: number,
    height: number,
    isHovered: boolean,
    path: string,
    name: string,
    subName?: string,
    className?: string,
}

export default function CustomTile({width,height, isHovered, path, name, subName,className}: CustomTileProps) {
    return (
        <div className="group">
            <Link style={{width: `${width * 4}px`, height: `${height * 4}px`}} className={`p-2 md:p-4 border-t-1 border-l-1 border-r-2 border-b-2 bg-white border-stone-200 shadow-lg flex flex-col items-center justify-center text-center ${
          isHovered
            ? "group-hover:bg-black group-hover:text-white group-hover:shadow-2xl hover:translate-0.5 duration-150 transition-all ease-in-out"
            : ""
        } cursor-pointer rounded-2xl text-lg md:text-3xl text-black ${className}`} href={path} >{name}<p className={`text-xs md:text-base text-gray-500 ${isHovered ? "group-hover:text-gray-300" : ""}`}>{subName}</p></Link>
        </div>
    )
}