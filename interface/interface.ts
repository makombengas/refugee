export interface PageLayoutProps {
    children: React.ReactNode;
}

export interface HeaderLink {
    id: number;
    name: string;
    href: string;
}
export interface Slide {
    id: number;
    image: string;
    sub: string;
    title: string;
    desc: string;
    link: string;
}
export type Track = {
  id: number;
  title: string;
  artist: string;
  label: string;
  url: string;
  duration: string;
    price: number;
    paypalMe: string;
};
export type NewsItems ={
    date: string;
    category: string;
    title: string;
    img: string;

}
export interface Members {
    id: number;
    name: string;
    role: string;
    origin: string;
    image: string;
    tag: string;
}
export type Event = {
  id: number;
  day: string;
  month: string;
  year: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  time: string;
  type: 'concert' | 'festival' | 'prive';
  ticketUrl: string;
  soldOut?: boolean;
  featured?: boolean;
};
export interface MemberCardProps {
    name: string;
    role: string;
    image: string;
    delay?: number;
}
export interface imagesProps {
    bernard: string;
    franky: string;
    leonce: string;
    rodrigue: string;
}