import { Text, Accordion } from '@mantine/core';
import { SideBarLinks, SideBarLink, SubSideBarLink } from '@/components';
import { useIsActiveSidebarLink } from '@/hooks';
import {
  AiOutlineDashboard,
  AiFillSetting,
  MdOutlineVideoLibrary,
  MdPayment,
  ImManWoman,
  MdOutlineVideoCameraFront,
} from '@/components/icons';

export function InstructorSidebarLinks({ setSidebarOpened }) {
  const isActiveLink = useIsActiveSidebarLink();

  let defaultAccordionValue = '';

  if (isActiveLink('course')) {
    defaultAccordionValue = 'course';
  }

  return (
    <SideBarLinks>
      <Accordion
        defaultValue={defaultAccordionValue}
        variant="contained"
        sx={(theme) => ({
          color: theme.colors.lmsLayout[6],
          '& .mantine-Accordion-item': {
            border: `1px solid transparent`,
          },
          '& .mantine-Accordion-control': {
            padding: `8px 8px`,
            color: theme.colors.lmsLayout[6],
          },
          '& .mantine-Accordion-control:hover': {
            background: theme.colors.lmsLayout[2],
          },
        })}
      >
        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/index">
          <AiOutlineDashboard size={20} />
          <Text fw={500} fz={16}>
            Dashboard
          </Text>
        </SideBarLink>
        <Text fw={700} color="lmsSecondary" fz={12} pl={4}>
          Education
        </Text>
        <Accordion.Item value="course">
          <Accordion.Control icon={<MdOutlineVideoLibrary size={20} />}>
            <Text fw={500} fz={16}>
              Courses
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <SubSideBarLink
              setSidebarOpened={setSidebarOpened}
              href="/dashboard/instructor/courses"
            >
              <Text fw={500} fz={14}>
                Course Management
              </Text>
            </SubSideBarLink>
            <SubSideBarLink
              setSidebarOpened={setSidebarOpened}
              href="/dashboard/instructor/courses/trash"
            >
              <Text fw={500} fz={14}>
                Trash courses
              </Text>
            </SubSideBarLink>
            <SubSideBarLink
              setSidebarOpened={setSidebarOpened}
              href="/dashboard/instructor/courses/create"
            >
              <Text fw={500} fz={14}>
                Add New Course
              </Text>
            </SubSideBarLink>
            <SubSideBarLink
              setSidebarOpened={setSidebarOpened}
              href="/dashboard/instructor/course?tab=invites"
            >
              <Text fw={500} fz={14}>
                Courses Invitation
              </Text>
            </SubSideBarLink>
            <SubSideBarLink
              setSidebarOpened={setSidebarOpened}
              href="/dashboard/instructor/courses/attachments"
            >
              <Text fw={500} fz={14}>
                Courses Attachments
              </Text>
            </SubSideBarLink>
            <SubSideBarLink setSidebarOpened={setSidebarOpened} href="#">
              <Text fw={500} fz={14}>
                Courses Comments
              </Text>
            </SubSideBarLink>
          </Accordion.Panel>
        </Accordion.Item>
        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/lessons">
          <MdOutlineVideoCameraFront size={20} style={{ opicity: 0.6 }} />
          <Text fw={500} fz={16}>
            Lessons
          </Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/student">
          <ImManWoman size={20} />
          <Text fw={500} fz={16}>
            Students
          </Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/payment">
          <MdPayment size={20} />
          <Text fw={500} fz={16}>
            Payment
          </Text>
        </SideBarLink>

        <SideBarLink setSidebarOpened={setSidebarOpened} href="/dashboard/instructor/settings">
          <AiFillSetting size={20} />
          <Text fw={500} fz={16}>
            settings
          </Text>
        </SideBarLink>
      </Accordion>
    </SideBarLinks>
  );
}

export default InstructorSidebarLinks;
