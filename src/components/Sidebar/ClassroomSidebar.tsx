import { SidebarGroup, SidebarMenu } from "../ui/sidebar";
import CollapsibleSidebarMenuItem, { ICollapsibleSection } from "./SidebarMenuItem/CollapsibleSidebarMenuItem";

const classContents: ICollapsibleSection[] = [
  {
    section: "Section 1",
    subsections: [
      {
        subsection: "Subsection 1.1",
        contentId: "asd",
      },
      {
        subsection: "Subsection 1.2",
        contentId: "ddf",
      },
    ],
  },
  {
    section: "Section 2",
    subsections: [
      {
        subsection: "Subsection 2.1",
        contentId: "kjk",
      },
      {
        subsection: "Subsection 2.2",
        contentId: "ekj",
      },
    ],
  }
];

const ClassroomSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {classContents.map((content) => (
          <CollapsibleSidebarMenuItem
            key={content.section}
            section={content.section}
            subsections={content.subsections}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ClassroomSidebar;
