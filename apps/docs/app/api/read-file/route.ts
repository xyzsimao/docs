// app/api/read-file/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  // process.cwd() points to the project root directory
  const filePath = path.join(process.cwd(), 'data', 'example.json');
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}