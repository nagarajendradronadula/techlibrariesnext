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
        <div className="">
            <Link className={`w-${width} h-${height} p-4 border-t-1 border-l-1 border-r-2 border-b-2 bg-orange-100 border-stone-200 shadow-md shadow-stone-300 flex flex-col items-center justify-center text-center ${
          isHovered
            ? "hover:shadow-2xl hover:translate-0.5 duration-150 transition-all ease-in-out"
            : ""
        } cursor-pointer rounded-2xl text-2xl ${className}`} href={path} >{name}<p className="text-gray-400">{subName}</p></Link>
        </div>
    )
}