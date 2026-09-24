import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../components/ui/resizable';

function PanelBody({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div
      className={
        muted
          ? 'flex h-full items-center justify-center bg-muted [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light'
          : 'flex h-full items-center justify-center [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light'
      }
    >
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
    <div className="max-w-2xl">
      <figure className="m-0">
        <figcaption className="mb-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Field style segue il default della sidebar (fill/outline)
        </figcaption>
        <div className="h-52 overflow-hidden rounded-lg border bg-background">
          <Panels />
        </div>
      </figure>
    </div>
  );
}
