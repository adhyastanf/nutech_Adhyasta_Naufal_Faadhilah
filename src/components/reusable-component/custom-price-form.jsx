import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { thousandSeparator } from '@/lib/format';
import { Loader2 } from 'lucide-react';

export default function CustomPriceForm({ form, onSubmit, fields, loading, buttonText = 'Submit' }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {fields.map(({ name, label, placeholder, useThousandSeparator, icon }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <div className='relative'>
                    {icon && <div className='absolute left-3 top-1/2 -translate-y-1/2 '>{icon}</div>}
                    <Input
                      className={icon ? 'pl-8' : ''}
                      type='text'
                      placeholder={placeholder}
                      {...field}
                      value={useThousandSeparator && field.value ? thousandSeparator(field.value) : field.value}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '');
                        form.setValue(name, rawValue, { shouldValidate: true });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type='submit' className='w-full flex gap-2 bg-red-500' disabled={loading || !form.watch(fields[0].name) || Number(form.watch(fields[0].name)) < 10000 || Number(form.watch(fields[0].name)) > 1000000}>
          {loading ? (
            <>
              <Loader2 className='animate-spin' />
              Sedang Diproses
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </Form>
  );
}
