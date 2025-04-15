import AppSidebar from "@/components/myComponents/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Sidebar_layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className=" w-full">
                <SidebarTrigger />
                <div className=" p-1 h-[97vh] w-full overflow-y-auto">
                    {children}
                </div>
            </main>
        </SidebarProvider> 
    )
}
