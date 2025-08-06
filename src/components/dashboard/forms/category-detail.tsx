"use client";
import ImageUpload from "@/components/dashboard/shared/image-upload";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@/generated/prisma";
import { CategoryFormSchema } from "@/lib/schemas";
import { upsertCategory } from "@/queries/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CategoryDetail = ({ data }: { data?: Category }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      featured: data?.featured || false,
      name: data?.name || "",
      url: data?.url || "",
      image: data?.image ? [{ url: data.image }] : [],
    },
  });
  useEffect(() => {
    if (data) {
      form.reset({
        featured: data.featured,
        name: data.name || "",
        url: data.url || "",
        image: [{ url: data.image }],
      });
    }
  }, [data, form]);
  const handleSubmit = async () => {
    const values = form.getValues();
    try {
      const res = await upsertCategory({
        id: data?.id ? data.id : "",
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
      });
      toast("Category has been created", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/categories");
      }
    } catch (error) {
      toast(error as string);
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data.name} category information`
              : "Let's create a category."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        type="cover"
                        value={field.value.map((image) => image.url)}
                        disabled={isLoading}
                        onChange={(url) => field.onChange([{ url }])}
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="Url" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      ></Checkbox>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        This category will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "loading..."
                  : data?.id
                  ? "Save category information"
                  : "Create category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetail;
