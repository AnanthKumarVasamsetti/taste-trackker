
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ClipboardCheck, Home, Users, BarChart, Settings, LineChart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/"
    },
    {
      title: "Audits",
      icon: ClipboardCheck,
      path: "/audits"
    },
    {
      title: "Audits In Review",
      icon: CheckCircle2,
      path: "/audits/in-review"
    },
    {
      title: "Auditors",
      icon: Users,
      path: "/auditors"
    },
    {
      title: "Reports",
      icon: BarChart,
      path: "/reports"
    },
    {
      title: "Analytics",
      icon: LineChart,
      path: "/analytics"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <SidebarComponent>
      <div className="flex items-center justify-center p-4">
        <h1 className="text-xl font-bold text-brand-blue">FoodAudit Pro</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
