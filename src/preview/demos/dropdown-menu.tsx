import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Row } from '../parts';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

const OPTIONS = ['Brand primary', 'Surface white', 'Ink black', 'Gray soft'];

function Chevron() {
  return (
    <span className="pds-dropdown-trigger__icon">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1.2L5 4.8L9 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Picker({ defaultValue, disabled, error }: { defaultValue: string; disabled?: boolean; error?: boolean }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="pds-dropdown-trigger" data-error={error || undefined} disabled={disabled}>
          {value}
          <Chevron />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {OPTIONS.map((o) => (
          <DropdownMenuItem key={o} data-selected={o === value || undefined} onSelect={() => setValue(o)}>
            <Check className={o === value ? 'opacity-100' : 'opacity-0'} />
            {o}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState('system');
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Value picker - token-faithful trigger + tokenized listbox">
          <div className="w-full max-w-xs"><Picker defaultValue="Brand primary" /></div>
        </Row>
        <Row label="Disabled (blackSoft fill, gray label, opacity 0.32)">
          <div className="w-full max-w-xs"><Picker defaultValue="Surface white" disabled /></div>
        </Row>
        <Row label="Error (full red semantic fill per export)">
          <div className="w-full max-w-xs"><Picker defaultValue="Ink black" error /></div>
        </Row>
        <Row label="Action menu (label, checkbox, shortcuts, submenu)">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="small">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>
              <DropdownMenuItem>New project <DropdownMenuShortcut>Cmd N</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem disabled>Import project</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={(c) => setShowSidebar(c === true)}>
                Show sidebar
              </DropdownMenuCheckboxItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </div>
    </div>
  );
}
