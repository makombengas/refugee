
import { members } from "@/data/data";
import MemberCard from "./membersCard/MemberCard";



const MembersSection = () => {
  return (
    <section className="py-16 px-0 md:px-12">
      <div className="container px-6 mx-auto">
        <h2 className="font-display text-4xl md:text-7xl tracking-wide text-primary md:mb-2">
          Les Membres
        </h2>
        <div className="w-16 h-0.5 bg-primary mb-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberCard
            key={member.id}
              {...member}
              delay={members.indexOf(member) * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
