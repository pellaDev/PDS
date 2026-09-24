import { useState } from 'react';
import { Check } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Menu } from '../../components/ui/menu';
import { Row } from '../parts';

const OPTIONS = ['Brand primary', 'Surface white', 'Ink black', 'Gray soft'];

function Chevron() {
  return (
    <span className="pds-menu-trigger__icon">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path
          d="M1 1.2L5 4.8L9 1.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Picker({
  defaultValue,
  disabled,
  error,
}: {
  defaultValue: string;
  disabled?: boolean;
  error?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Menu mode="dropdown">
      <Menu.Trigger asChild>
        <button
          type="button"
          className="pds-menu-trigger"
          data-error={error || undefined}
          disabled={disabled}
        >
          {value}
          <Chevron />
        </button>
      </Menu.Trigger>
      <Menu.Content className="w-56">
        {OPTIONS.map((o) => (
          <Menu.Item key={o} data-selected={o === value || undefined} onSelect={() => setValue(o)}>
            <Check className={o === value ? 'opacity-100' : 'opacity-0'} />
            {o}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
}

export function MenuDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState('system');
  const [favorite, setFavorite] = useState(true);
  const [location, setLocation] = useState('drafts');
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Dropdown - value picker (token-faithful trigger + tokenized listbox)">
          <div className="w-full max-w-xs">
            <Picker defaultValue="Brand primary" />
          </div>
        </Row>
        <Row label="Dropdown - disabled (blackSoft fill, gray label, opacity 0.32)">
          <div className="w-full max-w-xs">
            <Picker defaultValue="Surface white" disabled />
          </div>
        </Row>
        <Row label="Dropdown - error (full red semantic fill per export)">
          <div className="w-full max-w-xs">
            <Picker defaultValue="Ink black" error />
          </div>
        </Row>
        <Row label="Dropdown - action menu (label, checkbox, shortcuts, submenu)">
          <Menu mode="dropdown">
            <Menu.Trigger asChild>
              <Button size="small">Open menu</Button>
            </Menu.Trigger>
            <Menu.Content className="w-56">
              <Menu.Label>Workspace</Menu.Label>
              <Menu.Item>
                New project <Menu.Shortcut>Cmd N</Menu.Shortcut>
              </Menu.Item>
              <Menu.Item disabled>Import project</Menu.Item>
              <Menu.Separator />
              <Menu.CheckboxItem
                checked={showSidebar}
                onCheckedChange={(c) => setShowSidebar(c === true)}
              >
                Show sidebar
              </Menu.CheckboxItem>
              <Menu.Sub>
                <Menu.SubTrigger>Theme</Menu.SubTrigger>
                <Menu.SubContent>
                  <Menu.RadioGroup value={theme} onValueChange={setTheme}>
                    <Menu.RadioItem value="light">Light</Menu.RadioItem>
                    <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
                    <Menu.RadioItem value="system">System</Menu.RadioItem>
                  </Menu.RadioGroup>
                </Menu.SubContent>
              </Menu.Sub>
            </Menu.Content>
          </Menu>
        </Row>
        <Row label="Context - right-click area (same tokenized listbox)">
          <Menu mode="context">
            <Menu.Trigger className="flex h-40 max-w-lg items-center justify-center rounded-xl border border-dashed [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
              Right-click this area
            </Menu.Trigger>
            <Menu.Content className="w-56">
              <Menu.Label>Document</Menu.Label>
              <Menu.Item>
                Rename <Menu.Shortcut>F2</Menu.Shortcut>
              </Menu.Item>
              <Menu.Item>Duplicate</Menu.Item>
              <Menu.Separator />
              <Menu.CheckboxItem
                checked={favorite}
                onCheckedChange={(c) => setFavorite(c === true)}
              >
                Favorite
              </Menu.CheckboxItem>
              <Menu.Sub>
                <Menu.SubTrigger>Move to</Menu.SubTrigger>
                <Menu.SubContent>
                  <Menu.RadioGroup value={location} onValueChange={setLocation}>
                    <Menu.RadioItem value="drafts">Drafts</Menu.RadioItem>
                    <Menu.RadioItem value="archive">Archive</Menu.RadioItem>
                  </Menu.RadioGroup>
                </Menu.SubContent>
              </Menu.Sub>
            </Menu.Content>
          </Menu>
        </Row>
      </div>
    </div>
  );
}
