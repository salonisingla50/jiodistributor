import { NextResponse } from 'next/server';
import { read, write } from '../../../../lib/store';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log('DELETE PRODUCT ID:', id);

    const products = read('products');

    const updatedProducts = products.filter(
      (product: any) => String(product.id) !== String(id)
    );

    if (updatedProducts.length === products.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    write('products', updatedProducts);

    return NextResponse.json({
      ok: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}