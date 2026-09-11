import { useState } from 'react';
import { FileText, Home, Pencil, Settings, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tag } from '../../components/ui/tag';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../components/ui/resizable';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '../../components/ui/sidebar';

export function SidebarDemo() {
  
  const [active, setActive] = useState<'home' | 'documents' | 'settings'>('home');
  return (
    <div className="h-80 max-w-3xl overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-0 w-full flex-1">
          <ResizablePanel defaultSize={34} minSize={20}>
            <Sidebar collapsible="none" className="!w-full">
              <SidebarHeader>
            <p className="px-2 text-sm font-semibold">Acme workspace</p>
            <SidebarInput placeholder="Search" />
          </SidebarHeader>
          <SidebarContent>
            {}
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === 'home'} onClick={() => setActive('home')}>
                      <Home /> <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === 'documents'} onClick={() => setActive('documents')}>
                      <FileText /> <span>Documents</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === 'settings'} onClick={() => setActive('settings')}>
                      <Settings /> <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {}
            <SidebarGroup>
              <SidebarGroupLabel>Library</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="group/item relative">
                      <span className="min-w-0 flex-1 truncate">Reports</span>
                      <Tag variant="ready" className="shrink-0">Ready</Tag>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[color-mix(in_srgb,var(--pds-surface-bg)_82%,transparent)] px-3 opacity-0 backdrop-blur-[1px] transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                        <Button size="mini" aria-label="Edit"><Pencil /></Button>
                        <Button size="mini" aria-label="Delete"><Trash2 /></Button>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="group/item relative">
                      <span className="min-w-0 flex-1 truncate">Archive</span>
                      <Tag variant="default" className="shrink-0">24</Tag>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[color-mix(in_srgb,var(--pds-surface-bg)_82%,transparent)] px-3 opacity-0 backdrop-blur-[1px] transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                        <Button size="mini" aria-label="Edit"><Pencil /></Button>
                        <Button size="mini" aria-label="Delete"><Trash2 /></Button>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="group/item relative">
                      <span className="min-w-0 flex-1 truncate">Shared with me</span>
                      <Tag variant="alert" className="shrink-0">3</Tag>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[color-mix(in_srgb,var(--pds-surface-bg)_82%,transparent)] px-3 opacity-0 backdrop-blur-[1px] transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                        <Button size="mini" aria-label="Edit"><Pencil /></Button>
                        <Button size="mini" aria-label="Delete"><Trash2 /></Button>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="px-2 text-xs text-muted-foreground">3 members online</p>
          </SidebarFooter>
            </Sidebar>
          </ResizablePanel>
          <ResizableHandle className="pds-resizable-handle" />
          <ResizablePanel defaultSize={66} minSize={30}>
            <SidebarInset className="min-h-0 flex-1 p-6">
          <p className="font-medium">Project canvas</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Click a workspace item - the active highlight follows your selection. Hover a Library row to reveal its action bar.
          </p>
            </SidebarInset>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarProvider>
    </div>
  );
}
