"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName username",
  });

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Add Image
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const session = await auth();
    if (session?.user?.id !== userId) throw new Error("Unauthorized");

    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// Update Image
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const session = await auth();
    if (session?.user?.id !== userId) throw new Error("Unauthorized");

    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or Image not found!");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// Delete Image
export async function deleteImage(imageId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  try {
    if (!isValidObjectId(imageId)) throw new Error("Image not found");

    await connectToDatabase();

    const deletedImage = await Image.findOneAndDelete({
      _id: imageId,
      author: session.user.id,
    });

    if (!deletedImage) throw new Error("Unauthorized or image not found");
  } catch (error) {
    handleError(error);
  }

  redirect("/studio");
}

// Get Image
export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    if (!isValidObjectId(imageId)) return null;

    const image = await populateUser(Image.findById(imageId));

    if (!image) return null;

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

// Get all Images
export async function getAllImages({
  limit = 9,
  page = 1,
  searchQuery = "",
}: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    await connectToDatabase();

    const normalizedSearch = searchQuery.trim();
    const query = normalizedSearch
      ? {
          title: {
            $regex: escapeRegExp(normalizedSearch),
            $options: "i",
          },
        }
      : {};

    const skipAmount = (Number(page) - 1) * limit;

    const [images, totalImages, savedImages] = await Promise.all([
      populateUser(Image.find(query))
        .sort({ updatedAt: -1 })
        .skip(skipAmount)
        .limit(limit),
      Image.countDocuments(query),
      Image.countDocuments(),
    ]);

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    };
  } catch (error) {
    handleError(error);
  }
}

// Get all Images created by a specific user
export async function getUserImages({
  limit = 9,
  page = 1,
  searchQuery = "",
  userId,
}: {
  limit?: number;
  page: number;
  searchQuery?: string;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const normalizedSearch = searchQuery.trim();
    const query = normalizedSearch
      ? {
          author: userId,
          title: {
            $regex: escapeRegExp(normalizedSearch),
            $options: "i",
          },
        }
      : { author: userId };
    const skipAmount = (Number(page) - 1) * limit;

    const [images, matchingImages, totalImages] = await Promise.all([
      populateUser(Image.find(query))
        .sort({ updatedAt: -1 })
        .skip(skipAmount)
        .limit(limit),
      Image.countDocuments(query),
      Image.countDocuments({ author: userId }),
    ]);

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalImages,
      totalPages: Math.ceil(matchingImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
