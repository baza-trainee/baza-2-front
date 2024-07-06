import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import styles from "./ProjectCardTeam.module.scss";

const ProjectCardTeam = ({ project, handleClose, isShowed }) => {
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
    <div className={clsx(styles.projectTeam, isShowed && styles.showed)}>
      <h4 className={styles.title}>{projectTeamTitle}</h4>
      <button className={styles.close} onClick={handleClose}>
        <span />
        <span />
      </button>
      <div className={styles.content}>
        {sortedRoles.map((role) => (
          <div key={role}>
            <h4 className={styles.roleTitle}>{role}</h4>

            {rolesAndMembers[role].map((teamMember) => (
              <Link
                key={teamMember._id}
                className={styles.member}
                href={teamMember?.profileUrl}
                target="_blank"
              >
                {teamMember.name[locale]}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardTeam;
