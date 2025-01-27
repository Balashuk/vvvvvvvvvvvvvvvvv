import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";


// The DELETE handler with route params treated as a Promise
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params to resolve the Promise
    const { id } = await params;

    // Get the current user
    const currentUser = await getCurrentUser();

    // Check if the current user exists and has the correct role
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }

    // Attempt to delete the product using Prisma
    const product = await prisma?.product.delete({
      where: { id },
    });

    // Return the deleted product in the response
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.error();
  }
}
