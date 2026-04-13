import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      },
    );
  }

  const user: User = session.user as User;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const result = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!result || result.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // Filter out null entries from empty messages array
    const messages = result[0].messages.filter(
      (msg: any) => msg != null
    );

    return Response.json(
      {
        success: true,
        messages: messages,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Unexpected error occurred:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      {
        status: 500,
      },
    );
  }
}