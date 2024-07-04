import { useParams } from "next/navigation";
import React from "react";

const ProjectCardTeam = ({ project, handleClose }) => {
  const { locale } = useParams();

  const projectTeamTitle = project.title[locale];
  const rolesAndMembers = {};

  project.teamMembers.forEach((member) => {
    if (!member.teamMember || !member.teamMemberRole) return;

    const roleName = member.teamMemberRole.name.en;
    if (!rolesAndMembers[roleName]) {
      rolesAndMembers[roleName] = [];
    }
    rolesAndMembers[roleName].push(member.teamMember);
  });

  const sortedRoles = Object.keys(rolesAndMembers).sort(
    (a, b) => orderList.indexOf(a) - orderList.indexOf(b)
  );

  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};

export default ProjectCardTeam;
