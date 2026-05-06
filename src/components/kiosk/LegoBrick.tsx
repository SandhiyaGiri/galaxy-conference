

export type BrickColor =
    | "red"
    | "blue"
    | "yellow"
    | "green"
    | "orange"
    | "purple"
    | "white"
    | "black"
    | "bronze"
    | "silver"
    | "gold";

interface LegoBrickProps {
    color: BrickColor;
    width: number;
    height: number;
    studsX: number;
    className?: string;
    selected?: boolean;
    isHovered?: boolean;
    label?: string;
    labelSize?: string;
}

const colorMap: Record<BrickColor, {
    main: string;
    top: string;
    side: string;
    bottom: string;
    studTop: string;
    shiny: string;
    glow?: string;
}> = {
    red: {
        main: "hsl(0, 85%, 50%)",
        top: "hsl(0, 85%, 60%)",
        side: "hsl(0, 85%, 40%)",
        bottom: "hsl(0, 85%, 30%)",
        studTop: "hsl(0, 85%, 55%)",
        shiny: "rgba(255,255,255,0.4)",
        glow: "rgba(239, 68, 68, 0.5)",
    },
    blue: {
        main: "hsl(215, 90%, 50%)",
        top: "hsl(215, 90%, 60%)",
        side: "hsl(215, 90%, 40%)",
        bottom: "hsl(215, 90%, 30%)",
        studTop: "hsl(215, 90%, 55%)",
        shiny: "rgba(255,255,255,0.35)",
        glow: "rgba(59, 130, 246, 0.5)",
    },
    yellow: {
        main: "hsl(45, 100%, 50%)",
        top: "hsl(45, 100%, 65%)",
        side: "hsl(45, 100%, 40%)",
        bottom: "hsl(45, 100%, 30%)",
        studTop: "hsl(45, 100%, 60%)",
        shiny: "rgba(255,255,255,0.5)",
        glow: "rgba(234, 179, 8, 0.7)",
    },
    green: {
        main: "hsl(145, 80%, 45%)",
        top: "hsl(145, 80%, 55%)",
        side: "hsl(145, 80%, 35%)",
        bottom: "hsl(145, 80%, 25%)",
        studTop: "hsl(145, 80%, 50%)",
        shiny: "rgba(255,255,255,0.35)",
        glow: "rgba(34, 197, 94, 0.5)",
    },
    orange: {
        main: "hsl(25, 100%, 50%)",
        top: "hsl(25, 100%, 60%)",
        side: "hsl(25, 100%, 40%)",
        bottom: "hsl(25, 100%, 30%)",
        studTop: "hsl(25, 100%, 55%)",
        shiny: "rgba(255,255,255,0.4)",
        glow: "rgba(249, 115, 22, 0.5)",
    },
    purple: {
        main: "hsl(265, 80%, 55%)",
        top: "hsl(265, 80%, 65%)",
        side: "hsl(265, 80%, 45%)",
        bottom: "hsl(265, 80%, 35%)",
        studTop: "hsl(265, 80%, 60%)",
        shiny: "rgba(255,255,255,0.3)",
        glow: "rgba(168, 85, 247, 0.5)",
    },
    white: {
        main: "hsl(0, 0%, 95%)",
        top: "hsl(0, 0%, 100%)",
        side: "hsl(0, 0%, 88%)",
        bottom: "hsl(0, 0%, 78%)",
        studTop: "hsl(0, 0%, 98%)",
        shiny: "rgba(255,255,255,0.6)",
    },
    black: {
        main: "hsl(0, 0%, 15%)",
        top: "hsl(0, 0%, 25%)",
        side: "hsl(0, 0%, 10%)",
        bottom: "hsl(0, 0%, 5%)",
        studTop: "hsl(0, 0%, 20%)",
        shiny: "rgba(255,255,255,0.1)",
    },
    gold: {
        main: "hsl(45, 90%, 50%)",
        top: "hsl(45, 90%, 65%)",
        side: "hsl(45, 90%, 40%)",
        bottom: "hsl(45, 90%, 30%)",
        studTop: "hsl(45, 90%, 60%)",
        shiny: "rgba(255,255,255,0.5)",
        glow: "rgba(234, 179, 8, 0.7)",
    },
    bronze: {
        main: "hsl(25, 85%, 45%)",
        top: "hsl(25, 85%, 55%)",
        side: "hsl(25, 85%, 35%)",
        bottom: "hsl(25, 85%, 25%)",
        studTop: "hsl(25, 85%, 50%)",
        shiny: "rgba(255,255,255,0.35)",
        glow: "rgba(234, 88, 12, 0.5)",
    },
    silver: {
        main: "hsl(215, 25%, 65%)",
        top: "hsl(215, 25%, 75%)",
        side: "hsl(215, 25%, 55%)",
        bottom: "hsl(215, 25%, 45%)",
        studTop: "hsl(215, 25%, 70%)",
        shiny: "rgba(255,255,255,0.3)",
    },
};

export default function LegoBrick({ color, width, height, studsX, className, selected, isHovered, label, labelSize }: LegoBrickProps) {
    const colors = colorMap[color] || colorMap.purple;

    return (
        <div
            className={`relative preserve-3d transition-all duration-500 ${className || ""}`}
            style={{
                width,
                height,
                perspective: "1000px",
                transform: selected ? "translateZ(20px) scale(1.05)" : isHovered ? "translateY(-12px) rotateX(5deg)" : "none"
            }}
        >
            {/* Main Body */}
            <div
                className="absolute inset-0 rounded-[4px] transition-all duration-500"
                style={{
                    backgroundColor: colors.main,
                    filter: selected ? "saturate(1.2) brightness(1.1)" : "none",
                    boxShadow: selected
                        ? `0 0 40px ${colors.glow || "rgba(255,255,255,0.3)"}, inset 0 0 20px rgba(255,255,255,0.2)`
                        : isHovered
                            ? `0 25px 50px rgba(0,0,0,0.15)`
                            : `0 8px 24px rgba(0,0,0,0.1)`,
                    border: `1px solid ${colors.top}`,
                    borderBottom: `4px solid ${colors.bottom}`,
                }}
            />

            {/* Studs */}
            <div className="absolute -top-[8px] inset-x-0 flex justify-around px-3 pointer-events-none">
                {Array.from({ length: studsX }).map((_, i) => (
                    <div
                        key={i}
                        className="relative"
                        style={{ width: width / studsX - 10, height: 8 }}
                    >
                        <div
                            className="absolute inset-0 rounded-t-[4px] transition-all duration-500"
                            style={{
                                backgroundColor: colors.main,
                                border: `1px solid ${colors.top}`,
                                borderBottom: "none",
                                boxShadow: selected ? `0 0 15px ${colors.glow || "white"}` : "none"
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Label */}
            {label && (
                <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                    <span
                        className={`${labelSize ?? "text-[18px]"} font-black text-center leading-tight drop-shadow-lg uppercase tracking-tighter`}
                        style={{
                            color: "#fff",
                            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}
