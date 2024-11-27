"use server";

import Vendor from "../database/models/vendor.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
type CreateVendorParams = {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  tags: string[];
  images: string[];
  vendorId: string;
};
export async function createVendor(vendor: CreateVendorParams) {
  try {
    await connectToDatabase();

    const newVendor = await Vendor.create(vendor);

    return JSON.parse(JSON.stringify(newVendor));
  } catch (error) {
    handleError(error);
  }
}

// READ
type GetVendorsParams = {
  query: string;
  limit: number;
  page: number;
  category: string;
};
export async function getVendors({ query, limit = 6, page, category }: GetVendorsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};
    const categoryCondition = category ? { category } : {};
    const conditions = { 
      $and: [titleCondition, categoryCondition]
    };

    const skipAmount = (Number(page) - 1) * limit;
    const vendorsQuery = Vendor.find(conditions)
      .skip(skipAmount)
      .limit(limit);

    const vendors = await vendorsQuery;
    const vendorsCount = await Vendor.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(vendors)),
      totalPages: Math.ceil(vendorsCount / limit),
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getVendorById(id: string) {
  try {
    await connectToDatabase();

    const vendor = await Vendor.findOne({ _id: id });

    if (!vendor) throw new Error("Vendor not found");

    return JSON.parse(JSON.stringify(vendor));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
type UpdateVendorParams = {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  tags: string[];
  images: string[];
};
export async function updateVendor(id: string, vendor: UpdateVendorParams) {
  try {
    await connectToDatabase();

    const updatedVendor = await Vendor.findOneAndUpdate({ _id: id }, vendor, {
      new: true,
    });

    if (!updatedVendor) throw new Error("Vendor update failed");

    return JSON.parse(JSON.stringify(updatedVendor));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteVendor(id: string) {
  try {
    await connectToDatabase();

    const vendorToDelete = await Vendor.findOne({ _id: id });

    if (!vendorToDelete) throw new Error("Vendor not found");

    const deletedVendor = await Vendor.findByIdAndDelete(vendorToDelete._id);

    return deletedVendor ? JSON.parse(JSON.stringify(deletedVendor)) : null;
  } catch (error) {
    handleError(error);
  }
}