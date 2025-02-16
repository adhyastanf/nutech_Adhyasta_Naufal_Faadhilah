import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function CustomForm({ form, onSubmit, fields, loading, hideSubmit, buttonText = 'Submit' }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id='custom-form' className='space-y-8'>
        {fields.map(({ name, label, placeholder, description, type, icon }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                {label && <FormLabel>{label}</FormLabel>}
                <FormControl>
                  <div className='relative'>
                    {icon && <div className='absolute left-3 top-1/2 -translate-y-1/2 '>{icon}</div>}
                    <Input type={type} placeholder={placeholder} {...field} className={icon ? 'pl-8' : ''} />
                  </div>
                </FormControl>
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {!hideSubmit && (
          <Button type='submit' className='w-full bg-red-500' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='animate-spin' />
                Sedang Diproses
              </>
            ) : (
              buttonText
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
