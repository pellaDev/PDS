import { useState } from 'react';
import { FileText, Home, Pencil, Settings, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tag } from '../../components/ui/tag';
import { ScrollArea } from '../../components/ui/scroll-area';
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
  // Interactive: the active highlight follows the click; category labels toggle like an accordion.
  const [active, setActive] = useState<'home' | 'documents' | 'settings'>('home');
  return (
    <div className="h-80 max-w-3xl overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-0 w-full flex-1">
          <ResizablePanel defaultSize={34} minSize={20}>
            <Sidebar collapsible="none" className="!w-full">
              <SidebarHeader>
                <p className="px-2 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
                  Acme workspace
                </p>
                <SidebarInput placeholder="Search" />
              </SidebarHeader>
              <SidebarContent className="overflow-hidden">
                <ScrollArea className="flex-1 min-h-0">
                  {/* pr-1 gives the scroll thumb a little breathing room from the item rows. */}
                  <div className="pr-1">
                    {/* Workspace category — accordion open, items carry icons. */}
                    <SidebarGroup accordion>
                      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={active === 'home'}
                              onClick={() => setActive('home')}
                            >
                              <Home /> <span>Home</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={active === 'documents'}
                              onClick={() => setActive('documents')}
                            >
                              <FileText /> <span>Documents</span>
                            </SidebarMenuButton>
                            <SidebarMenuBadge>12</SidebarMenuBadge>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={active === 'settings'}
                              onClick={() => setActive('settings')}
                            >
                              <Settings /> <span>Settings</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Category closed by default — click its label to expand (tags + Item/List hover action bar). */}
                    <SidebarGroup accordion defaultOpen={false}>
                      <SidebarGroupLabel>Library</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton className="group/item relative no-default-hover-elevate pds-sidebar-actionrow">
                              <span className="min-w-0 flex-1 truncate">Reports</span>
                              <Tag variant="ready" className="shrink-0">
                                Ready
                              </Tag>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                                <Button size="mini" aria-label="Edit">
                                  <Pencil />
                                </Button>
                                <Button size="mini" aria-label="Delete">
                                  <Trash2 />
                                </Button>
                              </span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton className="group/item relative no-default-hover-elevate pds-sidebar-actionrow">
                              <span className="min-w-0 flex-1 truncate">Archive</span>
                              <Tag variant="default" className="shrink-0">
                                24
                              </Tag>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                                <Button size="mini" aria-label="Edit">
                                  <Pencil />
                                </Button>
                                <Button size="mini" aria-label="Delete">
                                  <Trash2 />
                                </Button>
                              </span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton className="group/item relative no-default-hover-elevate pds-sidebar-actionrow">
                              <span className="min-w-0 flex-1 truncate">Shared with me</span>
                              <Tag variant="alert" className="shrink-0">
                                3
                              </Tag>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                                <Button size="mini" aria-label="Edit">
                                  <Pencil />
                                </Button>
                                <Button size="mini" aria-label="Delete">
                                  <Trash2 />
                                </Button>
                              </span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </div>
                </ScrollArea>
              </SidebarContent>
              <SidebarFooter>
                <p className="px-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
                  3 members online
                </p>
              </SidebarFooter>
            </Sidebar>
          </ResizablePanel>
          <ResizableHandle className="pds-resizable-handle" />
          <ResizablePanel defaultSize={66} minSize={30}>
            <SidebarInset className="min-h-0 h-full p-6">
              <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
                Project canvas
              </p>
              <p className="mt-1 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
                Click a category label to open or close it. Click a workspace item - the active
                highlight follows your selection. Hover a Library row to reveal its action bar.
              </p>
            </SidebarInset>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarProvider>
    </div>
  );
}
