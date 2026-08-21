import DashboardShell from "@/components/dashboard/DashboardShell";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default Layout;
