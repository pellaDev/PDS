import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Field } from '../../components/ui/field';
import { FolderOpen } from 'lucide-react';
import { Stack } from '../parts';

export function InputDemo() {
  // The file control is a plain <input type="file"> whose native name display we hide; the chosen
  // filename is surfaced as the Field's centered label instead, so it stays visible and on-brand.
  const [fileName, setFileName] = useState('');
  return (
    <div className="max-w-md space-y-6 p-6">
      <Stack label="Types">
        <Input placeholder="Name" />
        <Input type="email" placeholder="name@example.com" />
        <Field
          type="file"
          label={fileName || 'Choose file'}
          trailingIcon={<FolderOpen size={16} />}
          className="w-full"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
        />
      </Stack>
      <Stack label="States">
        <Input defaultValue="Read only" readOnly />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Invalid" aria-invalid="true" />
      </Stack>
    </div>
  );
}
