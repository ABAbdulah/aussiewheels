import Link from "next/link";
import Image from "next/image";

const bodyTypes = [
  {
    label: "New cars",
    href: "/buy/cars?condition=new",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Electric",
    href: "/buy/cars?fuel=electric",
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Hybrid",
    href: "/buy/cars?fuel=hybrid",
    img: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "SUV",
    href: "/buy/cars?body=suv",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Ute",
    href: "/buy/cars?body=ute",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Hatch",
    href: "/buy/cars?body=hatch",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Offroad 4×4",
    href: "/buy/cars?body=4x4",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=320&h=180&auto=format&fit=crop",
  },
  {
    label: "Performance",
    href: "/buy/cars?body=performance",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=320&h=180&auto=format&fit=crop",
  },
];

export function BodyTypePicker() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {bodyTypes.map(({ label, href, img }) => (
        <Link
          key={label}
          href={href}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-muted/40">
            <Image
              src={img}
              alt={label}
              fill
              sizes="(min-width: 640px) 12.5vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
          <div className="px-2 py-2.5 text-center">
            <span className="text-[11px] font-medium tracking-wide text-foreground/70 transition-colors group-hover:text-primary">
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
