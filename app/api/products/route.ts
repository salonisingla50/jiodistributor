import { NextResponse } from 'next/server';
import { read, write } from '../../../lib/store';

export async function GET() {
  try {
    const products = read('products');
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET PRODUCTS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to load products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const products = read('products');

    const newProduct = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      price: body.price || 'Contact us',
      oldPrice: body.oldPrice || '',
      tag: body.tag || 'NEW',
      spec: body.spec || 'Connected device',
      icon: body.icon || 'J',
      category: body.category || 'General',
    };

    products.push(newProduct);

    write('products', products);

    return NextResponse.json(
      newProduct,
      { status: 201 }
    );
  } catch (error) {
    console.error('POST PRODUCT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}