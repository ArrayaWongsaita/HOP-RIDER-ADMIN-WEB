const positionText = {
    right: 'justify-end',
    left: 'justify-start',
}

const bgColor = {
    leftToRight: 'bg-gradient-to-r from-[#1D2B53] from-50% to-[#FF004D] to-100%',
    rightToLeft: 'bg-gradient-to-r from-[#FF004D] from-10% to-[#1D2B53] to-60%',
}

export default function Section({ children, position = 'right', color = 'leftToRight' }) {
    return (
        <div className={`w-full h-[70px] flex items-center ${positionText[position]} p-4 mb-5
            font-semibold text-xl text-white
            ${bgColor[color]} `}>
            {children}
        </div>
    )
}
