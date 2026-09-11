import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Field } from '../../components/ui/field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/ui/form';

type ProfileForm = {
  username: string;
};

export function FormDemo() {
  const form = useForm<ProfileForm>({
    defaultValues: { username: '' },
  });

  return (
    <div className="max-w-md p-6">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(() => undefined)}
        >
          <FormField
            control={form.control}
            name="username"
            rules={{ required: 'Enter a username.' }}
            render={({ field }) => (
              <FormItem>
                {}
                <FormControl>
                  <Field label="Username" size="sm" tone="outline" {...field} />
                </FormControl>
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save profile</Button>
        </form>
      </Form>
    </div>
  );
}