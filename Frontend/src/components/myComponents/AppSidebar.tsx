import {
  Inbox,
  Table,
  Table2,
  TableCellsMergeIcon,
  IdCard,
  IndentIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const item = [
  {
    title: "Live Console",
    url: "/Console",
    icon: Inbox,
  },
  {
    title: "Attendance",
    url: "/Status",
    icon: IndentIcon,
  },
];
const item1 = [
  {
    title: "All Students",
    url: "/Records",
    icon: Table,
  },
  {
    title: "Present Students",
    url: "/Records/Dropped",
    icon: Table2,
  },
  {
    title: "Absent Students",
    url: "/Records/UnDropped",
    icon: TableCellsMergeIcon,
  },
  // {
  //   title: "RFID table",
  //   url: "/Records/rfid",
  //   icon: IdCard,
  // },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          {/* ======================== */}
          <SidebarGroupLabel>Child Records</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item1.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
