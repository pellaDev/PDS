import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';

function DesktopTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border p-4 text-sm">
        Project summary and recent milestones.
      </TabsContent>
      <TabsContent value="activity" className="rounded-md border p-4 text-sm">
        Latest changes from your team.
      </TabsContent>
    </Tabs>
  );
}

function MobileTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList size="mobile">
        <TabsTrigger size="mobile" value="overview">Overview</TabsTrigger>
        <TabsTrigger size="mobile" value="activity">Activity</TabsTrigger>
        <TabsTrigger size="mobile" value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border p-4 text-sm">
        Project summary and recent milestones.
      </TabsContent>
      <TabsContent value="activity" className="rounded-md border p-4 text-sm">
        Latest changes from your team.
      </TabsContent>
    </Tabs>
  );
}

function Card({ surface, children }: { surface: 'base' | 'alternate'; children: React.ReactNode }) {
  return (
    <div
      data-pds-surface={surface}
      className={'rounded-xl border p-4 [border-color:var(--pds-container-border-color)] ' + (surface === 'base' ? 'bg-background' : 'bg-secondary')}
    >
      {children}
    </div>
  );
}

export function TabsDemo() {
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Desktop</h2>
        <div className="max-w-lg"><Card surface="base"><DesktopTabs /></Card></div>
        <div className="max-w-lg"><Card surface="alternate"><DesktopTabs /></Card></div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mobile</h2>
        <div className="max-w-sm"><Card surface="base"><MobileTabs /></Card></div>
        <div className="max-w-sm"><Card surface="alternate"><MobileTabs /></Card></div>
      </section>
    </div>
  );
}
