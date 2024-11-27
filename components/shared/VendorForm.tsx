'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign, MapPin, Hash } from "lucide-react"

import { FileUploader } from "@/components/shared/FileUploader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IVendor } from "@/lib/database/models/vendor.model"
import { createVendor, updateVendor } from "@/lib/actions/vendor.actions"
import { useUploadThing } from "@/lib/uploadthing"

const vendorFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0.00).multipleOf(0.01),
  category: z.string().min(1),
  location: z.string().min(1),
  tags: z.string(),
  images: z.string()
})

const toArrayOfStrings = (tags: string) => Array.from(new Set(tags.split(",").map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0)))

export default function VendorForm({ userId, type, vendor, vendorId }: {
  userId: string,
  type: "Create" | "Update",
  vendor?: IVendor,
  vendorId?: string
}) {
  const router = useRouter()

  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: vendor && type === 'Update' 
      ? {
        ...vendor,
        tags: vendor.tags?.toString() || "",
        images: vendor.images[0] || ""
      } : {
        title: vendor?.title || "",
        description: vendor?.description || "",
        price: vendor?.price || 0.00,
        category: vendor?.category || "",
        location: vendor?.location || "",
        tags: vendor?.tags?.toString() || "",
        images: vendor?.images[0] || ""
      }
  })

  async function onSubmit(values: z.infer<typeof vendorFormSchema>) {
    let uploadedImageUrl = values.images[0]

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) return
      uploadedImageUrl = uploadedImages[0].url
    }

    if (type === 'Create') {
      try {
        const newVendor = await createVendor({
          ...values,
          price: parseFloat(values.price.toFixed(2)),
          tags: toArrayOfStrings(values.tags),
          images: [uploadedImageUrl],
          vendorId: userId
        })

        if (newVendor) {
          form.reset()
          router.push(`/vendors/${newVendor._id}`)
        }
      } catch (error) {
        console.error(error)
      }
    } else if (type === 'Update') {
      if (!vendorId) {
        router.back()
        return
      }

      try {
        const updatedVendor = await updateVendor(vendorId, {
          ...values,
          price: parseFloat(values.price.toFixed(2)),
          tags: toArrayOfStrings(values.tags),
          images: [uploadedImageUrl]
        })

        if (updatedVendor) {
          form.reset()
          router.push(`/vendors/${updatedVendor._id}`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Title" className="input-field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="select">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="venue">Venue</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="decoration">Decoration</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-64">
                  <Textarea placeholder="Description" className="textarea rounded-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    imageUrl={field.value.toString()}
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                    <MapPin size={24} color="#777777" />

                    <Input placeholder="Location" className="input-field" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                    <DollarSign size={24} color="#777777" />
                    
                    <Input 
                      type="number" 
                      placeholder="Price" 
                      className="input-field" 
                      {...field} 
                      min={0.00}
                      step="0.01"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                    <Hash size={24} color="#777777" />
                    
                    <Input placeholder="Tags (comma separated)" className="input-field" {...field} type="array" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}