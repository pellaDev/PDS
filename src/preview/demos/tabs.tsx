import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

// Desktop tabs — tokenized sizes/typography (PDS tokens), hover on inactive triggers,
// active segment merges into the panel it sits on. Rendered directly on each showcase
// column's own surface (base / alternate) — no per-surface cards here anymore.
function DesktopTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light"
      >
        Project summary and recent milestones.
      </TabsContent>
      <TabsContent
        value="activity"
        className="rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light"
      >
        Latest changes from your team.
      </TabsContent>
    </Tabs>
  );
}

// Mobile tabs — full-width segmented control, larger touch targets (min-height from a PDS dim token).
function MobileTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList size="mobile">
        <TabsTrigger size="mobile" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger size="mobile" value="activity">
          Activity
        </TabsTrigger>
        <TabsTrigger size="mobile" value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light"
      >
        Project summary and recent milestones.
      </TabsContent>
      <TabsContent
        value="activity"
        className="rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light"
      >
        Latest changes from your team.
      </TabsContent>
    </Tabs>
  );
}

export function TabsDemo() {
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Desktop
        </h2>
        <div className="max-w-lg">
          <DesktopTabs />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Mobile
        </h2>
        <div className="max-w-sm">
          <MobileTabs />
        </div>
      </section>
    </div>
  );
}
