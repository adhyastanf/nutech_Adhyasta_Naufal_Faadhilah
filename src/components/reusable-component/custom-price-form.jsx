import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { thousandSeparator } from "@/lib/format";
import { Loader2 } from "lucide-react";

export default function CustomPriceForm({ form, onSubmit, fields, loading }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map(({ name, label, placeholder, useThousandSeparator }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={placeholder}
                    {...field}
                    value={
                      useThousandSeparator && field.value
                        ? thousandSeparator(field.value)
                        : field.value
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
                      form.setValue(name, rawValue, { shouldValidate: true });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

<Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
          disabled={
            loading ||
            !form.watch(fields[0].name) ||
            Number(form.watch(fields[0].name)) < 10000 ||
            Number(form.watch(fields[0].name)) > 1000000
          }
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Sedang Diproses
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
