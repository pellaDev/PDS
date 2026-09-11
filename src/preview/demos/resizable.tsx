import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../components/ui/resizable';

function PanelBody({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div className={muted ? "flex h-full items-center justify-center bg-muted text-sm" : "flex h-full items-center justify-center text-sm"}>
      {label}
    </div>
  );
}

function Panels() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={18}>
        <PanelBody label="Navigation" muted />
      </ResizablePanel>
      <ResizableHandle className="pds-resizable-handle" />
      <ResizablePanel defaultSize={65} minSize={30}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={62}>
            <PanelBody label="Canvas" />
          </ResizablePanel>
          <ResizableHandle className="pds-resizable-handle" />
          <ResizablePanel defaultSize={38}>
            <PanelBody label="Console" muted />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizableDemo() {
  return (
    <div className="max-w-2xl space-y-5">
      <figure className="m-0">
        <figcaption className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Fill — separatore visibile solo in hover
        </figcaption>
        <div data-pds-fieldstyle="fill" className="h-52 overflow-hidden rounded-lg border bg-background">
          <Panels />
        </div>
      </figure>

      <figure className="m-0">
        <figcaption className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Outline — doppio spessore del border in hover
        </figcaption>
        <div data-pds-fieldstyle="outline" className="h-52 overflow-hidden rounded-lg border bg-background">
          <Panels />
        </div>
      </figure>
    </div>
  );
}
