"use client";

import { Slot } from "@radix-ui/react-slot";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTitle } from "./sheet";

const SIDEBAR_STORAGE_KEY = "imaginify-sidebar-open";

type SidebarContextValue = {
  open: boolean;
  openMobile: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider.");
  }

  return context;
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
};

export function SidebarProvider({
  defaultOpen = true,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const preferenceLoaded = React.useRef(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedPreference = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);

      if (storedPreference !== null) {
        setOpen(storedPreference === "true");
      }

      preferenceLoaded.current = true;
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (preferenceLoaded.current) {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
    }
  }, [open]);

  const toggleSidebar = React.useCallback(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setOpenMobile((current) => !current);
      return;
    }

    setOpen((current) => !current);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const value = React.useMemo(
    () => ({ open, openMobile, setOpen, setOpenMobile, toggleSidebar }),
    [open, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

type SidebarProps = React.ComponentProps<"aside"> & {
  collapsible?: "icon" | "none";
  variant?: "floating";
};

export function Sidebar({
  className,
  children,
  collapsible = "icon",
  variant = "floating",
  ...props
}: SidebarProps) {
  const { open, openMobile, setOpenMobile } = useSidebar();
  const state = collapsible === "none" || open ? "expanded" : "collapsed";

  return (
    <>
      <aside
        data-collapsible={collapsible}
        data-state={state}
        data-variant={variant}
        className={cn(
          "group/sidebar relative hidden min-h-svh shrink-0 p-3 pr-0 transition-[width] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none lg:block",
          state === "expanded" ? "w-[17rem]" : "w-[5.25rem]",
          className,
        )}
        {...props}
      >
        <div className="sticky top-3 flex h-[calc(100svh-1.5rem)] w-full flex-col rounded-[28px] bg-white/[.62] shadow-[0_24px_70px_rgba(29,55,91,.12),inset_0_1px_0_rgba(255,255,255,.72)] ring-1 ring-black/[.055] backdrop-blur-[24px] backdrop-saturate-[155%]">
          {children}
        </div>
      </aside>

      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          data-state-sidebar="expanded"
          className="group/sidebar w-[min(88vw,320px)] border-0 bg-[#f8fafc]/[.88] p-3 shadow-[24px_0_70px_rgba(29,55,91,.16)] ring-1 ring-black/[.055] backdrop-blur-[28px] backdrop-saturate-[155%] [&>button]:right-6 [&>button]:top-6"
        >
          <SheetTitle className="sr-only">Workspace navigation</SheetTitle>
          <div
            data-state="expanded"
            className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white/45 ring-1 ring-black/[.045]"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("relative min-w-0 flex-1", className)}
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Toggle navigation sidebar"
      title={`${open ? "Collapse" : "Expand"} sidebar (Ctrl/⌘ + B)`}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-2xl bg-white/55 text-[#313842] shadow-[0_8px_24px_rgba(33,57,88,.08),inset_0_1px_0_rgba(255,255,255,.7)] ring-1 ring-black/[.055] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/80 hover:text-[#0876df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688ee]/35 motion-reduce:transform-none",
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeftOpen size={18} className="lg:hidden" />
      {open ? (
        <PanelLeftClose size={18} className="hidden lg:block" />
      ) : (
        <PanelLeftOpen size={18} className="hidden lg:block" />
      )}
    </button>
  );
}

export function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      className={cn(
        "absolute -right-2 top-1/2 z-20 hidden h-20 w-4 -translate-y-1/2 cursor-col-resize rounded-full outline-none after:absolute after:inset-y-5 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-[#0876df]/20 hover:after:bg-[#0876df]/60 lg:block",
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("shrink-0 p-4", className)} {...props} />;
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2", className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("shrink-0 p-2", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("py-1.5", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#949ba5] transition-opacity group-data-[state=collapsed]/sidebar:pointer-events-none group-data-[state=collapsed]/sidebar:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("grid gap-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("min-w-0", className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
};

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton(
  { asChild = false, isActive = false, tooltip, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      data-active={isActive}
      title={tooltip}
      className={cn(
        "group/menu-button flex h-11 w-full items-center gap-2.5 overflow-hidden rounded-2xl px-2.5 text-left text-[13px] font-semibold text-[#626b77] transition duration-200 hover:bg-white/65 hover:text-[#15181c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688ee]/30 data-[active=true]:bg-[#e9f4ff]/80 data-[active=true]:text-[#0876df] data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_8px_24px_rgba(8,118,223,.08)] group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0",
        className,
      )}
      {...props}
    />
  );
});

export function SidebarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      className={cn("mx-2.5 my-2 h-px bg-black/[.055]", className)}
      {...props}
    />
  );
}
