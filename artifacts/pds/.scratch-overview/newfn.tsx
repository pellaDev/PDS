export function OverviewPage() {
  const slot = useContext(SurfaceThemeContext);
  // The nested "Create workspace" card inverts its composition against the host surface: on the
  // alternative (gray) background it is built from the primary set, and vice versa. The real
  // components inside keep their own token-driven styling.
  const primarySetCard = slot.surface === 'alternate';
  const switchId = 'overview-notify-' + slot.surface;
  return (
    <div className="space-y-4">
      {/* The actual components in use, composed on this surface */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="mini">
          <Pencil />
        </Button>
        <Button size="small">Small</Button>
        <Button size="large">Large</Button>
        <Button size="special">
          <Sparkles />
          Special
        </Button>
        <Button variant="link">Link</Button>
        <Badge shape="numbered" variant="default">Default</Badge>
        <Badge shape="numbered" variant="alert">Alert</Badge>
        <Badge shape="numbered" variant="disabled">Disabled</Badge>
      </div>

      <Card className={primarySetCard ? 'bg-background text-foreground' : 'bg-secondary text-secondary-foreground'}>
        <CardHeader>
          <CardTitle>Create workspace</CardTitle>
          <CardDescription>
            {primarySetCard
              ? 'Primary-set composition on the alternative surface.'
              : 'Alternative-set composition on the primary surface.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field size="sm" tone="outline" label="Workspace name" className="w-full max-w-60" />

          <div className="flex items-center gap-2">
            <Switch defaultChecked id={switchId} />
            <Label htmlFor={switchId}>Email notifications</Label>
            <Badge shape="numbered" className="ml-auto">New</Badge>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Save</Button>
          <Button variant="link">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
